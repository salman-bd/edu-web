"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import axios from "axios"


interface StudentCodeVerificationProps {
  cscVerified?: () => void
}

export function StudentCodeVerificationForm({ cscVerified }: StudentCodeVerificationProps) {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")

  const handleVerifyCode = async () => {
    setIsVerifying(true)
    setError("")
    try {
      const response = await axios.post(`/api/profile/csc-verification?type=student`, { code })
      if (response.status === 200 && response.data.success) {
        if (cscVerified) {
          cscVerified()
        }
      } else {
        // Use the error message from the server if available
        setError(response.data.message || "Incorrect teacher access code. Please try again.")
      }
    } catch (err) {
      // Handle network errors or other exceptions
      console.error("Verification error:", err)
      setError(
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Failed to verify code. Please try again."
      )
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-indigo-600">Verify Your Student Code</CardTitle>
          <CardDescription>
            Enter the student access code provided by your institution to verify your status and access student
            resources.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentCode">Student Access Code</Label>
              <Input
                id="studentCode"
                placeholder="Enter the student access code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="border-indigo-300 focus:border-indigo-500"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="text-sm text-gray-500">
              <p>The student access code should be in the format: STU-XXXXXX</p>
              <p>If you haven&apos;t received your code, please contact the admissions office.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            onClick={handleVerifyCode}
            className="w-full bg-indigo-600 hover:bg-indigo-7000 text-white"
            disabled={isVerifying}
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Student Status"
            )}
          </Button>
          <Button variant="outline" className="w-full" onClick={() => router.push("/profile")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

