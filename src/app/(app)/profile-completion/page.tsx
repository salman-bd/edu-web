'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { profileSchema } from '@/schemas/profileSchema'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AvatarUpload } from '@/components/Avatar-upload'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import { AchievementInput } from '@/components/ui/achievement-input'

import { DatePicker } from '@/components/ui/date-picker'


function ProfileInputForm() {
  const router = useRouter()
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {data: session} = useSession()
  const userEmail = session?.user.email
  // console.log("User email: ", userEmail);
  

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      avatar: null,
      name: '',
      email: '',
      contactNo: '', 
      school: '', 
      sscPassingYear: '', 
      college: '', 
      hscPassingYear: '', 
      university: '', 
      graduationYear: '', 
      gender: '', 
      birthDate: null, 
      achievements: []
    },
  })
  
  async function onSubmit(data: z.infer<typeof profileSchema>) {
    setIsSubmitting(true);

    console.log("Submitting form with data:", data);

    try {  
      const formData = new FormData();  
         
      for (const key in data) {  
          formData.append(key, data[key]);  
      }  

      const response = await fetch('/api/profile-completion', {
        method: 'POST',
        body: formData,
      })

      toast({  
          title: 'Success',  
          description: response.data.message,  
      });  
      router.replace(`/profile`); // Moved here to ensure it happens after toast  
    } catch (error) {  
      const axiosError = error as AxiosError<ApiResponse>;  
      const errorMessage = axiosError.response?.data.message || "An unexpected error occurred. Please try again.";  
    
      toast({  
          title: "Profile completion failed",  
          description: errorMessage,  
          variant: "destructive",  
      });  
    } finally {  
        setIsSubmitting(false);  
    }
  };

  const { errors } = form.formState;  
  if (Object.keys(errors).length > 0) {  
      console.log("Validation errors:", errors);  
  }
    
  console.log("Profile input form rendered");

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Profile</CardTitle>
        <CardDescription>Enter your educational information to set up your profile.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <AvatarUpload
                      onChange={(file) => field.onChange(file)}
                      value={field.value}
                    />
                  </FormControl>
                  <FormDescription>
                    Choose a profile picture. Max size: 5MB. Supported formats: JPG, PNG, WebP.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your full name as it appears on official documents.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your contact number." {...field} />
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>High School</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the name of your high school" {...field} />
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sscPassingYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SSC Passing Year</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Your SSC Passing Year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[...Array(10)].map((_, i) => {
                        const year = new Date().getFullYear() + i
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                   
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="college"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the name of your college" {...field} />
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hscPassingYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HSC Passing Year</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Your HSC Passing Year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[...Array(10)].map((_, i) => {
                        const year = new Date().getFullYear() + i
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                   
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the name of your university" {...field} />
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="graduationYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Graduation Year</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your graduation year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[...Array(10)].map((_, i) => {
                        const year = new Date().getFullYear() + i
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select your expected year of graduation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <DatePicker
                      date={field.value}
                      setDate={(date) => field.onChange(date)}
                    />
                  </FormControl>
                  <FormDescription>
                    Your date of birth is used to calculate your age and provide age-appropriate content.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the gender you identify with. This information helps us provide relevant educational resources.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="achievements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Achievements</FormLabel>
                  <FormControl>
                    <AchievementInput
                      achievements={field.value || []}
                      setAchievements={(newAchievements) => field.onChange(newAchievements)}
                    />
                  </FormControl>
                  <FormDescription>
                    Add your notable academic accomplishments, awards, or any significant educational milestones.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" > 
              {
              isSubmitting? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                </>
              ) : ('Create Profile')
              }
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ProfileInputForm