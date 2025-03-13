"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Phone,
  School,
  CheckCircle,
  Calendar,
  GraduationCap,
  BookOpen,
  Award,
  MapPin,
  Briefcase,
} from "lucide-react"

interface ProfileData {
  isAffiliated: boolean
  birthDate: string | number | Date
  avatar: string
  name: string
  designation: string
  institutionName: string
  email: string
  contactNo: string
  university: string
  graduationYear: string
  college: string
  hscPassingYear: string
  school: string
  sscPassingYear: string
  achievements?: string[]
  address?: string
  experience?: string
}

export function TeacherProfile({ data }: { data: ProfileData }) {
  const [activeTab, setActiveTab] = useState("basic")
  const isVerified = data.isAffiliated

  function calculateAge(birthDateString: string | number | Date) {
    const birthDate = new Date(birthDateString)
    const today = new Date()

    let years = today.getFullYear() - birthDate.getFullYear()
    let months = today.getMonth() - birthDate.getMonth()
    let days = today.getDate() - birthDate.getDate()

    // Adjust for negative days
    if (days < 0) {
      months--
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate()
    }
    // Adjust for negative months
    if (months < 0) {
      years--
      months += 12
    }
    return `${years} Years ${months} Months ${days} Days`
  }

  const age = calculateAge(data.birthDate)

  return (
    <Card className="max-w-3xl mx-auto shadow-lg border-indigo-100">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-t-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <Avatar className="w-28 h-28 border-4 border-white">
              <AvatarImage src={data.avatar} alt={data.name} />
              <AvatarFallback className="bg-indigo-300 text-indigo-800 text-4xl">{data.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {isVerified && (
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            )}
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">{data.name}</h1>
              {isVerified ? (
                <Badge className="bg-green-500 hover:bg-green-600 self-center">Verified</Badge>
              ) : (
                <Badge className="bg-amber-500 hover:bg-amber-600 self-center">Pending Verification</Badge>
              )}
            </div>
            <h2 className="text-xl font-medium text-indigo-100">{data.designation}</h2>
            <div className="flex flex-col md:flex-row gap-4 mt-3">
              <div className="flex items-center gap-1">
                <School className="h-4 w-4" />
                <span className="text-sm">{data.institutionName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{data.email}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <Tabs defaultValue="basic" className="w-full" onValueChange={setActiveTab}>
        <div className="px-6 pt-4">
          <TabsList className="grid grid-cols-3 w-full bg-indigo-50">
            <TabsTrigger
              value="basic"
              className={
                activeTab === "basic" ? "data-[state=active]:bg-indigo-600 data-[state=active]:text-white" : ""
              }
            >
              Basic Info
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className={
                activeTab === "education" ? "data-[state=active]:bg-indigo-600 data-[state=active]:text-white" : ""
              }
            >
              Education
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className={
                activeTab === "achievements" ? "data-[state=active]:bg-indigo-600 data-[state=active]:text-white" : ""
              }
            >
              Achievements
            </TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="pt-6">
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem
                icon={<Phone className="h-5 w-5 text-indigo-600" />}
                label="Contact Number"
                value={data.contactNo}
              />
              <InfoItem icon={<Calendar className="h-5 w-5 text-indigo-600" />} label="Age" value={age} />
              {data.address && (
                <InfoItem icon={<MapPin className="h-5 w-5 text-indigo-600" />} label="Address" value={data.address} />
              )}
              {data.experience && (
                <InfoItem
                  icon={<Briefcase className="h-5 w-5 text-indigo-600" />}
                  label="Experience"
                  value={data.experience}
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="education" className="space-y-4">
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-600 pl-4 py-1">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold text-lg">University Education</h3>
                </div>
                <p className="text-gray-700">{data.university}</p>
                <p className="text-gray-500 text-sm">Graduation Year: {data.graduationYear}</p>
              </div>

              <div className="border-l-4 border-indigo-400 pl-4 py-1">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold text-lg">College Education</h3>
                </div>
                <p className="text-gray-700">{data.college}</p>
                <p className="text-gray-500 text-sm">HSC Passing Year: {data.hscPassingYear}</p>
              </div>

              <div className="border-l-4 border-indigo-300 pl-4 py-1">
                <div className="flex items-center gap-2 mb-1">
                  <School className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold text-lg">School Education</h3>
                </div>
                <p className="text-gray-700">{data.school}</p>
                <p className="text-gray-500 text-sm">SSC Passing Year: {data.sscPassingYear}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            {data.achievements && data.achievements.length > 0 ? (
              <div className="space-y-4">
                {data.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-3 items-start p-3 bg-indigo-50 rounded-lg">
                    <Award className="h-5 w-5 text-indigo-600 mt-0.5" />
                    <div>
                      <p className="text-gray-800">{achievement}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Award className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No achievements listed yet.</p>
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-gray-800">{value}</p>
      </div>
    </div>
  )
}

