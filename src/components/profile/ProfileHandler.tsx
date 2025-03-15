"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProfileAlertDialog } from "@/components/profile/ProfileAlertDialog"


export function ProfileHandler() {
  const router = useRouter();
  const [isProfileCompleteDialogOpen, setIsProfileCompleteDialogOpen] = useState(false)

  const closeProfileCompleteDialog = () => setIsProfileCompleteDialogOpen(false);

  const profileCompleteContinue = (type: string, isCscAffiliated: string) => {
    setIsProfileCompleteDialogOpen(false)
    if (isCscAffiliated === "yes") {
      router.push(`/profile/${type}?isCscAffiliated=${true}`)
    } else if (isCscAffiliated === "no") {
      router.push(`/profile/${type}`)
    } 
  }

  const handleProfileComplete = () => setIsProfileCompleteDialogOpen(true)
 
  return (
    <div>
      <ProfileAlertDialog 
      isOpen={isProfileCompleteDialogOpen} 
      onClose={closeProfileCompleteDialog} 
      onContinue={profileCompleteContinue} 
      />

      <Card className="lg:w-1/2 mx-auto">
        <CardContent className="flex justify-between items-center p-6">
          <Button onClick={handleProfileComplete} className="bg-indigo-600 text-white hover:bg-indigo-700">
            Complete Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

