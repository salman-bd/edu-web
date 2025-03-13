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
  User,
  BookOpen,
  MapPin,
  GraduationCap,
  FileText,
} from "lucide-react"

interface ProfileData {
  isAffiliated: boolean
  birthDate: string | number | Date
  avatar: string
  name: string
  profileType: string
  institutionName: string
  grade: string
  email: string
  contactNo: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  previousSchool?: string
  personalStatement?: string
  achievements?: string[]
}

export function StudentProfile({ data }: { data: ProfileData }) {
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
  const hasAddress = data.address && data.city && data.state && data.zipCode
  const fullAddress = hasAddress ? `${data.address}, ${data.city}, ${data.state} ${data.zipCode}` : null

  return (
    <Card className="max-w-3xl mx-auto shadow-lg border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <Avatar className="w-28 h-28 border-4 border-white">
              <AvatarImage src={data.avatar} alt={data.name} />
              <AvatarFallback className="bg-blue-300 text-blue-800 text-4xl">{data.name.charAt(0)}</AvatarFallback>
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
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Badge className="bg-blue-700 hover:bg-blue-800">{data.profileType}</Badge>
              <Badge variant="outline" className="bg-blue-600/20 text-white border-blue-400">
                {data.grade}
              </Badge>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-2">
              <div className="flex items-center gap-1">
                <School className="h-4 w-4" />
                <span className="text-sm">{data.institutionName}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <Tabs defaultValue="basic" className="w-full" onValueChange={setActiveTab}>
        <div className="px-6 pt-4">
          <TabsList className="grid grid-cols-3 w-full bg-blue-50">
            <TabsTrigger
              value="basic"
              className={activeTab === "basic" ? "data-[state=active]:bg-blue-600 data-[state=active]:text-white" : ""}
            >
              Basic Info
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className={
                activeTab === "education" ? "data-[state=active]:bg-blue-600 data-[state=active]:text-white" : ""
              }
            >
              Education
            </TabsTrigger>
            <TabsTrigger
              value="statement"
              className={
                activeTab === "statement" ? "data-[state=active]:bg-blue-600 data-[state=active]:text-white" : ""
              }
            >
              Statement
            </TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="pt-6">
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem icon={<Mail className="h-5 w-5 text-blue-600" />} label="Email" value={data.email} />
              <InfoItem
                icon={<Phone className="h-5 w-5 text-blue-600" />}
                label="Contact Number"
                value={data.contactNo}
              />
              <InfoItem icon={<Calendar className="h-5 w-5 text-blue-600" />} label="Age" value={age} />
              <InfoItem
                icon={<User className="h-5 w-5 text-blue-600" />}
                label="Profile Type"
                value={data.profileType}
              />
              {fullAddress && (
                <InfoItem
                  icon={<MapPin className="h-5 w-5 text-blue-600" />}
                  label="Address"
                  value={fullAddress}
                  className="md:col-span-2"
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="education" className="space-y-4">
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4 py-1">
                <div className="flex items-center gap-2 mb-1">
                  <School className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-lg">Current Institution</h3>
                </div>
                <p className="text-gray-700">{data.institutionName}</p>
                <p className="text-gray-500 text-sm">Grade/Class: {data.grade}</p>
              </div>

              {data.previousSchool && (
                <div className="border-l-4 border-blue-400 pl-4 py-1">
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-lg">Previous School</h3>
                  </div>
                  <p className="text-gray-700">{data.previousSchool}</p>
                </div>
              )}

              {data.achievements && data.achievements.length > 0 && (
                <div className="border-l-4 border-blue-300 pl-4 py-1">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-lg">Academic Achievements</h3>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {data.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="statement" className="space-y-4">
            {data.personalStatement ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-lg">Personal Statement</h3>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg text-gray-700 leading-relaxed">{data.personalStatement}</div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No personal statement provided.</p>
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}

function InfoItem({
  icon,
  label,
  value,
  className = "",
}: { icon: React.ReactNode; label: string; value: string; className?: string }) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-gray-800">{value}</p>
      </div>
    </div>
  )
}

