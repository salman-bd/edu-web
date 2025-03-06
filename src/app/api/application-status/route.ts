import { type NextRequest, NextResponse } from "next/server"
import type { StudentApplication } from "@/types/application"

// This would normally come from your database
const getApplicationById = async (id: string): Promise<StudentApplication | null> => {
  // Mock data for demonstration
  const applications: Record<string, StudentApplication> = {
    APP123456: {
      id: "APP123456",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      programLevel: "high",
      programType: "High School Program (9-12)",
      status: "under_review",
      createdAt: new Date("2023-09-15"),
      updatedAt: new Date("2023-09-17"),
      notes: "Application is currently being reviewed by the admissions committee.",
    },
    APP789012: {
      id: "APP789012",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      programLevel: "elementary",
      programType: "Elementary Education (K-5)",
      status: "interview_scheduled",
      createdAt: new Date("2023-09-10"),
      updatedAt: new Date("2023-09-18"),
      notes: "Interview scheduled for September 25, 2023 at 10:00 AM.",
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

  const application = await getApplicationById(id)

  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 })
  }

  return NextResponse.json({ application })
}

