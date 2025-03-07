"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ApplicationForm } from "@/components/application/StudentApplicationForm"
import { ApplicationSuccess } from "@/components/application/StudentApplicationSuccess"

export default function ApplyPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 space-y-16 py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">Application Form</h1>
          <p className="text-left md:text-center mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Complete the form below to apply for admission to our programs. Our admissions team will review your
            application and contact you soon.
          </p>
        </motion.div>

        {isSubmitted ? <ApplicationSuccess /> : <ApplicationForm onSubmitSuccess={() => setIsSubmitted(true)} />}
      </div>
    </div>
  )
}

