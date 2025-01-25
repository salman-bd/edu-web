"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export function TeacherCodeVerificationForm() {
  const [code, setCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleVerifyCode = async () => {
    setIsVerifying(true)
    setError("")

    if (code === "TCH-CSC002") {
      const affiliated = "Classic School And College"
      router.push(`/profile/teacher/profile-completion?affiliated=${encodeURIComponent(affiliated)}`)
    } else {
      setError("Incorrect teacher access code. Please try again.")
    }
    setIsVerifying(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-indigo-600">Verify Your Teacher Access Code</CardTitle>
          <CardDescription>
            Enter the teacher access code provided by your institution to verify your status and access teacher
            resources.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teacherCode">Teacher Access Code</Label>
              <Input
                id="teacherCode"
                placeholder="Enter the teacher access code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="border-indigo-300 focus:border-indigo-500"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="text-sm text-gray-500">
              <p>The teacher access code should be in the format: TCH-XXXXXX</p>
              <p>If you haven't received the code, please contact the admissions office.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            onClick={handleVerifyCode}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={isVerifying}
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Teacher Status"
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

