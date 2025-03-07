import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("education_app")
    const collection = db.collection("applications")

    // In a real application, you would check authentication here
    // if (!isAuthenticated(request)) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    // Fetch all applications, sorted by submission date (newest first)
    const applications = await collection.find({}).sort({ submittedAt: -1 }).toArray()

    return NextResponse.json({ applications })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("education_app")
    const collection = db.collection("applications")

    // In a real application, you would check authentication here
    // if (!isAuthenticated(request)) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const validStatuses = ["PENDING", "APPROVED", "REJECTED", "WAITLISTED"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    // Update the application status
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Fetch the updated application
    const updatedApplication = await collection.findOne({ _id: new ObjectId(id) })

    return NextResponse.json({
      success: true,
      application: updatedApplication,
    })
  } catch (error) {
    console.error("Error updating application:", error)
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 })
  }
}

