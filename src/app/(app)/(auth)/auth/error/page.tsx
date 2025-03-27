"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function AuthError() {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string>("An authentication error occurred")

  useEffect(() => {
    const error = searchParams.get("error")
    if (error) {
      switch (error) {
        case "Configuration":
          setErrorMessage("There is a problem with the server configuration.")
          break
        case "AccessDenied":
          setErrorMessage("Access denied. You do not have permission to sign in.")
          break
        case "Verification":
          setErrorMessage("The verification link may have expired or already been used.")
          break
        case "OAuthSignin":
        case "OAuthCallback":
        case "OAuthCreateAccount":
        case "EmailCreateAccount":
        case "Callback":
          setErrorMessage("There was a problem with the authentication provider.")
          break
        case "OAuthAccountNotLinked":
          setErrorMessage("This email is already associated with another account.")
          break
        case "EmailSignin":
          setErrorMessage("The email could not be sent.")
          break
        case "CredentialsSignin":
          setErrorMessage("Sign in failed. Check the details you provided are correct.")
          break
        case "SessionRequired":
          setErrorMessage("Please sign in to access this page.")
          break
        default:
          setErrorMessage(`An authentication error occurred: ${error}`)
      }
    }
  }, [searchParams])

  return (
    <div className="max-w-md mx-auto py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-red-600">Authentication Error</CardTitle>
            <CardDescription className="text-center">There was a problem with your authentication.</CardDescription>
          </CardHeader>
          <CardContent className="text-center text-gray-600">
            <p>{errorMessage}</p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button asChild className="w-full">
              <Link href="/signin">Back to Sign In</Link>
            </Button>
            <div className="text-sm text-center text-gray-500">
              Need help?{" "}
              <Link href="/contact" className="text-indigo-600 hover:text-indigo-500">
                Contact Support
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

