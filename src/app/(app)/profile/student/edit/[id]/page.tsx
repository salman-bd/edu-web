"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import StudentProfileEditForm from "@/components/profile/StudentProfileEditForm"

export default function TeacherProfilePage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const params = useParams()
  const { id } = params

  const handleSubmitSuccess = () => {
    setIsSubmitted(true)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 500)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Profile Updated Successfully!</h2>
          <p className="mb-4">
            Your teacher profile has been updated and is now available to students and administrators.
          </p>
        </div>
      ) : (
        <StudentProfileEditForm profileId={id?.toString()} onSuccess={handleSubmitSuccess} />
      )}
    </div>
  )
}

