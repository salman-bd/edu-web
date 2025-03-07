"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, Clock, Calendar, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import type { ApplicationStatus } from "@/types/application"

interface ApplicationStatusCardProps {
  id: string
  type: "student" | "teacher"
}

interface StatusInfo {
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

const statusInfo: Record<ApplicationStatus, StatusInfo> = {
  PENDING: {
    title: "Application Received",
    description: "Your application has been received and is waiting to be reviewed.",
    icon: <Clock className="h-8 w-8" />,
    color: "text-yellow-500",
  },
  UNDER_REVIEW: {
    title: "Under Review",
    description: "Your application is currently being reviewed by our team.",
    icon: <AlertCircle className="h-8 w-8" />,
    color: "text-blue-500",
  },
  INTERVIEW_SCHEDULED: {
    title: "Interview Scheduled",
    description: "We'd like to meet you! Check your email for interview details.",
    icon: <Calendar className="h-8 w-8" />,
    color: "text-purple-500",
  },
  ACCEPTED: {
    title: "Application Accepted",
    description: "Congratulations! Your application has been accepted.",
    icon: <CheckCircle2 className="h-8 w-8" />,
    color: "text-green-500",
  },
  REJECTED: {
    title: "Application Not Accepted",
    description: "We regret to inform you that your application was not accepted at this time.",
    icon: <XCircle className="h-8 w-8" />,
    color: "text-red-500",
  },
  WAITLISTED: {
    title: "Waitlisted",
    description: "You've been placed on our waitlist. We'll contact you if a spot becomes available.",
    icon: <Clock className="h-8 w-8" />,
    color: "text-orange-500",
  },
}

export function ApplicationStatusCard({ id, type }: ApplicationStatusCardProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  interface ApplicationData {
    status: ApplicationStatus;
    firstName: string;
    lastName: string;
    email: string;
    programType?: string;
    subject?: string;
    createdAt: string;
    updatedAt: string;
    notes?: string;
  }

  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null)

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        setLoading(true)
        const endpoint = type === "student" ? `/api/application-status?id=${id}` : `/api/careers/status?id=${id}`

        const response = await fetch(endpoint)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch application status")
        }

        const data = await response.json()
        setApplicationData(data.application)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchApplicationStatus()
    }
  }, [id, type])

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mb-4" />
          <p className="text-gray-600">Loading application status...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-gray-700 mb-4">{error}</p>
            <p className="text-gray-600">Please check that you&apos;ve entered the correct application ID and try again.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (!applicationData) {
    return (
      <Card className="w-full max-w-2xl mx-auto border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-600">Application Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
            <p className="text-gray-700 mb-4">We couldn&apos;t find an application with the ID: {id}</p>
            <p className="text-gray-600">Please check that you&apos;ve entered the correct application ID and try again.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const status = applicationData.status as ApplicationStatus
  const statusDetails = statusInfo[status]
  const fullName = `${applicationData.firstName} ${applicationData.lastName}`
  const programOrSubject = type === "student" ? applicationData.programType : applicationData.subject
  const dateSubmitted = new Date(applicationData.createdAt).toLocaleDateString()
  const lastUpdated = new Date(applicationData.updatedAt).toLocaleDateString()

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-2xl text-indigo-600">Application Status</CardTitle>
        <CardDescription>
          Application ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{id}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
          <div className={`rounded-full p-4 ${statusDetails.color} bg-opacity-10`}>{statusDetails.icon}</div>
          <div>
            <h3 className={`text-xl font-semibold ${statusDetails.color} mb-2`}>{statusDetails.title}</h3>
            <p className="text-gray-600 mb-4">{statusDetails.description}</p>
            {applicationData.notes && (
              <div className="bg-gray-50 p-3 rounded-md border border-gray-200 mb-4">
                <p className="text-gray-700 text-sm">{applicationData.notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-700 mb-3">Application Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-gray-500">Applicant</p>
              <p className="font-medium">{fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{applicationData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{type === "student" ? "Program" : "Subject"}</p>
              <p className="font-medium">{programOrSubject}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date Submitted</p>
              <p className="font-medium">{dateSubmitted}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-medium">{lastUpdated}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex flex-col sm:flex-row gap-3">
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
          <Link href="/">Return to Home</Link>
        </Button>
        <Button asChild variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

