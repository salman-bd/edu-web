import { type NextRequest, NextResponse } from "next/server"
import { serverStudentProfileSchema } from "@/schemas/studentProfileSchema"
import { sendStudentProfileConfirmationEmail, sendStudentProfileAdminNotificationEmail } from "@/lib/sendEmails"
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
    console.log("Form data received for student profile")

    // Extract file data
    const photoFile = formData.get("photo") as File | null
    const isAffiliated = formData.get("isCscAffiliated")

    // Create data object for validation
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      dateOfBirth: formData.get("dateOfBirth"),
      gender: formData.get("gender"),
      institutionName: formData.get("institutionName"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zipCode"),
      programLevel: formData.get("programLevel"),
      programType: formData.get("programType"),
      previousSchool: formData.get("previousSchool") || "",
      personalStatement: formData.get("personalStatement") || "",
      photo: photoFile,
    }

    // Validate the data
    const validatedData = serverStudentProfileSchema.parse(data)
    console.log("Validated student profile data")

    // Handle photo upload to Cloudinary
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

    // Create the student profile object to save to database
    const studentProfile = {
      ...validatedData,
      photoUrl,
      isAffiliated,
      fullName: `${validatedData.firstName} ${validatedData.lastName}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log("Student profile to save", studentProfile)

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("education_app")
    const collection = db.collection("profiles")

    // Check if profile already exists
    const email = validatedData.email
    let isNewProfile = false
    const profile = await collection.findOne({ email })

    if (!profile) {
      isNewProfile = true
      await collection.insertOne(studentProfile)
    } else {
      await collection.updateOne(
        { email },
        {
          $set: {
            ...studentProfile,
          },
        },
      )
    }

    // Get the updated/created profile
    const result = await collection.findOne({ email })
    if (!result) {
      return NextResponse.json(
        { success: false, message: "Student profile update or creation failed!" },
        { status: 400 },
      )
    }

    const profileId = result._id.toString()

    // Send confirmation email to the student
    await sendStudentProfileConfirmationEmail(
      validatedData.email as string,
      `${validatedData.firstName} ${validatedData.lastName}`,
      profileId,
    )

    // Send notification email to admin
    await sendStudentProfileAdminNotificationEmail(
      `${validatedData.firstName} ${validatedData.lastName}`,
      validatedData.email as string,
      validatedData.programType as string,
      profileId,
      isNewProfile,
    )

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Student profile updated successfully",
      data: {
        id: profileId,
        ...studentProfile,
        // Don't return the actual file data in the response
        photo: photoUrl ? { name: photoFile?.name, path: photoUrl } : null,
      },
    })
  } catch (error) {
    console.error("Error processing student profile:", error)

    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: `Error: ${error.message}` }, { status: 400 })
    }

    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 })
  }
}

