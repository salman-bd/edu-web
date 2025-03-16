import { type NextRequest, NextResponse } from "next/server"
import { serverTeacherProfileSchema } from "@/schemas/teacherProfileSchema"
// import { v4 as uuidv4 } from "uuid"
import { sendTeacherProfileAdminNotificationEmail, sendTeacherProfileConfirmationEmail } from "@/lib/sendEmails"
import clientPromise from "@/lib/mongodb"
import { v2 as cloudinary } from "cloudinary"
import { getServerSession } from "next-auth"
import { ObjectId } from "mongodb"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {  
  const session = await getServerSession();
  if (!session) {  
    return NextResponse.json({ success: false, message: 'User not authenticated' }, { status: 401 });  
  }  
  const paramsForId = await params
  const id = paramsForId.id;  
  
  if (!id) {  
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });  
  } 
  console.log('\nID to update profile: ', id);

  try {
    const formData = await request.formData()

    // Find the existing profile
    const client = await clientPromise;  
    const db = client.db("education_app");  
    const collection = db.collection('profiles'); 
    const existingProfile = await collection.findOne({ _id: new ObjectId(id.toString()) })
   
    if (!existingProfile) {
      return NextResponse.json({ success: false, message: 'Profile not found'}, { status: 400 })
    }

    // console.log('Existing Profile: ', existingProfile);
    
    // Extract file data and parse teaching levels
    const photoFile = formData.get("photo")
    const teachingLevelJson = formData.get("teachingLevel") as string
    const teachingLevel = JSON.parse(teachingLevelJson)

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
    }
    const validatedData = serverTeacherProfileSchema.parse(data)
    // console.log('Validated data: ', validatedData);

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

    // Update the teacher profile object to save to database
    const teacherProfile = {
      ...validatedData,
      photoUrl,
      fullName: `${validatedData.firstName} ${validatedData.lastName}`,
      updatedAt: new Date(),
    }

    console.log("Teacher profile to save:", teacherProfile)

    await collection.updateOne(  
      { _id: new ObjectId(id) }, 
      {  
        $set: {  
          ...teacherProfile  
        }  
      }  
    );

    const result = await collection.findOne({ _id: new ObjectId(id) })
    // console.log('Updated profile data: ', result);
    
    if (!result) {
      return NextResponse.json({ success: false, message: 'Profile updation failed!' }, { status: 400 })
    }

    // Send confirmation email to the teacher
    await sendTeacherProfileConfirmationEmail(
      validatedData.email as string,
      `${validatedData.firstName} ${validatedData.lastName}`,
      id,
    )

    // Send notification email to admin
    await sendTeacherProfileAdminNotificationEmail(
      `${validatedData.firstName} ${validatedData.lastName}`,
      validatedData.email as string,
      validatedData.subjectSpecialization as string,
      id,
    )

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Teacher profile updated successfully",
      data: {
        id: id,
        ...teacherProfile,
        // Don't return the actual file data in the response
        photo: photoUrl ? { path: photoUrl } : null,
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


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = getServerSession()
  if (!session) {
    return NextResponse.json({ success: false, message: 'User not authenticated'}, { status: 400 })
  }
  const id = await params.id;  
  console.log('\nID to delete profile: ', id);
  if (!id) {
    return NextResponse.json({ success: false, message: 'Invalid request. You must request with an ID'}, { status: 400 })
  }

  try {
  // Find the profile
  const client = await clientPromise;  
  const db = client.db("education_app");  
  const collection = db.collection('profiles'); 
  const existingProfile = await collection.findOne({  _id: new ObjectId(id) })

  if (!existingProfile) {
    return NextResponse.json({ success: false, message: 'Profile not found'}, { status: 400 })
  }

  await collection.deleteOne({  _id: new ObjectId(id) })

  // In a real application, you would also:
  // 1. Delete the associated photo from storage
  // 2. Handle cascading deletes for related data

  return NextResponse.json({ message: "Profile deleted successfully" }, { status: 200 })

  } catch (error) {
    console.error("Error deleting teacher profile:", error)
    return NextResponse.json({ error: "Failed to delete profile" }, { status: 500 })
  }
}

// GET method for retrieving a profile (needed for the fallback fetch in the edit form)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const session = getServerSession()
  if (!session) {
    return NextResponse.json({ success: false, message: 'User not authenticated'}, { status: 400 })
  }
  const id = params.id

  if (!id) {
    return NextResponse.json({ success: false, message: 'Invalid request. You must request with an ID'}, { status: 400 })
  }

  try {
    // Find the profile
    const client = await clientPromise;  
    const db = client.db("education_app");  
    const collection = db.collection('profiles'); 
    const profile = await collection.findOne({ id })

    if (!profile) {
      return NextResponse.json({ success: false, message: 'Profile Not Found!' }, { status: 400 })
    }

    return NextResponse.json({ success: true, profileData: profile }, { status: 201 })
  
  } catch (error) {
    console.error("Error fetching teacher profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

