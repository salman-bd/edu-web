export type ApplicationStatus =
  | "pending"
  | "under_review"
  | "interview_scheduled"
  | "accepted"
  | "rejected"
  | "waitlisted"

export interface BaseApplication {
  id: string
  status: ApplicationStatus
  createdAt: Date
  updatedAt: Date
  notes?: string
}

export interface StudentApplication extends BaseApplication {
  firstName: string
  lastName: string
  email: string
  phone: string
  programLevel: string
  programType: string
}

export interface TeacherApplication extends BaseApplication {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  yearsOfExperience: string
}

