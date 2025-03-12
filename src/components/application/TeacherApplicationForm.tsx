"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Upload } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { teachingApplicationBaseSchema } from "@/schemas/applicationsSchema"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]



// Create the form schema dynamically based on environment
const formSchema = z.object({
  ...teachingApplicationBaseSchema,
  resume:
    typeof window === "undefined"
      ? z.any() // Use a placeholder during SSR
      : z
          .instanceof(FileList)
          .refine((files) => files.length > 0, { message: "CV/Resume is required" })
          .refine((files) => files[0]?.size <= MAX_FILE_SIZE, { message: "File size must be less than 5MB" })
          .refine((files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type), {
            message: "Only PDF and Word documents are accepted",
          }),
})

type FormValues = z.infer<typeof formSchema>

interface TeacherApplicationFormProps {
  onSubmitSuccess: () => void
}

export function TeacherApplicationForm({ onSubmitSuccess }: TeacherApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      highestDegree: "",
      university: "",
      yearsOfExperience: "",
      subjectSpecialization: "",
      teachingLevel: [],
      coverLetter: "",
    },
    mode: "onChange",
  })

  const teachingLevels = [
    { id: "elementary", label: "Elementary School (K-5)" },
    { id: "middle", label: "Middle School (6-8)" },
    { id: "high", label: "High School (9-10)" },
    { id: "college", label: "College" },
  ]

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Create FormData object to handle file upload
      const formData = new FormData()

      // Append all text fields
      formData.append("firstName", data.firstName)
      formData.append("lastName", data.lastName)
      formData.append("email", data.email)
      formData.append("phone", data.phone)
      formData.append("address", data.address)
      formData.append("highestDegree", data.highestDegree)
      formData.append("university", data.university)
      formData.append("yearsOfExperience", data.yearsOfExperience)
      formData.append("subjectSpecialization", data.subjectSpecialization)
      formData.append("teachingLevel", JSON.stringify(data.teachingLevel))
      formData.append("coverLetter", data.coverLetter)

      // Append the file
      if (data.resume instanceof FileList && data.resume[0]) {
        formData.append("resume", data.resume[0])
      }

      console.log("Submitting form data...")

      const response = await fetch("/api/application/teacher", {
        method: "POST",
        body: formData,
      })

      const responseData = await response.json()

      if (!response.ok) {
        console.error("Server response error:", responseData)
        throw new Error(responseData.message || "Failed to submit application")
      }

      console.log("Form submitted successfully:", responseData)
      toast.success("Application submitted successfully! We'll review your application and contact you soon.", {
        duration: 4000,
      })
      onSubmitSuccess()
    } catch (error) {
      console.error("Error submitting form:", error)
      let errorMessage = "There was a problem submitting your application. Please try again."
      if (error instanceof Error) {
        errorMessage = `Error: ${error.message}. Please try again.`
      }
      setSubmitError(errorMessage)
      toast.error(errorMessage, {
        duration: 4000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const { errors } = form.formState
  if (Object.keys(errors).length > 0) {
    console.log("Validation errors:", errors)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border-indigo-600 border-t-4 shadow-lg">
        <Toaster position="top-center" />
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-600">Teacher Application Form</CardTitle>
          <CardDescription>
            Please complete all required fields. Your application will be reviewed by our HR department.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">{submitError}</div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Form fields remain the same */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-600">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-600">First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
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
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-600">Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            {...field}
                            className="border-indigo-200 focus:border-indigo-600"
                          />
                        </FormControl>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-600">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-600">Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
                            {...field}
                            className="border-indigo-200 focus:border-indigo-600"
                          />
                        </FormControl>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-indigo-600">Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your address"
                          {...field}
                          className="border-indigo-200 focus:border-indigo-600"
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-600">Educational Background</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="highestDegree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-600">Highest Degree</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-indigo-200 focus:border-indigo-600">
                              <SelectValue placeholder="Select your highest degree" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bachelor">Bachelor&apos;s Degree</SelectItem>
                            <SelectItem value="master">Master&apos;s Degree</SelectItem>
                            <SelectItem value="phd">Ph.D.</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="university"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-600">University/Institution</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your university"
                            {...field}
                            className="border-indigo-200 focus:border-indigo-600"
                          />
                        </FormControl>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-600">Teaching Experience</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="yearsOfExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-600">Years of Experience</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-indigo-200 focus:border-indigo-600">
                              <SelectValue placeholder="Select years of experience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0-2">0-2 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="6-10">6-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subjectSpecialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-600">Subject Specialization</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="E.g., Mathematics, Science, English"
                            {...field}
                            className="border-indigo-200 focus:border-indigo-600"
                          />
                        </FormControl>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="teachingLevel"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-indigo-600">Preferred Teaching Level</FormLabel>
                        <FormDescription>Select all that apply</FormDescription>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {teachingLevels.map((level) => (
                          <FormField
                            key={level.id}
                            control={form.control}
                            name="teachingLevel"
                            render={({ field }) => {
                              return (
                                <FormItem key={level.id} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(level.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, level.id])
                                          : field.onChange(field.value?.filter((value) => value !== level.id))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{level.label}</FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-600">Application Documents</h3>
                <FormField
                  control={form.control}
                  name="coverLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-indigo-600">Cover Letter / Teaching Philosophy</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your teaching philosophy and why you want to join our institution"
                          className="min-h-[150px] border-indigo-200 focus:border-indigo-600"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please write a brief statement about your teaching approach and why you&apos;re interested in
                        joining our team.
                      </FormDescription>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel className="text-indigo-600">CV/Resume</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="resume-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-indigo-200 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-indigo-600" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PDF or Word (MAX. 5MB)</p>
                              {value instanceof FileList && value.length > 0 && (
                                <p className="mt-2 text-sm text-indigo-600 font-medium">{value[0].name}</p>
                              )}
                            </div>
                            <input
                              id="resume-upload"
                              type="file"
                              className="hidden"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => {
                                if (e.target.files) {
                                  onChange(e.target.files)
                                }
                              }}
                              {...rest}
                            />
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-red-800 hover:bg-red-700 text-white">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

