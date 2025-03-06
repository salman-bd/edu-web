import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { sendTeacherApplicationConfirmationEmail, sendTeacherApplicationAdminNotificationEmail } from "@/lib/sendEmails"
import { writeFile } from "fs/promises"
import { join } from "path"
import { mkdir } from "fs/promises"

export async function POST(request: Request) {
  try {
    // Parse the multipart form data
    const formData = await request.formData()
   

    // Extract file
    const resumeFile = formData.get("resume") as File

    if (!resumeFile) {
      return NextResponse.json(
        {
          success: false,
          message: "Resume file is required",
        },
        { status: 400 },
      )
    }

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!validTypes.includes(resumeFile.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid file type. Only PDF and Word documents are accepted.",
        },
        { status: 400 },
      )
    }

    // Validate file size (5MB max)
    if (resumeFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "File size exceeds 5MB limit",
        },
        { status: 400 },
      )
    }

    // Create unique filename
    const timestamp = Date.now()
    const fileName = `${timestamp}-${resumeFile.name.replace(/\s+/g, "-")}`

    // Ensure uploads directory exists
    const uploadDir = join(process.cwd(), "public", "uploads", "resumes")
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      console.error("Error creating directory:", error)
    }

    // Save file to server
    const filePath = join(uploadDir, fileName)
    const fileBuffer = Buffer.from(await resumeFile.arrayBuffer())
    await writeFile(filePath, fileBuffer)

    // Save relative path for database
    const dbFilePath = `/uploads/resumes/${fileName}`

    // Extract other form fields
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const address = formData.get("address") as string
    const highestDegree = formData.get("highestDegree") as string
    const university = formData.get("university") as string
    const yearsOfExperience = formData.get("yearsOfExperience") as string
    const subjectSpecialization = formData.get("subjectSpecialization") as string
    const teachingLevelJson = formData.get("teachingLevel") as string
    const teachingLevel = JSON.parse(teachingLevelJson)
    const coverLetter = formData.get("coverLetter") as string

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("education_app")
    const collection = db.collection("teacher_applications")

    // Create application document
    const application = {
      firstName,
      lastName,
      email,
      phone,
      address,
      highestDegree,
      university,
      yearsOfExperience,
      subjectSpecialization,
      teachingLevel,
      coverLetter,
      resumePath: dbFilePath,
      status: "PENDING",
      submittedAt: new Date(),
      updatedAt: new Date(),
    }

    // console.log('Teacher application data to be inserted: ', application);
    

    // Insert into MongoDB
    const result = await collection.insertOne(application)

    // Send confirmation email
    const fullName = `${firstName} ${lastName}`
    await sendTeacherApplicationConfirmationEmail(email, fullName, subjectSpecialization, result.insertedId.toString())

    // Send admin notification
    await sendTeacherApplicationAdminNotificationEmail(
      fullName,
      email,
      subjectSpecialization,
      result.insertedId.toString(),
    )

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        applicationId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error submitting application:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit application",
      },
      { status: 500 },
    )
  }
}

