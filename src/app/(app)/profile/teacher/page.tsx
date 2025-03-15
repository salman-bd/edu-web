"use client"

import { useState } from "react"
import TeacherProfileForm from "@/components/profile/TeacherProfileForm"
import { Toaster } from "@/components/ui/toaster"
import { useSearchParams } from "next/navigation"
import { TeacherCodeVerificationForm } from "@/components/profile/TeacherCodeVerificationForm"

export default function TeacherProfilePage() {
  const [isCscVerified, setIsCscVerified] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const searchParams = useSearchParams()
  const isCscAffiliated = searchParams.get('isCscAffiliated')

  const handleCscVerificationResult = () => {
    setIsCscVerified(true)
  }

  const handleSubmitSuccess = () => {
    setIsSubmitted(true)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 500)
  }

  if (isCscAffiliated && !isCscVerified) {
    return(
      <TeacherCodeVerificationForm cscVerified={handleCscVerificationResult}/>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Profile Updated Successfully!</h2>
          <p className="mb-4">
            Your teacher profile has been updated and is now available to students and administrators.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Edit Profile Again
          </button>
        </div>
      ) : (
        <TeacherProfileForm onSubmitSuccess={handleSubmitSuccess} />
      )}
      <Toaster />
    </div>
  )
}

