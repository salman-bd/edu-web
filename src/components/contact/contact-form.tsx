"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import toast, { Toaster } from "react-hot-toast"
import { Loader2 } from "lucide-react"
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

export default function ContactForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

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

      toast.success("Message sent! We'll get back to you as soon as possible.")
      form.reset()
      router.push("/")
      
    } catch (error) {
      let errorMessage = "There was a problem sending your message. Please try again.";  
      if (error instanceof Error) {  
        errorMessage = `Error: ${error.message}. Please try again.`;  
      }  
      toast.error(errorMessage); 
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-indigo-100">
      <Toaster position="top-center" />
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">Send us a message</h2>
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
                    placeholder="Your message"
                    {...field}
                    className="border-indigo-200 focus:border-indigo-600"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="bg-red-900 hover:bg-red-800 text-white">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

