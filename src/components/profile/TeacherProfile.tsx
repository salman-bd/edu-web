"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AtSign, GraduationCap, Home, Calendar, BookOpen, Award, Clock, Edit3, Trash2, ChevronRight, } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import { TeacherProfileType } from "@/types/profile"
import Image from "next/image"

type ProfileDataProps = {
  data: TeacherProfileType
}

export const TeacherProfile = ({ data }: ProfileDataProps) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  // Map teaching levels to a readable format with proper styling
  const teachingLevelMap: Record<string, { label: string; color: string }> = {
    elementary: { label: "Elementary School", color: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200" },
    middle: { label: "Middle School", color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
    high: { label: "High School", color: "bg-violet-100 text-violet-800 hover:bg-violet-200" },
    college: { label: "College", color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
  }

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  const handleEdit = () => {
    // Stringify and encode the data
    const encodedData = encodeURIComponent(JSON.stringify(data))
    router.push(`/profile/teacher/edit/${data.id}?data=${encodedData}`)
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const response = await fetch(`/api/profile/teacher/${data.id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete profile")
      }
      toast.success("Your teacher profile has been successfully deleted.", { duration: 4000 })
      router.push("/")

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete profile. Please try again."
      toast.error(errorMessage, { duration: 4000 })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="border-red-700 border-t-4 shadow-xl overflow-hidden relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full -mr-32 -mt-32 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full -ml-32 -mb-32 opacity-20"></div>

        <CardHeader className="relative pb-0 p-0">
          <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 w-full rounded-t-lg">
            <div className="flex justify-between items-center p-4">
              <h1 className="text-3xl text-white font-semibold">Teacher Profile</h1>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEdit}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
                >
                  <Edit3 className="h-5 w-5" />
                </motion.button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/20 hover:bg-red-400/30 text-white p-2 rounded-full transition-all"
                    >
                      <Trash2 className="h-5 w-5" />
                    </motion.button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your teacher profile and remove your
                        data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        {isDeleting ? "Deleting..." : "Delete Profile"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6 pt-6 md:pt-6 px-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg"
            >
              <Image
                src={data.photoUrl || "/placeholder.svg?height=128&width=128"}
                alt={`${data.firstName} ${data.lastName}`}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="text-center md:text-left md:pb-4 flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
                {data.firstName} {data.lastName}
              </h1>
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-400" />
                {data.subjectSpecialization} Teacher
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {data.isAffiliated === "true" && (
                  <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                    <Award className="h-3 w-3 mr-1" /> Affiliated Teacher
                  </Badge>
                )}
                <Badge className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100">
                  <Clock className="h-3 w-3 mr-1" /> {data.yearsOfExperience} Experience
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-indigo-100"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-indigo-600 pb-2 border-b border-indigo-100">
                <span className="p-1.5 rounded-full bg-indigo-100">
                  <AtSign className="h-5 w-5 text-indigo-600" />
                </span>
                Contact Information
              </h2>

              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 p-2 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  <AtSign className="h-5 w-5 text-indigo-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-indigo-400">Email</p>
                    <p className="font-medium">{data.email}</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 p-2 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-indigo-400 mt-0.5"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <div>
                    <p className="text-sm text-indigo-400">Phone</p>
                    <p className="font-medium">{data.phone}</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 p-2 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  <Home className="h-5 w-5 text-indigo-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-indigo-400">Address</p>
                    <p className="font-medium">{data.address}</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 p-2 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  <Calendar className="h-5 w-5 text-indigo-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-indigo-400">Date of Birth</p>
                    <p className="font-medium">{formatDate(data.dateOfBirth)}</p>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* Education & Experience */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-indigo-100"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-indigo-600 pb-2 border-b border-indigo-100">
                <span className="p-1.5 rounded-full bg-indigo-100">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                </span>
                Education & Experience
              </h2>

              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 p-2 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  <GraduationCap className="h-5 w-5 text-indigo-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-indigo-400">University</p>
                    <p className="font-medium">{data.university}</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 p-2 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  <Award className="h-5 w-5 text-indigo-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-indigo-400">Highest Degree</p>
                    <p className="font-medium capitalize">{data.highestDegree}</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 p-2 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  <Clock className="h-5 w-5 text-indigo-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-indigo-400">Years of Experience</p>
                    <p className="font-medium">{data.yearsOfExperience}</p>
                  </div>
                </motion.div>
              </div>
            </motion.section>
          </div>

          <Separator className="my-8 bg-indigo-200" />

          {/* Teaching Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-indigo-100"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-indigo-600 pb-2 border-b border-indigo-100">
              <span className="p-1.5 rounded-full bg-indigo-100">
                <BookOpen className="h-5 w-5 text-indigo-600" />
              </span>
              Teaching Information
            </h2>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-indigo-400 mb-2">Subject Specialization</p>
                <p className="text-lg font-medium bg-indigo-50 p-2 rounded-md inline-block">
                  {data.subjectSpecialization}
                </p>
              </div>

              <div>
                <p className="text-sm text-indigo-400 mb-2">Teaching Levels</p>
                <div className="flex flex-wrap gap-2">
                  {data.teachingLevel?.map((level) => (
                    <motion.div key={level} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Badge
                        className={`${teachingLevelMap[level]?.color || "bg-indigo-100 text-indigo-800"} px-3 py-1 text-sm flex items-center gap-1`}
                      >
                        <ChevronRight className="h-3 w-3" />
                        {teachingLevelMap[level]?.label || level}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              {data.coverLetter && (
                <div>
                  <p className="text-sm text-indigo-400 mb-2">Teaching Philosophy</p>
                  <div className="bg-indigo-50 p-4 rounded-md border-l-4 border-indigo-400 italic">
                    <p className="text-gray-700">{data.coverLetter}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.section>

          <div className="mt-8 text-sm text-indigo-400 flex justify-between items-center">
            <p>Profile Created {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "N/A"}</p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
                onClick={handleEdit}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Profile
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your teacher profile and remove your
                      data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      {isDeleting ? "Deleting..." : "Delete Profile"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

