"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import StudentProfileForm from "@/components/profile/StudentProfileForm"
import { Toaster } from "react-hot-toast"
import { StudentCodeVerificationForm } from "@/components/profile/StudentCodeVerificationForm"

export default function StudentProfilePage() {
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
      <StudentCodeVerificationForm cscVerified={handleCscVerificationResult}/>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Profile Created Successfully!</h2>
          <p className="mb-4">Your student profile has been created and is now available in the system.</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Edit Profile Again
          </button>
        </div>
      ) : (
        <StudentProfileForm onSubmitSuccess={handleSubmitSuccess} />
      )}
      <Toaster />
    </div>
  )
}

