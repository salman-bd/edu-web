"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import Image from "next/image"
import { Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { teacherProfileSchema, type TeacherProfileFormValues } from "@/schemas/teacherProfileSchema"
import { useSearchParams } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"

// Teaching levels data
const TEACHING_LEVELS = [
  { id: "elementary", label: "Elementary School (K-5)" },
  { id: "middle", label: "Middle School (6-8)" },
  { id: "high", label: "High School (9-12)" },
  { id: "college", label: "College" },
]

interface TeacherProfileFormProps {
  onSubmitSuccess?: () => void
}

export default function TeacherProfileForm({ onSubmitSuccess }: TeacherProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const isCscAffiliated = searchParams.get("isCscAffiliated") ? true : false
  // console.log('Search Params: ', searchParams, isCscAffiliated);
  

  const form = useForm<TeacherProfileFormValues>({
    resolver: zodResolver(teacherProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
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

  // Handle photo preview
  const handlePhotoChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Form submission handler
  const onSubmit = async (data: TeacherProfileFormValues) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Create FormData object to handle file upload
      const formData = new FormData()

      // Append all text fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "photo" && key !== "teachingLevel") {
          formData.append(key, value as string)
        }
      })

      // Handle teaching levels array
      formData.append("teachingLevel", JSON.stringify(data.teachingLevel))

      // Append photo file
      if (data.photo instanceof FileList && data.photo[0]) {
        formData.append("photo", data.photo[0])
      }
      if (isCscAffiliated) {
        formData.append("isCscAffiliated", isCscAffiliated);
      }
     

      const response = await fetch("/api/profile/teacher", {
        method: "POST",
        body: formData
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to submit profile")
      }

      toast.success("Your teacher profile has been successfully updated.", { duration: 4000})

      if (onSubmitSuccess) {
        onSubmitSuccess()
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      const errorMessage =
        error instanceof Error
          ? `Error: ${error.message}`
          : "There was a problem updating your profile. Please try again."

      setSubmitError(errorMessage)
      toast(errorMessage, { duration: 4000})

    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Toaster />
      <Card className="border-indigo-600 border-t-4 shadow-lg">
        <div className="bg-indigo-600">
          <h1 className="text-3xl md:text-4xl text-center text-white font-semibold p-4">
            Complete Your Teacher Profile
          </h1>
        </div>
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-600">Teacher Profile Information</CardTitle>
          <CardDescription>Please complete all required fields to set up your teacher profile.</CardDescription>
        </CardHeader>
        <CardContent>
          {submitError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">{submitError}</div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information Section */}
              <ProfileSection title="Personal Information">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-600">Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="border-indigo-200 focus:border-indigo-600" />
                        </FormControl>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />
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
              </ProfileSection>

              {/* Educational Background Section */}
              <ProfileSection title="Educational Background">
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
              </ProfileSection>

              {/* Teaching Experience Section */}
              <ProfileSection title="Teaching Experience">
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
                        {TEACHING_LEVELS.map((level) => (
                          <FormField
                            key={level.id}
                            control={form.control}
                            name="teachingLevel"
                            render={({ field }) => (
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
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
              </ProfileSection>

              {/* Teaching Philosophy & Photo Section */}
              <ProfileSection title="Teaching Philosophy & Profile Photo">
                <FormField
                  control={form.control}
                  name="coverLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-indigo-600">Teaching Philosophy(optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your teaching philosophy and why you chose teaching as a profession"
                          className="min-h-[150px] border-indigo-200 focus:border-indigo-600"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please write a brief statement about your teaching approach and educational values.
                      </FormDescription>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel className="text-indigo-600">Profile Photo</FormLabel>
                      <FormControl>
                        <div className="flex flex-col items-center justify-center w-full">
                          {photoPreview ? (
                            <div className="relative w-full h-48 mb-2">
                              <Image
                                src={photoPreview || "/placeholder.svg"}
                                alt="Profile preview"
                                fill
                                className="object-contain rounded-lg"
                              />
                              <button
                                type="button"
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                                onClick={() => {
                                  setPhotoPreview(null)
                                  onChange(null)
                                }}
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <label
                              htmlFor="photo-upload"
                              className="flex flex-col items-center justify-center w-full h-40 border-2 border-indigo-200 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-indigo-600" />
                                <p className="mb-2 text-sm text-gray-500">
                                  <span className="font-semibold">Click to upload</span>
                                </p>
                                <p className="text-xs text-gray-500">JPG, PNG, WebP (MAX. 5MB)</p>
                              </div>
                            </label>
                          )}
                          <input
                            id="photo-upload"
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files) {
                                onChange(e.target.files)
                                handlePhotoChange(e.target.files)
                              }
                            }}
                            {...rest}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
              </ProfileSection>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Profile...
                  </>
                ) : (
                  "Save Profile Information"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Reusable section component to reduce redundancy
function ProfileSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-indigo-600">{title}</h3>
      {children}
    </div>
  )
}

