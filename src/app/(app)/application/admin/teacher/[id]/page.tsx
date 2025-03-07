"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, RefreshCw, Eye } from "lucide-react"
import Link from "next/link"
import type { ApplicationStatus } from "@/types/application"

interface TeacherApplication {
  id: string
  firstName: string
  lastName: string
  email: string
  subject: string
  status: ApplicationStatus
  createdAt: string
  updatedAt: string
}

export default function TeacherApplicationsAdminPage() {
  const [applications, setApplications] = useState<TeacherApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/teacher-applications")

      if (!response.ok) {
        throw new Error("Failed to fetch applications")
      }

      const data = await response.json()
      setApplications(data.applications)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Error fetching applications:", err)
    } finally {
      setLoading(false)
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

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.subject.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && app.status === activeTab
  })

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Teacher Applications</CardTitle>
              <CardDescription>Manage and review teacher applications</CardDescription>
            </div>
            <Button variant="outline" size="icon" onClick={fetchApplications} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search applications..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="PENDING">Pending</TabsTrigger>
              <TabsTrigger value="UNDER_REVIEW">Under Review</TabsTrigger>
              <TabsTrigger value="INTERVIEW_SCHEDULED">Interview</TabsTrigger>
              <TabsTrigger value="ACCEPTED">Accepted</TabsTrigger>
              <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              {error ? (
                <div className="text-center py-10 text-red-500">
                  <p>{error}</p>
                  <Button variant="outline" className="mt-4" onClick={fetchApplications}>
                    Try Again
                  </Button>
                </div>
              ) : loading ? (
                <div className="text-center py-10">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
                  <p>Loading applications...</p>
                </div>
              ) : filteredApplications.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <p>No applications found</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell className="font-mono text-xs">{application.id.substring(0, 10)}...</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {application.firstName} {application.lastName}
                              </div>
                              <div className="text-sm text-gray-500">{application.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{application.subject}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeColor(application.status)}>
                              {application.status.replace(/_/g, " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(application.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/teacher-applications/${application.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

