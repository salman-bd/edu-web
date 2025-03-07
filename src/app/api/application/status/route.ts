import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get('type');  
    const id = request.nextUrl.searchParams.get('id'); 

    console.log("Type:", type);  
    console.log("ID:", id);

    // Validate application type
    if (type !== "teacher" && type !== "student") {
      return NextResponse.json({ error: "Invalid application type" }, { status: 400 })
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("education_app")

    // Determine which collection to use
    const collectionName = type === "student" ? "student_applications" : "teacher_applications"
    const collection = db.collection(collectionName)
    

    // Try to convert the ID to ObjectId
    let objectId
    if (!id) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 })
    }
    try {
      objectId = new ObjectId(id)
    } catch (error) {
      return NextResponse.json({ error: "Invalid application ID format" }, { status: 400 })
    }

    const application = await collection.findOne({ _id: objectId })
    // console.log('Application from MongoDB: ', application);

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }


    // Format the application data based on type
    let formattedApplication

    if (type === "student") {
      formattedApplication = {
        id: application._id.toString(),
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        programType: application.programType,
        status: application.status,
        createdAt: application.submittedAt.toISOString(),
        updatedAt: application.updatedAt.toISOString(),
        notes: application.notes || null,
      }
    } else {
      formattedApplication = {
        id: application._id.toString(),
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        subject: application.subjectSpecialization,
        status: application.status,
        createdAt: application.submittedAt.toISOString(),
        updatedAt: application.updatedAt.toISOString(),
        notes: application.notes || null,
      }
    }
    console.log('Formatted Application: ', formattedApplication);

    // Return the application data
    return NextResponse.json({
      success: true,
      type,
      application: formattedApplication,
    })
    
  } catch (error) {
    console.error("Error fetching application:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch application",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Admin route to update application status
export async function PATCH(request: Request, { params }: { params: { type: string; id: string } }) {
  try {
    const { type, id } = params
    const body = await request.json()
    const { status, notes } = body

    // Validate application type
    if (type !== "teacher" && type !== "student") {
      return NextResponse.json({ error: "Invalid application type" }, { status: 400 })
    }

    // Validate status
    const validStatuses = ["PENDING", "UNDER_REVIEW", "INTERVIEW_SCHEDULED", "ACCEPTED", "REJECTED", "WAITLISTED"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 })
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("education_app")

    // Determine which collection to use
    const collectionName = type === "student" ? "student_applications" : "teacher_applications"
    const collection = db.collection(collectionName)

    // Try to convert the ID to ObjectId
    let objectId
    try {
      objectId = new ObjectId(id)
    } catch (error) {
      return NextResponse.json({ error: "Invalid application ID format" }, { status: 400 })
    }

    // Update the application
    const updateData: any = {
      status,
      updatedAt: new Date(),
    }

    if (notes !== undefined) {
      updateData.notes = notes
    }

    const result = await collection.updateOne({ _id: objectId }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Get the updated application
    const updatedApplication = await collection.findOne({ _id: objectId })

    // Format the application data
    let formattedApplication

    if (!updatedApplication) {
      return NextResponse.json({ error: "Application not found after update" }, { status: 404 })
    }

    if (type === "student") {
      formattedApplication = {
        id: updatedApplication._id.toString(),
        firstName: updatedApplication.firstName,
        lastName: updatedApplication.lastName,
        email: updatedApplication.email,
        programType: updatedApplication.programType,
        status: updatedApplication.status,
        createdAt: updatedApplication.submittedAt.toISOString(),
        updatedAt: updatedApplication.updatedAt.toISOString(),
        notes: updatedApplication.notes || null,
      }
    } else {
      formattedApplication = {
        id: updatedApplication._id.toString(),
        firstName: updatedApplication.firstName,
        lastName: updatedApplication.lastName,
        email: updatedApplication.email,
        subject: updatedApplication.subjectSpecialization,
        status: updatedApplication.status,
        createdAt: updatedApplication.submittedAt.toISOString(),
        updatedAt: updatedApplication.updatedAt.toISOString(),
        notes: updatedApplication.notes || null,
      }
    }

    return NextResponse.json({
      success: true,
      application: formattedApplication,
    })
  } catch (error) {
    console.error("Error updating application:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update application",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

