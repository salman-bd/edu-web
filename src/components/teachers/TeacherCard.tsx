"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Award, BookOpen, GraduationCap, Heart, MessageSquare, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import type { TeacherProfileType } from "@/types/profile"

interface TeacherCardProps {
  teacher: TeacherProfileType
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const router = useRouter()

  // Map teaching levels to a readable format with proper styling
  const teachingLevelMap: Record<string, { label: string; color: string }> = {
    elementary: { label: "Elementary", color: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200" },
    middle: { label: "Middle School", color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
    high: { label: "High School", color: "bg-violet-100 text-violet-800 hover:bg-violet-200" },
    college: { label: "College", color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
  }

  const handleViewProfile = () => {
    // Use _id instead of id, and convert to string if it's an ObjectId
    const teacherId = teacher.id?.toString() || ""

    // Stringify and encode only necessary data to avoid large URLs
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
      <Card className="h-full border-t-4 border-t-indigo-600 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-4 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>

            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage
                  src={teacher.photoUrl || "/placeholder.svg?height=64&width=64"}
                  alt={`${teacher.firstName} ${teacher.lastName}`}
                />
                <AvatarFallback className="bg-indigo-100 text-indigo-700">
                  {teacher.firstName?.charAt(0) || "?"}
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
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {teacher.isAffiliated === "true" && (
                <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                  <Award className="h-3 w-3 mr-1" /> Affiliated
                </Badge>
              )}
              <Badge className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100">
                <GraduationCap className="h-3 w-3 mr-1" /> {teacher.highestDegree}
              </Badge>
              <Badge className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100">
                {teacher.yearsOfExperience} Experience
              </Badge>
            </div>

            {/* Teaching levels */}
            <div>
              <p className="text-xs text-indigo-400 mb-1">Teaching Levels</p>
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

            {/* Brief description */}
            {teacher.coverLetter && (
              <div>
                <p className="text-xs text-indigo-400 mb-1">Teaching Philosophy</p>
                <p className="text-sm text-gray-600 line-clamp-2 italic">&quot;{teacher.coverLetter}&quot;</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2 pt-2">
              <Button onClick={handleViewProfile} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                View Profile
              </Button>
              <Button variant="outline" size="icon" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

