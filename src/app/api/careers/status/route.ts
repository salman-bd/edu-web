import { type NextRequest, NextResponse } from "next/server"
import type { TeacherApplication } from "@/types/application"

// This would normally come from your database
const getTeacherApplicationById = async (id: string): Promise<TeacherApplication | null> => {
  // Mock data for demonstration
  const applications: Record<string, TeacherApplication> = {
    TEACH123456: {
      id: "TEACH123456",
      firstName: "Michael",
      lastName: "Johnson",
      email: "michael.johnson@example.com",
      phone: "555-123-4567",
      subject: "Mathematics",
      yearsOfExperience: "5-10",
      status: "under_review",
      createdAt: new Date("2023-09-12"),
      updatedAt: new Date("2023-09-14"),
      notes: "Application is currently being reviewed by the HR department.",
    },
    TEACH789012: {
      id: "TEACH789012",
      firstName: "Sarah",
      lastName: "Williams",
      email: "sarah.williams@example.com",
      phone: "555-987-6543",
      subject: "English",
      yearsOfExperience: "3-5",
      status: "interview_scheduled",
      createdAt: new Date("2023-09-08"),
      updatedAt: new Date("2023-09-16"),
      notes: "Interview scheduled for September 22, 2023 at 2:00 PM.",
    },
  }

  return applications[id] || null
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Application ID is required" }, { status: 400 })
  }

  const application = await getTeacherApplicationById(id)

  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 })
  }

  return NextResponse.json({ application })
}

