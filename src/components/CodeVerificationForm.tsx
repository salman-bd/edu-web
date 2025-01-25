'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CodeVerificationForm() {
  const [code, setCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleVerifyCode = async () => {
    setIsVerifying(true)
    setError('')

    // Simulate API call to verify student code
    await new Promise(resolve => setTimeout(resolve, 2000))

    // For demonstration, let's assume codes starting with 'STU' are valid
    if (code.startsWith('STU')) {
      console.log('Student Code Verified:', code)
      // Here you would typically update the user's status in your system
      router.push('/dashboard') // Redirect to student dashboard
    } else {
      setError('Invalid student code. Please try again.')
    }

    setIsVerifying(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Verify Your Student Code</CardTitle>
        <CardDescription>
          Enter the student code provided by your institution to verify your status and access student resources.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="studentCode">Student Code</Label>
            <Input
              id="studentCode"
              placeholder="Enter your student code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="text-sm text-gray-500">
            <p>Your student code should be in the format: STU-XXXXXX</p>
            <p>If you haven&apos;t received your code, please contact the admissions office.</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button 
          onClick={handleVerifyCode} 
          className="w-full" 
          disabled={code.length < 6 || isVerifying}
        >
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify Student Code'
          )}
        </Button>
        <div className="flex justify-between w-full">
          <Button variant="outline" className="w-full" onClick={() => router.push('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

