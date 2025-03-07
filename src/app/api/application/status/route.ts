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
    } else {
      objectId = new ObjectId(id)
    }

    const application = await collection.findOne({ _id: objectId })
    // console.log('Application from MongoDB: ', application);

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // console.log('Application from MongoDB: ', application);

    // Return the application data
    return NextResponse.json({
      success: true,
      type,
      application: application,
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
export async function PATCH(request: Request) {
  try {
    const fullUrl = request.url;  
    const urlParts = new URL(fullUrl).pathname.split('/'); 
    const body = await request.json() 
    const { status, notes } = body
  
    const type = urlParts[4];   
    const id = urlParts[5]; 
  
    console.log("\nType:", type);  
    console.log("ID:", id);
    console.log("Status: ", status);
    console.log("Notes: ", notes);
    

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
    if (!id) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 })
    } else {
      objectId = new ObjectId(id)
    }

    // Update the application
    const updateData: { status: string; updatedAt: Date; notes?: string } = {
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

   
    return NextResponse.json({
      success: true,
      application: updatedApplication,
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

