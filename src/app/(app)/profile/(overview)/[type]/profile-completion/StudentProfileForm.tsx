'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { studentProfileSchema } from '@/schemas/studentProfileSchema'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AvatarUpload } from '@/components/ui/Avatar-upload'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Loader2 } from 'lucide-react'
import { AchievementInput } from '@/components/ui/achievement-input'
import { DatePicker } from '@/components/ui/date-picker'



function StudentProfileForm() {

  const router = useRouter();
  const { searchParams } = new URL(window.location.href);
  const csc = searchParams.get('affiliated'); 
  const profileType = 'student';
  let affiliated;
  if (csc) {
    affiliated = true;
  } else {
    affiliated = false;
  }
  
  // console.log("Path parts: ", pathParts);
  // console.log("Affiliated data from query", affiliated);  


  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const form = useForm<z.infer<typeof studentProfileSchema>>({
    resolver: zodResolver(studentProfileSchema),
    defaultValues: {
      avatar: undefined,
      institutionName: csc || '',
      grade: '',
      name:  '',
      email: '',
      contactNo: '', 
      gender: '', 
      birthDate: null,
      profileType: profileType, 
      affiliated: affiliated,
    },
  })
  
  async function onSubmit(data: z.infer<typeof studentProfileSchema>) {
    setIsSubmitting(true);
    try {  
      const formData = new FormData();  
      for (const key in data) {  
          formData.append(key, data[key]);  
      }  
      // console.log("Submitting form with data:", formData);

      const response = await axios.post<ApiResponse>(`/api/profile`, formData, {  
        headers: { 'Content-Type': 'multipart/form-data' } 
      }); 
      toast({  
          title: 'Success',  
          description: response.data.message,  
      });  
      console.log("Profile completion response :", response);
      
      router.replace(`/profile`); 

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
    
  // console.log("Profile input form rendered");

  return (
    <div className='flex justify-center items-center bg-gray-100'>
      <div className='w-full p-8 space-y-8 bg-white rounded-lg shadow-md'>
      <Card className="w-full">
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
                      <Input placeholder="" {...field} />
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
                name="institutionName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inatitution Name</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your institution name as it appears on official documents.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Class</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose one option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={`Grade ${i + 1}`}>
                            Grade {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
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
                      <Input type="email" placeholder="email@example.com" {...field} />
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
                    <FormLabel>Achievements(Optional)</FormLabel>
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
              <FormField
                control={form.control}
                name="affiliated"
                render={({ field }) => (
                  <FormItem className='hidden'>
                    <FormLabel>profileType</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profileType"
                render={({ field }) => (
                  <FormItem className='hidden'>
                    <FormLabel>profileType</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
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
      </div>
    </div>


  )
}

export default StudentProfileForm;