"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ApplicationSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="border-green-500 border-t-4 shadow-lg">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mx-auto bg-green-100 p-3 rounded-full w-20 h-20 flex items-center justify-center mb-4"
          >
            <CheckCircle className="h-10 w-10 text-green-600" />
          </motion.div>
          <CardTitle className="text-2xl text-green-600">Application Submitted Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-4">
            Thank you for your interest in joining our teaching team. We have received your application and will review
            it shortly.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <h3 className="font-medium text-indigo-600 mb-2">What happens next?</h3>
            <ol className="list-decimal list-inside text-left text-gray-600 space-y-2">
              <li>Our HR team will review your application and CV</li>
              <li>If your qualifications match our requirements, we'll contact you for an interview</li>
              <li>The interview process may include a teaching demonstration</li>
              <li>Final selection will be based on qualifications, experience, and interview performance</li>
            </ol>
          </div>
          <p className="text-gray-600">
            If you have any questions, please contact our HR department at{" "}
            <span className="text-indigo-600 font-medium">cscedubd@gmail.com</span> or call{" "}
            <span className="text-indigo-600 font-medium">+88 01784313268</span>.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button asChild variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

