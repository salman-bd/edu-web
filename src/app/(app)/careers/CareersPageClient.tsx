"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { TeacherApplicationForm } from "@/components/careers/TeacherApplicationForm"
import { ApplicationSuccess } from "@/components/careers/ApplicationSuccess"

export default function CareersPageClient() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {isSubmitted ? <ApplicationSuccess /> : <TeacherApplicationForm onSubmitSuccess={() => setIsSubmitted(true)} />}
    </motion.div>
  )
}

