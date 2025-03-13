import { type NextRequest, NextResponse } from "next/server"
import { serverTeacherProfileSchema } from "@/schemas/teacherProfileSchema"
// import { v4 as uuidv4 } from "uuid"
import { sendTeacherProfileAdminNotificationEmail, sendTeacherProfileConfirmationEmail } from "@/lib/sendEmails"
import clientPromise from "@/lib/mongodb"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


export async function POST(request: NextRequest) {
  try {
    // Parse the multipart form data
    const formData = await request.formData()
    console.log("Form data: ", formData);
    

    // Extract file data and parse teaching levels
    const photoFile = formData.get("photo") as File | null
    const teachingLevelJson = formData.get("teachingLevel") as string
    const teachingLevel = JSON.parse(teachingLevelJson)
    const isAffiliated = formData.get("isCscAffiliated")

    // Create data object for validation
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      dateOfBirth: formData.get("dateOfBirth"),
      address: formData.get("address"),
      highestDegree: formData.get("highestDegree"),
      university: formData.get("university"),
      yearsOfExperience: formData.get("yearsOfExperience"),
      subjectSpecialization: formData.get("subjectSpecialization"),
      teachingLevel,
      isCscAffiliated: formData.get("isCscAffiliated"),
      coverLetter: formData.get("coverLetter"),
      photo: photoFile,
    }

    const validatedData = serverTeacherProfileSchema.parse(data)
    console.log('Validated data: ', validatedData);
    
    // Handle photo upload
    let photoUrl
    if (photoFile instanceof File) {
      const arrayBuffer = await photoFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const cloudinaryResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "auto" }, (error, result) => {
            if (error) reject(error)
            else resolve(result)
          })
          .end(buffer)
      })

      photoUrl = (cloudinaryResponse as { secure_url: string }).secure_url
    } else {
      photoUrl = photoFile
    }

    /*
    // Handle photo upload
    let photoPath = null
    if (photoFile) {
      const photoBuffer = await photoFile.arrayBuffer()
      const photoFileName = `${uuidv4()}-${photoFile.name}`
      photoPath = `/uploads/photos/${photoFileName}`
      // In a real application, you would save this to a storage service
      console.log(`Photo would be saved to: ${photoPath}`)
      // If running on a server with file system access:
      // await writeFile(join(process.cwd(), 'public', photoPath), Buffer.from(photoBuffer))
    }
    // Generate a profile ID
    const profileIdUUID = uuidv4()
    console.log('Profile UUID: ', profileIdUUID);
    */

    // Create the teacher profile object to save to database
    const teacherProfile = {
      ...validatedData,
      photoUrl,
      isAffiliated,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log("Teacher profile to save:", teacherProfile)

    const client = await clientPromise;  
    const db = client.db("education_app");  
    const collection = db.collection('profiles'); 

    const email = validatedData.email
    let isNewProfile = false
    const profile = await collection.findOne({ email })
    if (!profile) {
      isNewProfile = true
      await collection.insertOne(teacherProfile)
    } else {
      await collection.updateOne(
        {email},
        {
          $set: {
            ...teacherProfile
          }
        }
      )
    }

    const result = await collection.findOne({ email })
    if (!result) {
      return NextResponse.json({ success: false, message: 'Profile update or creation failed!' }, { status: 400 })
    }

    const profileId = result._id.toString()
    // console.log('Result and profile ID: ', result, profileId);
    
    // Send confirmation email to the teacher
    await sendTeacherProfileConfirmationEmail(
      validatedData.email as string,
      `${validatedData.firstName} ${validatedData.lastName}`,
      profileId,
    )

    // Send notification email to admin
    await sendTeacherProfileAdminNotificationEmail(
      `${validatedData.firstName} ${validatedData.lastName}`,
      validatedData.email as string,
      validatedData.subjectSpecialization as string,
      profileId,
      isNewProfile,
    )

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Teacher profile updated successfully",
      data: {
        id: profileId,
        ...teacherProfile,
        // Don't return the actual file data in the response
        photo: photoUrl ? { name: photoFile?.name, path: photoUrl } : null,
      },
    })
  } catch (error) {
    console.error("Error processing teacher profile:", error)

    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: `Error: ${error.message}` }, { status: 400 })
    }

    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 })
  }
}

