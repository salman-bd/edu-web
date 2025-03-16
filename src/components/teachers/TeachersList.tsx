"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import TeacherCard from "@/components/teachers/TeacherCard"
import type { TeacherProfileType } from "@/types/profile"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { TeacherProfileAlertDialog } from "../profile/TeacherProfileAlertDialog"


interface TeacherListProps {
  teachers: TeacherProfileType[]
}

export default function TeacherList({ teachers }: TeacherListProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("")
  const [levelFilter, setLevelFilter] = useState("")

  // Get unique subjects for filter
  const subjects = Array.from(new Set(teachers.map((t) => t.subjectSpecialization)))

  // Get unique teaching levels for filter
  const allLevels = teachers.flatMap((t) => t.teachingLevel || [])
  const uniqueLevels = Array.from(new Set(allLevels))

  // Filter teachers based on search and filters
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      searchTerm === "" ||
      `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subjectSpecialization?.toLowerCase().includes(searchTerm.toLowerCase())

    // Fix for "All Subjects" - check if subjectFilter is empty OR "all"
    const matchesSubject = 
      subjectFilter === "" || 
      subjectFilter === "all" || 
      teacher.subjectSpecialization === subjectFilter

    // Fix for "All Levels" - check if levelFilter is empty OR "all"
    const matchesLevel = 
      levelFilter === "" || 
      levelFilter === "all" || 
      teacher.teachingLevel?.includes(levelFilter)

    return matchesSearch && matchesSubject && matchesLevel
  })

  const handleProfileComplete = () => setIsProfileCompleteDialogOpen(true)
  const [isProfileCompleteDialogOpen, setIsProfileCompleteDialogOpen] = useState(false)
  const closeProfileCompleteDialog = () => setIsProfileCompleteDialogOpen(false);
  const profileCompleteContinue = (isCscAffiliated: string) => {
    setIsProfileCompleteDialogOpen(false)
    if (isCscAffiliated === "yes") {
      router.push(`/profile/teacher/creation?isCscAffiliated=${true}`)
    } else if (isCscAffiliated === "no") {
      router.push(`/profile/teacher/creation`)
    } 
  }
  
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
        <h2 className="text-lg font-medium text-indigo-700 mb-4">Find Teachers</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Input
              placeholder="Search by name or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>

          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject || ""}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {uniqueLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredTeachers.length} of {teachers.length} teachers
          </p>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm("")
              setSubjectFilter("")
              setLevelFilter("")
            }}
            className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
          >
            <Filter className="h-3 w-3 mr-2" />
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Teacher grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher) => <TeacherCard key={teacher._id?.toString()} teacher={teacher} />)
        ) : (
          <div className="col-span-full text-center py-12 bg-indigo-50 rounded-lg">
            <h3 className="text-lg font-medium text-indigo-700">No teachers found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <div>
        <TeacherProfileAlertDialog 
        isOpen={isProfileCompleteDialogOpen} 
        onClose={closeProfileCompleteDialog} 
        onContinue={profileCompleteContinue} 
        />

        <Card className="mx-auto bg-indigo-200 ">
          <CardContent className="flex items-center justify-center p-4">
            <Button onClick={handleProfileComplete} className="bg-indigo-600 text-white hover:bg-indigo-700 ">
              Create Teaching Profile
            </Button>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}

