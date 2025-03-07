"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export function ApplicationSuccess() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-green-600 border-t-4 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-green-600 flex items-center">
            <CheckCircle2 className="mr-2 h-6 w-6" />
            Application Submitted Successfully!
          </CardTitle>
          <CardDescription>
            Thank you for your interest in joining our team. We have received your application and will review it
            carefully. We will contact you if you are selected for an interview.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            We appreciate you taking the time to apply. If you have any questions, please don&apos;t hesitate to contact
            our HR department.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

