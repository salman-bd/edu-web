"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProfileAlertDialog } from "@/components/profile/ProfileAlertDialog"
import { DeleteConfirmDialog } from "@/components/profile/DeleteConfirmDialog"
import TeacherProfileForm from "@/components/profile/TeacherProfileForm"
import StudentProfileForm from "@/components/profile/StudentProfileForm"

interface profileData {
  id: string
  profileType: string
  avatar: string
  name: string
  designation: string
  institutionName: string
  grade: string
  email: string
  birthDate: string
  gender: string
  graduationYear: string
  university: string
  hscPassingYear: string
  college: string
  sscPassingYear: string
  school: string
  contactNo: string
  isAffiliated: boolean
}

interface UserProfileHandlerProps {
  data: profileData | null
}

export function ProfileHandler({ data }: UserProfileHandlerProps) {
  const router = useRouter();
  const profileType = data?.profileType;

  const [isProfileEditing, setIsProfileEditing] = useState(false)

  const [isProfileCompleteDialogOpen, setIsProfileCompleteDialogOpen] = useState(false)
  const [isProfileDeleteDialogOpen, setIsProfileDeleteDialogOpen] = useState(false)

  const closeProfileCompleteDialog = () => setIsProfileCompleteDialogOpen(false);
  const closeProfileDeleteDialog = () => setIsProfileDeleteDialogOpen(false);

  const profileCompleteContinue = (type: string, isCSCAffiliated: string) => {
    setIsProfileCompleteDialogOpen(false)
    if (type === "student" && isCSCAffiliated === "yes") {
      router.push("/profile/csc-verification/student")
    } else if (type === "teacher" && isCSCAffiliated === "yes") {
      router.push("/profile/csc-verification/teacher")
    } else if (type === "student" && isCSCAffiliated === "no") {
      router.push(`/profile/student/profile-completion/`)
    } else if (type === "teacher" && isCSCAffiliated === "no") {
      router.push(`/profile/teacher/profile-completion/`)
    }
  }

  const handleProfileComplete = () => setIsProfileCompleteDialogOpen(true)
  const handleProfileEdit = () => setIsProfileEditing(true)
  const handleProfileDelete = () => setIsProfileDeleteDialogOpen(true)

  const profileDeleteConfirm = async () => {
    if (!data) return
    try {
      // console.log('ID to be deleted: ', data.id);
      const response = await fetch(`/api/profile/delete/?id=${data.id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        toast({
          title: "Profile Deletion",
          description: "Your profile has been deleted successfully.",
          variant: "default",
        })
        router.push("/")
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to delete profile")
      }
    } catch (error) {
      console.error("Profile deletion error:", error)
      toast({
        title: "Profile Deletion Failed",
        description: `An error occurred: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProfileAlertDialog isOpen={isProfileCompleteDialogOpen} onClose={closeProfileCompleteDialog} onContinue={profileCompleteContinue} />

      <div>
        <div className="relative lg:w-1/2 mx-auto">
          {isProfileEditing && (
            <Button
              variant="outline"
              onClick={() => setIsProfileEditing(false)}
              className="bg-indigo-100 text-red-500 hover:bg-indigo-200 absolute top-0 left-0 rounded-md "
            >
              Close
              {/* <X /> */}
            </Button>
          )}
        </div>
        
        {data && isProfileEditing && (
          <div className="">
            {profileType === "teacher" ? <TeacherProfileForm data={data} /> : <StudentProfileForm data={data} />}
          </div>
        )}
      </div>

      <Card className="lg:w-1/2 mx-auto">
        <CardContent className="flex justify-between items-center p-6">
          {data ? (
            <>
              {isProfileEditing ? (
                <Button
                  variant="outline"
                  onClick={() => setIsProfileEditing(false)}
                  className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Cancel
                </Button>
              ) : (
                <Button onClick={handleProfileEdit} className="bg-indigo-600 text-white hover:bg-indigo-700">
                  Edit Profile
                </Button>
              )}
              <Button onClick={handleProfileDelete} className="bg-red-600 text-white hover:bg-red-700">
                Delete Profile
              </Button>
            </>
          ) : (
            <Button onClick={handleProfileComplete} className="bg-indigo-600 text-white hover:bg-indigo-700">
              Complete Profile
            </Button>
          )}
        </CardContent>
      </Card>

      <DeleteConfirmDialog 
      isOpen={isProfileDeleteDialogOpen} 
      onClose={closeProfileDeleteDialog} 
      onConfirm={profileDeleteConfirm}
      />

    </motion.div>
  )
}

