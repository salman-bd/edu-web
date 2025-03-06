import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { z } from "zod"
import { sendApplicationConfirmationEmail, sendApplicationAdminNotificationEmail } from "@/lib/sendEmails"

const applicationSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  dateOfBirth: z.string().min(1),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().min(5),
  programLevel: z.enum(["elementary", "middle", "high", "college"]),
  programType: z.string().min(1),
  previousSchool: z.string().min(2),
  personalStatement: z.string().min(50),
})

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("education_app")
    const collection = db.collection("applications")

    const body = await request.json()

    // Validate the request body
    const validatedData = applicationSchema.parse(body)

    // Create a new application document
    const application = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      dateOfBirth: new Date(validatedData.dateOfBirth),
      address: validatedData.address,
      city: validatedData.city,
      state: validatedData.state,
      zipCode: validatedData.zipCode,
      programLevel: validatedData.programLevel,
      programType: validatedData.programType,
      previousSchool: validatedData.previousSchool,
      personalStatement: validatedData.personalStatement,
      status: "PENDING",
      submittedAt: new Date(),
      updatedAt: new Date(),
    }

    // Insert the application into MongoDB
    const result = await collection.insertOne(application)

    // Send confirmation email
    const fullName = `${validatedData.firstName} ${validatedData.lastName}`
    await sendApplicationConfirmationEmail(
      validatedData.email,
      fullName,
      validatedData.programType,
      result.insertedId.toString(),
    )

    // Send notification to admin
    await sendApplicationAdminNotificationEmail(
      fullName,
      validatedData.email,
      validatedData.programType,
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

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit application",
      },
      { status: 500 },
    )
  }
}

