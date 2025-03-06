"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TeacherApplicationForm } from "@/components/careers/TeacherApplicationForm"
import { ApplicationSuccess } from "@/components/careers/ApplicationSuccess"

export default function CareersPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">Join Our Teaching Team</h1>
          <p className="text-left md:text-center mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            We`&apos;`re looking for passionate educators who are committed to excellence in teaching and learning. Submit your
            application below to be considered for teaching positions at our institution.
          </p>
        </motion.div>

        {isSubmitted ? <ApplicationSuccess /> : <TeacherApplicationForm onSubmitSuccess={() => setIsSubmitted(true)} />}
      </div>
    </div>
  )
}

