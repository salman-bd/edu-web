"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Mail } from "lucide-react"
import { motion } from "framer-motion"

export default function CheckEmail() {
  return (
    <div className="max-w-md mx-auto py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Mail className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-indigo-600">Check Your Email</CardTitle>
            <CardDescription className="text-center">
              We've sent a password reset link to your email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-gray-600">
            <p>Please check your email inbox and click on the link to reset your password.</p>
            <p className="mt-2">If you don't see the email, check your spam folder.</p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-500">
              <Link href="/signin">Back to Sign In</Link>
            </Button>
            <div className="text-sm text-center text-gray-500">
              Didn't receive the email?{" "}
              <Link href="/forgot-password" className="text-indigo-600 hover:text-indigo-500">
                Try again
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

