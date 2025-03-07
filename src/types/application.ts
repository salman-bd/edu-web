import type { ObjectId } from "mongodb"

export type ApplicationStatus =
  | "PENDING"
  | "UNDER_REVIEW"
  | "INTERVIEW_SCHEDULED"
  | "ACCEPTED"
  | "REJECTED"
  | "WAITLISTED"

export interface BaseApplication {
  _id: ObjectId
  firstName: string
  lastName: string
  email: string
  status: ApplicationStatus
  submittedAt: Date
  updatedAt: Date
  notes?: string
}

export interface StudentApplication extends BaseApplication {
  phone: string
  dateOfBirth: Date
  address: string
  city: string
  state: string
  zipCode: string
  programLevel: "elementary" | "middle" | "high" | "college"
  programType: string
  previousSchool: string
  personalStatement: string
}

export interface TeacherApplication extends BaseApplication {
  phone: string
  address: string
  highestDegree: string
  university: string
  yearsOfExperience: string
  subjectSpecialization: string
  teachingLevel: string[]
  coverLetter: string
  resume: {
    filename: string
    contentType: string
    size: number
    data: Buffer
  }
}

// Frontend-friendly versions (without sensitive data, with string IDs)
export interface ApplicationResponse {
  id: string
  firstName: string
  lastName: string
  email: string
  status: ApplicationStatus
  createdAt: string
  updatedAt: string
  notes?: string
  programType?: string
  subject?: string
}

