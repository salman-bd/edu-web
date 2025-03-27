"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import toast from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"
import {
  AtSign, PhoneCall, Building, Clock, UserCircle, BookOpen, Navigation, 
  Award, FileText, Edit, Trash, Star, ShieldCheck,} from "lucide-react"
import { StudentProfileType } from "@/types/profile"

type ProfileDataProps = {
  data: StudentProfileType
}

export function StudentProfile({ data }: ProfileDataProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
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

  // Add this function to the StudentProfile component before the return statement
  const handleEdit = () => {
    // Stringify and encode the data
    const encodedData = encodeURIComponent(JSON.stringify(data))
    // Navigate to the edit page with the encoded data
    router.push(`/profile/student/edit/${data._id}?data=${encodedData}`)
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const response = await fetch(`/api/profile/student/${data._id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete profile")
      }
      toast.success("Your student profile has been successfully deleted.")
      router.push("/")

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete profile. Please try again."
      toast.error(errorMessage)
    } finally {
      setIsDeleting(false)
    }
  }

  const age = calculateAge(data.dateOfBirth)
  const hasAddress = data.address && data.city && data.state && data.zipCode
  const fullAddress = hasAddress ? `${data.address}, ${data.city}, ${data.state} ${data.zipCode}` : null

  // Get program level label
  const getProgramLevelLabel = (level: string) => {
    switch (level) {
      case "elementary":
        return "Elementary School (K-5)"
      case "middle":
        return "Middle School (6-8)"
      case "high":
        return "High School (9-10)"
      case "college":
        return "College (11-12)"
      default:
        return level
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
          <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 w-full text-white p-6 rounded-t-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
                  <AvatarImage src={data.photoUrl} alt={data.fullName} />
                  <AvatarFallback className="bg-indigo-300 text-indigo-800 text-4xl">
                    {data.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {isVerified && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-2 -right-2 bg-white rounded-full p-1"
                  >
                    <ShieldCheck className="h-6 w-6 text-green-600" />
                  </motion.div>
                )}
              </motion.div>

              <div className="text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold">{data.fullName}</h1>
                  {isVerified ? (
                    <Badge className="bg-green-500 hover:bg-green-600 self-center">
                      <Star className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-500 hover:bg-amber-600 self-center">
                      <Clock className="h-3 w-3 mr-1" /> Pending Verification
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <Badge className="bg-indigo-700 hover:bg-indigo-800">
                    <UserCircle className="h-3 w-3 mr-1" /> {data.type}
                  </Badge>
                  <Badge variant="outline" className="bg-indigo-600/20 text-white border-indigo-400">
                    <BookOpen className="h-3 w-3 mr-1" /> {data.programType}
                  </Badge>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span className="text-sm">{data.institutionName}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4 md:mt-0 md:self-start">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEdit}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/40"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </motion.div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/20 hover:bg-red-400/30 text-white border-white/40"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </motion.div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your student profile and remove your
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
        </CardHeader>

        <Tabs defaultValue="basic" className="w-full" onValueChange={setActiveTab}>
          <div className="px-6 pt-2">
            <TabsList className="grid grid-cols-3 w-full bg-indigo-50">
              <TabsTrigger
                value="basic"
                className={
                  activeTab === "basic" ? "data-[state=active]:bg-indigo-600 data-[state=active]:text-white" : ""
                }
              >
                <UserCircle className="h-4 w-4 mr-2" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className={
                  activeTab === "education" ? "data-[state=active]:bg-indigo-600 data-[state=active]:text-white" : ""
                }
              >
                <Award className="h-4 w-4 mr-2" />
                Education
              </TabsTrigger>
              <TabsTrigger
                value="statement"
                className={
                  activeTab === "statement" ? "data-[state=active]:bg-indigo-600 data-[state=active]:text-white" : ""
                }
              >
                <FileText className="h-4 w-4 mr-2" />
                Statement
              </TabsTrigger>
            </TabsList>
          </div>

          <CardContent className="pt-6 relative z-10">
            <AnimatePresence mode="wait">
              {activeTab === "basic" && (
                <motion.div
                  key="basic"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100"
                    >
                      <InfoItem
                        icon={<AtSign className="h-5 w-5 text-indigo-600" />}
                        label="Email"
                        value={data.email}
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100"
                    >
                      <InfoItem
                        icon={<PhoneCall className="h-5 w-5 text-indigo-600" />}
                        label="Contact Number"
                        value={data.phone}
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100"
                    >
                      <InfoItem icon={<Clock className="h-5 w-5 text-indigo-600" />} label="Age" value={age} />
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100"
                    >
                      <InfoItem
                        icon={<UserCircle className="h-5 w-5 text-indigo-600" />}
                        label="Gender"
                        value={data.gender || "" }
                      />
                    </motion.div>

                    {fullAddress && (
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100 md:col-span-2"
                      >
                        <InfoItem
                          icon={<Navigation className="h-5 w-5 text-indigo-600" />}
                          label="Address"
                          value={fullAddress}
                        />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "education" && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="border-l-4 border-indigo-600 pl-4 py-3 bg-white rounded-r-lg shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="h-5 w-5 text-indigo-600" />
                      <h3 className="font-semibold text-lg text-indigo-700">Current Institution</h3>
                    </div>
                    <p className="text-gray-700 font-medium">{data.institutionName}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">{getProgramLevelLabel(data.programLevel || "")}</Badge>
                      <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">{data.programType}</Badge>
                    </div>
                  </motion.div>

                  {data.previousSchool && (
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="border-l-4 border-indigo-400 pl-4 py-3 bg-white rounded-r-lg shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-indigo-600" />
                        <h3 className="font-semibold text-lg text-indigo-700">Previous School</h3>
                      </div>
                      <p className="text-gray-700 font-medium">{data.previousSchool}</p>
                    </motion.div>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="border-l-4 border-indigo-300 pl-4 py-3 bg-white rounded-r-lg shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-indigo-600" />
                      <h3 className="font-semibold text-lg text-indigo-700">Profile Crated</h3>
                    </div>
                    <p className="text-gray-700 font-medium">
                      {data.createdAt
                        ? new Date(data.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Not available"}
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "statement" && (
                <motion.div
                  key="statement"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {data.personalStatement ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-5 w-5 text-indigo-600" />
                        <h3 className="font-semibold text-lg text-indigo-700">Personal Statement</h3>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 bg-indigo-50 rounded-lg text-gray-700 leading-relaxed border-l-4 border-indigo-400 shadow-sm"
                      >
                        {data.personalStatement}
                      </motion.div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 text-gray-500 bg-indigo-50/50 rounded-lg border border-dashed border-indigo-200"
                    >
                      <FileText className="h-16 w-16 mx-auto mb-4 text-indigo-200" />
                      <p className="text-lg font-medium text-indigo-400">No personal statement provided.</p>
                      <p className="text-sm text-indigo-300 mt-2">
                        You can add a personal statement by editing your profile.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEdit}
                        className="mt-4 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Add Statement
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 pt-4 border-t border-indigo-100 flex justify-between items-center">
              <p className="text-sm text-indigo-400">Profile ID: {data._id.substring(0, 8)}...</p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
                  onClick={handleEdit}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete Profile
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your student profile and remove your
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
        </Tabs>
      </Card>
    </motion.div>
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
      <div className="mt-0.5 bg-indigo-50 p-2 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-indigo-400 font-medium">{label}</p>
        <p className="text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  )
}

