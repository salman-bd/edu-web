"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { ProfileAlertDialog } from "@/components/profile/ProfileAlertDialog"
import TeacherProfileForm from "./[type]/profile-completion/TeacherProfileForm"
import StudentProfileForm from "./[type]/profile-completion/StudentProfileForm"
import { motion } from "framer-motion"

export function UserProfile({ data }) {
  const router = useRouter()
  const [isProfileEditing, setIsProfileEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const profileType = data?.profileType

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleContinue = (preData: { type: string; isCSCAffiliated: string }) => {
    setIsDialogOpen(false)
    if (preData.type === "student" && preData.isCSCAffiliated === "yes") {
      router.replace("profile/student")
    } else if (preData.type === "teacher" && preData.isCSCAffiliated === "yes") {
      router.replace("profile/teacher")
    } else if (preData.type === "student" && preData.isCSCAffiliated === "no") {
      router.replace(`profile/student/profile-completion/`)
    } else {
      router.replace(`profile/teacher/profile-completion/`)
    }
  }

  const handleProfileComplete = () => {
    setIsDialogOpen(true)
  }

  const handleProfileEdit = () => {
    setIsProfileEditing(true)
  }

  const handleProfileDelete = () => {
    // Implement profile deletion logic here
    console.log("Profile deletion requested")
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProfileAlertDialog isOpen={isDialogOpen} onClose={handleCloseDialog} onContinue={handleContinue} />

      {data && isProfileEditing && (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{profileType === "teacher" ? "Edit Teacher Profile" : "Edit Student Profile"}</CardTitle>
          </CardHeader>
          <CardContent>
            {profileType === "teacher" ? <TeacherProfileForm dbData={data} /> : <StudentProfileForm dbData={data} />}
          </CardContent>
        </Card>
      )}

      <Card className="w-full max-w-2xl mx-auto">
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
    </motion.div>
  )
}

