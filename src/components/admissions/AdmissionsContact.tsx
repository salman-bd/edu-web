'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})


export function AdmissionsContact() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to submit the form")
      }
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })
      form.reset();
      router.push('/admissions')
    } catch {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold tracking-tight text-indigo-600 text-center">Contact Admissions</h2>
      <Card className="border-indigo-600 border-t-4">
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-600">
            Have questions? Get in touch with our admissions team.
          </CardTitle>
          <CardDescription className="text-lg">We&apos;re here to help you through the application process.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-indigo-600">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} className="border-indigo-200 focus:border-indigo-600" />
                    </FormControl>
                    <FormMessage className="text-red-700" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-indigo-600">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Your email"
                        {...field}
                        className="border-indigo-200 focus:border-indigo-600"
                      />
                    </FormControl>
                    <FormMessage className="text-red-700" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-indigo-600">Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Message subject"
                        {...field}
                        className="border-indigo-200 focus:border-indigo-600"
                      />
                    </FormControl>
                    <FormMessage className="text-red-700" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-indigo-600">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your question or comment"
                        {...field}
                        className="border-indigo-200 focus:border-indigo-600"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="bg-red-800 hover:bg-red-700 text-white">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </CardContent>

      </Card>
    </section>
  )
}

