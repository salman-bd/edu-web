"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, RefreshCw, Save, Send } from "lucide-react"
import type { ApplicationStatus } from "@/types/application"
import { toast } from "react-hot-toast"

interface ApplicationDetail {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  city: string
  state: string
  zipCode: string
  programLevel: string
  programType: string
  previousSchool: string
  personalStatement: string
  status: ApplicationStatus
  notes?: string
  createdAt: string
  updatedAt: string
}

export default function ApplicationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params
  // console.log('Application ID: ', id);


  const [application, setApplication] = useState<ApplicationDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<ApplicationStatus | "">("")
  const [notes, setNotes] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchApplicationDetail()
  }, [id])

  const fetchApplicationDetail = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/application/admin/student/${id}`)

      if (!response.ok) {
        throw new Error("Failed to fetch application details")
      }
      const data = await response.json()
      // console.log('Response Data: ', data);
      setApplication(data.application)
      setStatus(data.application.status)
      setNotes(data.application.notes || "")

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Error fetching application details:", err)
    } finally {
      setLoading(false)
    }
  }

  const updateApplication = async () => {
    if (!status) {
      toast.error("Please select a status")
      return
    }

    try {
      setSaving(true)
      const response = await fetch(`/api/application/admin/student/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          notes,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update application")
      }

      const data = await response.json()
      console.log('Response Data: ', data);

      setApplication(data.application)
      toast.success("Application updated successfully")

    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update application")
      console.error("Error updating application:", err)
    } finally {
      setSaving(false)
    }
  }

  const getStatusBadgeColor = (status: ApplicationStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "UNDER_REVIEW":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "INTERVIEW_SCHEDULED":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "ACCEPTED":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "REJECTED":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "WAITLISTED":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p>Loading application details...</p>
        </div>
      </div>
    )
  }

  if (error || !application) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{error || "Application not found"}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Applications
        </Button>
        <h1 className="text-2xl font-bold">Application Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>
                    {application.firstName} {application.lastName}
                  </CardTitle>
                  <CardDescription>Application ID: {application._id}</CardDescription>
                </div>
                <Badge className={getStatusBadgeColor(application.status)}>
                  {application.status.replace(/_/g, " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Personal Details</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="statement">Personal Statement</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p>{application.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                      <p>{application.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
                      <p>{new Date(application.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Address</h3>
                      <p>{application.address}</p>
                      <p>
                        {application.city}, {application.state} {application.zipCode}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="education" className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Program Level</h3>
                    <p>{application.programLevel}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Program Type</h3>
                    <p>{application.programType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Previous School</h3>
                    <p>{application.previousSchool}</p>
                  </div>
                </TabsContent>

                <TabsContent value="statement">
                  <div className="bg-gray-50 p-4 rounded-md border">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Personal Statement</h3>
                    <p className="whitespace-pre-wrap">{application.personalStatement}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 mb-1 block">Application Status</label>
                <Select value={status} onValueChange={(value) => setStatus(value as ApplicationStatus)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                    <SelectItem value="INTERVIEW_SCHEDULED">Interview Scheduled</SelectItem>
                    <SelectItem value="ACCEPTED">Accepted</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                    <SelectItem value="WAITLISTED">Waitlisted</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 mb-1 block">Notes</label>
                <Textarea
                  placeholder="Add notes about this application"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={fetchApplicationDetail} disabled={saving}>
                Reset
              </Button>
              <Button onClick={updateApplication} disabled={saving}>
                {saving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Submitted</span>
                  <span className="text-sm text-gray-500">{new Date(application.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Last Updated</span>
                  <span className="text-sm text-gray-500">{new Date(application.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href={`mailto:${application.email}`}>
                  <Send className="h-4 w-4 mr-2" />
                  Contact Applicant
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

