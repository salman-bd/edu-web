"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"
import type { ApiResponse } from "@/types/ApiResponse"
import axios, { type AxiosError } from "axios"
import { useParams, useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"

import type * as z from "zod"
import type { verifySchema } from "@/schemas/verifySchema"

export default function VerifyAccount() {
  const [verifyCode, setVerifyCode] = useState(["", "", "", "", "", ""])
  const [isResending, setIsResending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const router = useRouter()
  const params = useParams<{ email: string }>()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false

    setVerifyCode([...verifyCode.map((d, idx) => (idx === index ? element.value : d))])

    if (element.nextSibling && element.value !== "") {
      ;(element.nextSibling as HTMLElement).focus()
    }
  }

  const handleResendOTP = async () => {
    if (countdown > 0) return

    setIsResending(true)
    try {
      const response = await axios.post<ApiResponse>("/api/auth/resend-verification", {
        email: params.email,
      })

      if (response.data.success) {
        toast.success(response.data.message || "Verification code resent successfully!", { duration: 4000 })
        // Set a 60-second countdown before allowing another resend
        setCountdown(60)
      } else {
        toast.error(response.data.message || "Failed to resend verification code", { duration: 4000 })
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || "Failed to resend verification code", { duration: 4000 })
    } finally {
      setIsResending(false)
    }
  }

  const handleVerifyCode = async (data: z.infer<typeof verifySchema>) => {
    setIsVerifying(true)
    try {
      const response = await axios.post<ApiResponse>(`/api/auth/verify-code`, {
        email: params.email,
        code: data.code,
      })
      console.log("Verification page response; ", response)

      if (response.data.success) {
        toast.success(response.data.message || "Verifucation Successful!", { duration: 4000 })
      }
      router.push("/signin")
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(
        `Verification Failed: ${axiosError.response?.data.message}` ||
          "Verification Failed: An error occurred. Please try again.",
        {
          duration: 4000,
        },
      )
    } finally {
      setIsVerifying(false)
    }
  }

  const handleGoBack = () => {
    router.push("/signup")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <Toaster position="top-center" />
      <CardHeader>
        <CardTitle>Enter Verification Code</CardTitle>
        <CardDescription>
          We&apos;ve sent a 6-digit code to your email. Enter it below to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-2 mb-4">
          {verifyCode.map((data, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              className="w-10 h-10 text-center"
            />
          ))}
        </div>
        <div className="text-center mb-4">
          {countdown > 0 && <p className="text-sm text-gray-500">Resend available in {countdown} seconds</p>}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          onClick={() => handleVerifyCode({ code: verifyCode.join("") })}
          className="w-full bg-indigo-600 hover:bg-indigo-500"
          disabled={verifyCode.some((digit) => digit === "") || isVerifying}
        >
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify Account"
          )}
        </Button>
        <div className="flex justify-between w-full">
          <Button variant="outline" className="w-1/2" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button variant="outline" className="w-1/2" onClick={handleResendOTP} disabled={isResending || countdown > 0}>
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resending...
              </>
            ) : countdown > 0 ? (
              `Wait ${countdown}s`
            ) : (
              "Resend Code"
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

