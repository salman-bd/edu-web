"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

const formSchema = z.object({
  applicationId: z.string().min(6, {
    message: "Application ID must be at least 6 characters.",
  }),
})

interface ApplicationStatusFormProps {
  type: "student" | "teacher"
}

export function ApplicationStatusForm({ type }: ApplicationStatusFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const applicationId = searchParams.get("id")
  const [submitted, setSubmitted] = useState(false)
  const [applicationData, setApplicationData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicationId: applicationId || "",
    },
  })

  // Fetch application data when ID is in URL
  useEffect(() => {
    if (applicationId) {
      fetchApplicationStatus(applicationId)
    }
  }, [applicationId, type])

  async function fetchApplicationStatus(id: string) {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/application/status/?type=${type}&id=${id}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch application status")
      }
      const data = await response.json()
      // console.log('Response data: ', data);
      const applicationData = data.application

      setApplicationData(applicationData)
      setSubmitted(true)

    } catch (err: any) {
      setError(err.message)
      setSubmitted(false)
    } finally {
      setIsLoading(false)
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`?id=${values.applicationId}`)
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-8 h-8 border-t-2 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500">Loading application status...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (submitted && applicationData) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl text-indigo-600">Application Status</CardTitle>
          <CardDescription>Details for application ID: {applicationData.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-lg ">{applicationData.firstName} {applicationData.lastName}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="text-lg text-amber-700">{applicationData.status}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Submitted Date</p>
              <p className="text-lg ">{applicationData.createdAt}</p>
            </div>
          </div>
          {applicationData.nextStep && (
            <div>
              <p className="text-sm font-medium text-gray-500">Next Step</p>
              <p className="text-lg font-semibold">{applicationData.nextStep}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button
            variant="outline"
            onClick={() => {
              router.push("?")
              setSubmitted(false)
              setApplicationData(null)
            }}
          >
            Check Another
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">Contact Admissions</Button>
        </CardFooter>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto border-red-200">
        <CardHeader>
          <CardTitle className="text-xl text-red-600">Error</CardTitle>
          <CardDescription>We couldn't find your application.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              router.push("?")
              setError(null)
            }}
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-indigo-600">Enter Application ID</CardTitle>
        <CardDescription>
          You can find your application ID in the confirmation email you received after submitting your application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="applicationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., APP123456"
                      {...field}
                      className="border-indigo-200 focus:border-indigo-600"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
              Check Status
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-sm text-gray-500">
          If you don&apos;t have your application ID, please contact our admissions office.
        </p>
      </CardFooter>
    </Card>
  )
}

