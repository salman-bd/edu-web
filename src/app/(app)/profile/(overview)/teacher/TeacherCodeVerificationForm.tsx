'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function TeacherCodeVerificationForm() {
  const [code, setCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleVerifyCode = async () => {
    setIsVerifying(true);
    setError('');

    if (code === 'TCH-CSC002') {
      const affiliated = "Classic School And College";  // This should be fetched from the backend 
      router.push(`/profile/teacher/profile-completion?affiliated=${encodeURIComponent(affiliated)}`);
    } else {
      setError('Incorrect teacher access code. Please put the correct one.')
    }
    setIsVerifying(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Verify Your Teacher Access Code</CardTitle>
        <CardDescription>
          Enter the teacher access code provided by your institution to verify your status and access teacher resources.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="studentCode">Teacher Access Code</Label>
            <Input
              id="studentCode"
              placeholder="Enter the teacher access code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
          className="w-full" 
          disabled={isVerifying}
        >
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify Teacher Status'
          )}
        </Button>
        <div className="flex justify-between w-full">
          <Button variant="outline" className="w-full" onClick={() => router.push('/profile')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

