"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import StudentProfileForm from "@/components/StudentProfileForm"
import { Toaster } from "react-hot-toast"

export default function StudentProfilePage() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmitSuccess = () => {
    setIsSubmitted(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Profile Created Successfully!</h2>
          <p className="mb-4">Your student profile has been created and is now available in the system.</p>
          <p className="text-sm text-green-600">Redirecting to dashboard...</p>
        </div>
      ) : (
        <StudentProfileForm onSubmitSuccess={handleSubmitSuccess} />
      )}
      <Toaster />
    </div>
  )
}

