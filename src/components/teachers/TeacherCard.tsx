"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Award,
  BookOpen,
  GraduationCap,
  MessageSquare,
  ChevronRight,
  Calendar,
  MapPin,
  School,
  Clock,
} from "lucide-react"
import { useRouter } from "next/navigation"
import type { TeacherProfileType } from "@/types/profile"
import { format } from "date-fns"
import { date } from "zod"

interface TeacherCardProps {
  teacher: TeacherProfileType
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const router = useRouter()

  // Map teaching levels to a readable format with proper styling
  const teachingLevelMap: Record<string, { label: string; color: string }> = {
    elementary: { label: "Elementary", color: "bg-green-100 text-green-800 hover:bg-green-200" },
    middle: { label: "Middle School", color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
    high: { label: "High School", color: "bg-violet-100 text-violet-800 hover:bg-violet-200" },
    college: { label: "College", color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
  }

  // Format date to be more readable
  const formattedAge = new Date().getFullYear() - new Date(teacher.dateOfBirth).getFullYear();  

  const handleViewProfile = () => {
    const teacherId = teacher._id?.toString() || ""

    const essentialData = {
      _id: teacherId,
      fullName: teacher.fullName || `${teacher.firstName} ${teacher.lastName}`,
      photoUrl: teacher.photoUrl,
      type: teacher.type,
    }

    const encodedData = encodeURIComponent(JSON.stringify(essentialData))
    router.push(`/profile/teacher/${teacherId}?data=${encodedData}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full border-t-4 border-t-indigo-700 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          {/* Header with gradient background and decorative elements */}
          <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-4 relative">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8"></div>

            <div className="flex items-center gap-4 relative z-10">
              <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
                <AvatarImage
                  src={teacher.photoUrl || "/placeholder.svg?height=64&width=64"}
                  alt={`${teacher.firstName} ${teacher.lastName}`}
                />
                <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">
                  {teacher.firstName?.charAt(0)?.toUpperCase() || "?"}
                  {teacher.lastName?.charAt(0)?.toUpperCase() || ""}
                </AvatarFallback>
              </Avatar>

              <div className="text-white">
                <h3 className="font-semibold text-lg">
                  {teacher.firstName} {teacher.lastName}
                </h3>
                <p className="text-indigo-100 text-sm flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {teacher.subjectSpecialization} Teacher
                </p>
              </div>
            </div>
          </div>

          {/* Teacher details */}
          <div className="p-4 space-y-4">
            {/* Badges row */}
            <div className="flex flex-wrap gap-2">
              {teacher.isAffiliated === "true" && (
                <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                  <Award className="h-3 w-3 mr-1" /> CSC Affiliated
                </Badge>
              )}
              <Badge className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100">
                <GraduationCap className="h-3 w-3 mr-1" />
                {teacher.highestDegree?.toUpperCase() || ""}
              </Badge>
              <Badge className="bg-red-700 text-white hover:bg-red-600">
                <Clock className="h-3 w-3 mr-1" />
                {teacher.yearsOfExperience} Experience
              </Badge>
            </div>

            {/* Info grid with icons */}
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              {teacher.university && (
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4 text-indigo-500" />
                  <span>{teacher.university}</span>
                </div>
              )}
              {teacher.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-indigo-500" />
                  <span>{teacher.address}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-500" />
                <span>Age: {formattedAge} Years</span>
              </div>
            </div>

            {/* Teaching levels */}
            <div>
              <p className="text-xs font-medium text-indigo-500 mb-1">Teaching Levels</p>
              <div className="flex flex-wrap gap-1">
                {teacher.teachingLevel?.map((level) => (
                  <Badge
                    key={level}
                    className={`${teachingLevelMap[level]?.color || "bg-indigo-100 text-indigo-800"} text-xs`}
                  >
                    <ChevronRight className="h-2 w-2 mr-1" />
                    {teachingLevelMap[level]?.label || level}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action buttons with hover effects */}
            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleViewProfile}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow"
              >
                View Profile
              </Button>
              {/* <Button
                variant="outline"
                size="icon"
                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
              >
                <MessageSquare className="h-4 w-4" />
              </Button> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

