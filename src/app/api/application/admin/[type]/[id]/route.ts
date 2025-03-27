import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest ) {
  try {

    const fullUrl = request.url;  
    const urlParts = new URL(fullUrl).pathname.split('/');  
  
    // urlParts will now be an array like:  
    // ["", "api", "application", "admin", "student", "123"]  
  
    const type = urlParts[4];   
    const id = urlParts[5]; 
  
    // console.log("Type:", type);  
    // console.log("ID:", id);

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

    // In a real application, you would check authentication here
    // if (!isAuthenticated(request)) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    // Try to convert the ID to ObjectId
    let objectId
    if (!id) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 })
    } else {
      objectId = new ObjectId(id)
    }
  
    const application = await collection.findOne({ _id: objectId })
    // console.log('Application form MongoDB: ', application);

    return NextResponse.json({ application })
    
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const fullUrl = request.url;  
    const urlParts = new URL(fullUrl).pathname.split('/'); 
    const body = await request.json() 
    const { status, notes } = body
  
    // urlParts will now be an array like:  
    // ["", "api", "application", "admin", "student", "123"]  
  
    const type = urlParts[4];   
    const id = urlParts[5]; 
  
    // console.log("\nType:", type);  
    // console.log("ID:", id);
    // console.log("Status: ", status);
    // console.log("Notes: ", notes);
    

    // Validate status
    const validStatuses = ["PENDING", "UNDER_REVIEW", "INTERVIEW_SCHEDULED", "ACCEPTED", "REJECTED", "WAITLISTED"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 })
    }

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

    // In a real application, you would check authentication here
    // if (!isAuthenticated(request)) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

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
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 })
  }
}

