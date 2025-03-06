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
import { ApplicationStatusCard } from "./ApplicationStatusCard"

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
  const [submitted, setSubmitted] = useState(!!applicationId)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicationId: applicationId || "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`?id=${values.applicationId}`)
    setSubmitted(true)
  }

  if (submitted && applicationId) {
    return <ApplicationStatusCard id={applicationId} type={type} />
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

