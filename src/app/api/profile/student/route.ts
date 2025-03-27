import { type NextRequest, NextResponse } from "next/server"
import { serverStudentProfileSchema } from "@/schemas/studentProfileSchema"
// import { v4 as uuidv4 } from "uuid"
import { sendStudentProfileAdminNotificationEmail, sendStudentProfileConfirmationEmail } from "@/lib/sendEmails"
import clientPromise from "@/lib/mongodb"
import { v2 as cloudinary } from "cloudinary"
import { getServerSession } from "next-auth"
import { ObjectId } from "mongodb"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')
  console.log("ID to update: ", id)

  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ success: false, message: "User not authenticated" }, { status: 401 })
  }
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 })
  }

  try {
    const formData = await request.formData()
    // Find the existing profile
    const client = await clientPromise
    const db = client.db("education_app")
    const collection = db.collection("profiles")
    const existingProfile = await collection.findOne({ _id: new ObjectId(id) })
    if (!existingProfile) {
      return NextResponse.json({ success: false, message: "Profile not found" }, { status: 400 })
    }

    // Extract photo file/url
    const photoFile = formData.get("photo")
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
    }
    const validatedData = serverStudentProfileSchema.parse(data)

    // Handle photo processing
    let photoUrl = existingProfile.photoUrl // Default to existing photo URL
    if (photoFile) {
      // If it's a File object, upload to Cloudinary
      if (photoFile instanceof File && photoFile.size > 0) {
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
      }
      // If it's a string and different from existing URL, it's a new URL
      else if (typeof photoFile === "string" && photoFile !== existingProfile.photoUrl) {
        photoUrl = photoFile
      }
    }

    // Update the student profile object to save to database
    const studentProfile = {
      ...validatedData,
      photoUrl, // This will never be null now
      updatedAt: new Date(),
    }
    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...studentProfile,
        },
      },
    )
    const result = await collection.findOne({ _id: new ObjectId(id) })
    if (!result) {
      return NextResponse.json({ success: false, message: "Profile updation failed!" }, { status: 400 })
    }

    // Send confirmation email to the student
    await sendStudentProfileConfirmationEmail(
      validatedData.email as string,
      `${validatedData.firstName} ${validatedData.lastName}`,
      id,
    )

    // Send notification email to admin
    await sendStudentProfileAdminNotificationEmail(
      `${validatedData.firstName} ${validatedData.lastName}`,
      validatedData.email as string,
      validatedData.programType as string,
      id,
    )
    // Return success response
    return NextResponse.json({
      success: true,
      message: "Student profile updated successfully",
      data: {
        id: id,
        ...studentProfile,
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

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')
  console.log("ID to delete: ", id)
  const session = getServerSession()
  if (!session) {
    return NextResponse.json({ success: false, message: "User not authenticated" }, { status: 400 })
  }
  if (!id) {
    return NextResponse.json(
      { success: false, message: "Invalid request. You must request with an ID" },
      { status: 400 },
    )
  }

  try {
    // Find the profile
    const client = await clientPromise
    const db = client.db("education_app")
    const collection = db.collection("profiles")
    const existingProfile = await collection.findOne({ _id: new ObjectId(id) })

    if (!existingProfile) {
      return NextResponse.json({ success: false, message: "Profile not found" }, { status: 400 })
    }

    await collection.deleteOne({ _id: new ObjectId(id) })

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
export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')

    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ success: false, message: "User not authenticated" }, { status: 401 })
    }
  
    if (!id) {
      return NextResponse.json({ success: false, message: "Invalid request. You must request with an ID" }, { status: 400 })
    }
    // Find the profile
    const client = await clientPromise
    const db = client.db("education_app")
    const collection = db.collection("profiles")
    const profile = await collection.findOne({ _id: new ObjectId(id) })

    if (!profile) {
      return NextResponse.json({ success: false, message: "Profile Not Found!" }, { status: 404 })
    }
    return NextResponse.json({ success: true, profileData: profile }, { status: 200 })

  } catch (error) {
    console.error("Error fetching student profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}
