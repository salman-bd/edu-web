

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
            Thank you for submitting your application. Our admissions team will review your information and contact you
            soon.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <h3 className="font-medium text-indigo-600 mb-2">What happens next?</h3>
            <ol className="list-decimal list-inside text-left text-gray-600 space-y-2">
              <li>Our admissions team will review your application (typically within 5-7 business days)</li>
              <li>You&apos;ll receive an email confirmation with your application reference number</li>
              <li>We may contact you for additional information or to schedule an interview</li>
              <li>You&apos;ll receive a decision regarding your application status</li>
            </ol>
          </div>
          <p className="text-gray-600">
            If you have any questions, please contact our admissions office at{" "}
            <span className="text-indigo-600 font-medium">cscedubd@gmail.com</span> or call{" "}
            <span className="text-indigo-600 font-medium">+88 01784313268</span>.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button asChild variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
            <Link href="/admissions">Back to Admissions</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

