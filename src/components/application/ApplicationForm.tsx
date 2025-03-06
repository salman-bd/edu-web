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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
  zipCode: z.string().min(5, { message: "Zip code must be at least 5 characters" }),
  programLevel: z.enum(["elementary", "middle", "high", "college"], {
    required_error: "Please select a program level",
  }),
  programType: z.string().min(1, { message: "Please select a program" }),
  previousSchool: z.string().min(2, { message: "Previous school must be at least 2 characters" }),
  personalStatement: z.string().min(50, { message: "Personal statement must be at least 50 characters" }),
})

type FormValues = z.infer<typeof formSchema>

interface ApplicationFormProps {
  onSubmitSuccess: () => void
}

export function ApplicationForm({ onSubmitSuccess }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
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

  const totalSteps = 3

  const nextStep = () => {
    const fieldsToValidate =
      currentStep === 1
        ? ["firstName", "lastName", "email", "phone", "dateOfBirth"]
        : currentStep === 2
          ? ["address", "city", "state", "zipCode", "programLevel", "programType"]
          : []

    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    })
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to submit application")
      }

      toast({
        title: "Application submitted successfully!",
        description: "We'll review your application and contact you soon.",
      })

      onSubmitSuccess()
    } catch (error) {
      toast({
        title: "Error submitting application",
        description: "Please try again later or contact our admissions office.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const programOptions = {
    elementary: ["Elementary Education (K-5)"],
    middle: ["Middle School Program (6-8)"],
    high: ["High School Program (9-12)", "College Preparation Program (11-12)"],
    college: ["Science Group", "Humanities Group", "Business Studies Group"],
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border-indigo-600 border-t-4 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-600">Application Form</CardTitle>
          <CardDescription>
            Please complete all required fields. Your application will be reviewed by our admissions team.
          </CardDescription>
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
                  <h3 className="text-lg font-semibold text-indigo-600">Address & Program Selection</h3>
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
                              <FormLabel className="font-normal">High School (9-12)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="college" />
                              </FormControl>
                              <FormLabel className="font-normal">College</FormLabel>
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
                        <FormLabel className="text-indigo-600">Previous School</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your previous school"
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
                    name="personalStatement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-600">Personal Statement</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us why you want to join our institution and what you hope to achieve"
                            className="min-h-[150px] border-indigo-200 focus:border-indigo-600"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Please write a brief statement about your educational goals and why you are interested in our
                          institution.
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
              className="bg-red-800 hover:bg-red-700 text-white ml-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

