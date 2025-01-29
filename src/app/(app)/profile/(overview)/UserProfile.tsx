"use client"

import {  useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import { ProfileAlertDialog } from "@/components/profile/ProfileAlertDialog"
import TeacherProfileForm from "./[type]/profile-completion/TeacherProfileForm"
import StudentProfileForm from "./[type]/profile-completion/StudentProfileForm"
import { motion } from "framer-motion"
import { Cross, X } from "lucide-react"

export function UserProfile({ data }) {
  const router = useRouter();
  const searchParams = useSearchParams();  
  const success = searchParams.get('success');
  console.log("success: ", success);
  
  const [isProfileEditing, setIsProfileEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const profileType = data?.profileType;



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
            {profileType === "teacher" ? <TeacherProfileForm dbData={data} /> : <StudentProfileForm dbData={data} />}
          </div>
        )}

       
      </div>


      <Card className="lg:w-1/2  mx-auto">
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

