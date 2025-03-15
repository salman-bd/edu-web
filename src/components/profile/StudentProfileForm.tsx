"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2, Upload } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import { studentProfileSchema, type StudentProfileFormValues } from "@/schemas/studentProfileSchema"

interface StudentProfileFormProps {
  onSubmitSuccess: () => void
}

export default function StudentProfileForm({ onSubmitSuccess }: StudentProfileFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const isCscAffiliated = searchParams.get("isCscAffiliated") ? true : false

  const form = useForm<StudentProfileFormValues>({
    resolver: zodResolver(studentProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: undefined,
      institutionName: isCscAffiliated ? "Classic School And College" : "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      programLevel: undefined,
      programType: "",
      previousSchool: "",
      personalStatement: "",
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

  const totalSteps = 3

  const nextStep = () => {
    const fieldsToValidate =
      currentStep === 1
        ? ["firstName", "lastName", "email", "phone", "dateOfBirth", "gender", "photo"]
        : currentStep === 2
          ? ["institutionName", "address", "city", "state", "zipCode", "programLevel", "programType"]
          : []

    form.trigger(fieldsToValidate as Array<keyof StudentProfileFormValues>).then((isValid) => {
      if (isValid) setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    })
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: StudentProfileFormValues) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      console.log("Submitting profile data:", data)

      // Create FormData object to handle file upload
      const formData = new FormData()

      // Append all text fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "photo") {
          formData.append(key, value as string)
        }
      })

      // Append photo file
      if (data.photo instanceof FileList && data.photo[0]) {
        formData.append("photo", data.photo[0])
      }

      // Add affiliated status if present in URL
      if (isCscAffiliated) {
        formData.append("isCscAffiliated", "true")
      }

      const response = await fetch("/api/profile/student", {
        method: "POST",
        body: formData,
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to submit profile")
      }

      toast.success("Profile submitted successfully! Your information has been saved.", {
        duration: 4000,
      })
      onSubmitSuccess()

    } catch (error) {
      console.error("Error submitting profile:", error)
      let errorMessage = "There was a problem submitting your profile. Please try again."
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

  const programOptions = {
    elementary: [
      "(K-1)",
      "(K-2)",
      "(K-3)",
      "(K-4)",
      "(K-5)",
    ],
    middle: ["Program (6)", "Program (7)", "Program (8)"],
    high: [
      "Science Group",
      "Humanities Group",
      "Business Studies Group",
    ],
    college: ["Science Group", "Humanities Group", "Business Studies Group"],
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Toaster position="top-center" />
      <Card className="border-red-700 border-t-4 shadow-lg max-w-4xl mx-auto">
        <div className="bg-indigo-600 rounded-tl-lg rounded-tr-lg">
          <h1 className="text-3xl md:text-4xl text-center text-white font-semibold p-4">
            {isCscAffiliated ? "CSC Student Profile" : "Student Profile Form"}
          </h1>
        </div>
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-600">Student Profile Information</CardTitle>
          <CardDescription>Please complete all required fields to set up your student profile.</CardDescription>
          <div className="flex justify-between items-center mt-4">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep > index + 1
                    ? "bg-green-500 text-white"
                    : currentStep === index + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {currentStep > index + 1 ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {submitError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">{submitError}</div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-indigo-600">Personal Information</h3>

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
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-indigo-600">Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-indigo-200 focus:border-indigo-600">
                                <SelectValue placeholder="Select your gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-700" />
                        </FormItem>
                      )}
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-indigo-600">Institution & Program Selection</h3>
                  <FormField
                    control={form.control}
                    name="institutionName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-600">Institution Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your school or institution name"
                            {...field}
                            disabled={isCscAffiliated}
                            className={`border-indigo-200 focus:border-indigo-600 ${isCscAffiliated ? "bg-gray-100" : ""}`}
                          />
                        </FormControl>
                        {isCscAffiliated && (
                          <FormDescription>
                            Institution name is pre-filled as you are affiliated with Classic School And College.
                          </FormDescription>
                        )}
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-indigo-600">City</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your city"
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
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-indigo-600">State</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your state"
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
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-indigo-600">Zip Code</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your zip code"
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
                    name="programLevel"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-indigo-600">Program Level</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="elementary" />
                              </FormControl>
                              <FormLabel className="font-normal">Elementary School (K-5)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="middle" />
                              </FormControl>
                              <FormLabel className="font-normal">Middle School (6-8)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="high" />
                              </FormControl>
                              <FormLabel className="font-normal">High School (9-10)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="college" />
                              </FormControl>
                              <FormLabel className="font-normal">College (11-12)</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="programType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-600">Program</FormLabel>
                        <Select
                          disabled={!form.watch("programLevel")}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-indigo-200 focus:border-indigo-600">
                              <SelectValue placeholder="Select a program" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {form.watch("programLevel") &&
                              programOptions[form.watch("programLevel") as keyof typeof programOptions]?.map(
                                (program) => (
                                  <SelectItem key={program} value={program}>
                                    {program}
                                  </SelectItem>
                                ),
                              )}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-indigo-600">Educational Background & Statement</h3>
                  <FormField
                    control={form.control}
                    name="previousSchool"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-600">Previous School (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your previous school"
                            {...field}
                            className="border-indigo-200 focus:border-indigo-600"
                          />
                        </FormControl>
                        <FormDescription>
                          If you've transferred from another school, please provide its name.
                        </FormDescription>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="personalStatement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-600">Personal Statement (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your educational goals and interests"
                            className="min-h-[150px] border-indigo-200 focus:border-indigo-600"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Share your academic interests, goals, and any other information you'd like us to know.
                        </FormDescription>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              Previous
            </Button>
          )}
          {currentStep < totalSteps ? (
            <Button type="button" onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 ml-auto">
              Next
            </Button>
          ) : (
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white ml-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Profile"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

