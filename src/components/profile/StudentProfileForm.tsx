'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { studentProfileSchema } from '@/schemas/studentProfileSchema'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AvatarUpload } from '@/components/ui/Avatar-upload'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Loader2 } from 'lucide-react'
import DatePicker from 'react-datepicker';  
import 'react-datepicker/dist/react-datepicker.css';

interface StudentProfileFormProps {  
  data: {
    profileType: string;
    avatar: string;
    name: string;
    institutionName: string;
    grade: string;
    email: string;
    contactNo: string;
    birthDate: string;
    gender: string;
    isAffiliated: boolean;  
  };  
}  


function StudentProfileForm({ data }: StudentProfileFormProps) {
  const router = useRouter();  
  const { toast } = useToast();  
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const { searchParams } = new URL(window.location.href);  
  const csc = searchParams.get('affiliated');  
  const profileType = 'student';  
  const isAffiliated = csc? true : data?.isAffiliated || false;  

  // console.log("CSC, data.isAffiliated, isAffiliated: ", csc, data?.isAffiliated, isAffiliated);
  
  const form = useForm<z.infer<typeof studentProfileSchema>>({  
    resolver: zodResolver(studentProfileSchema),  
    defaultValues: {  
      avatar: data?.avatar || undefined,  
      name: data?.name || '',  
      institutionName: data?.institutionName || csc || '',  
      grade: data?.grade || '',  
      email: data?.email || '',  
      contactNo: data?.contactNo || '',  
      gender: data?.gender || '',  
      birthDate: data?.birthDate ? new Date(data.birthDate) : null,  
      isAffiliated: isAffiliated,  
      profileType: data?.profileType || profileType,  
      // achievements: data?.achievements || []  
    },  
  })
  
  async function onSubmit(data: z.infer<typeof studentProfileSchema>) {  
    setIsSubmitting(true);  
    try {  
      const formData = new FormData();  
      for (const [key, value] of Object.entries(data)) {  
        if (key === 'birthDate' && value instanceof Date) {  
          formData.append(key, value.toISOString());  
        } else if (value !== null && value !== undefined) {  
          formData.append(key, value as string | Blob);  
        }  
      }  

      const response = await axios.post<ApiResponse>('/api/profile', formData);
      toast({  
        title: 'Success',  
        description: response.data.message,  
      });  
      router.replace('/profile');
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
  }  

  const { errors } = form.formState;  
  if (Object.keys(errors).length > 0) {  
      console.log("Validation errors:", errors);  
  }
    
  // console.log("Profile input form rendered");

  return (
    <div className='flex justify-center items-center bg-gray-100 lg:w-1/2 py-8 max-w-7xl mx-auto '>
      <div className='w-full p-6 space-y-8 bg-white rounded-lg shadow-md '>

        <div className='flex flex-col items-center gap-2'>
          <h1 className='font-bold text-3xl'>Create Your Profile</h1>
          <p>Enter your necessary information to set up your profile.</p>
        </div>
        <hr />
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
                        value={field.value instanceof File ? field.value : null}
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
                      <Input placeholder='' {...field} value={String(field.value)} />
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
                          <SelectItem key={i + 1} value={`${i + 1}`}>
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
                      <Input type="email" placeholder="user@email.com" {...field} />
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
                      <div style={{ position: 'relative' }}>  
                        <DatePicker  
                          selected={field.value} // Controlled component  
                          onChange={(date: Date | null) => {  
                            field.onChange(date);  // Update the field value  
                          }}  
                          // Set the min date to today to prevent future selection  
                          maxDate={new Date()}  
                          placeholderText="      Select your date of birth " // Placeholder text  
                          showYearDropdown // Show the dropdown for selecting the year  
                          yearDropdownItemNumber={100} // Number of years to show in dropdown  
                          scrollableYearDropdown // Allows scrolling through the years  
                          customInput={  
                            <input  
                            style={{  
                              paddingLeft: '5px', 
                              padding: '10px',  
                              borderRadius: '4px',  
                              border: '1px solid #ccc',  
                              width: '250px',  
                            }}
                              readOnly // Preventing manual input (optional)  
                            />  
                          }  
                          dateFormat="yyyy/MM/dd" // Change format if needed  
                        />  
                        {/* <span  
                          style={{  
                            position: 'absolute',  
                            left: '10px',  
                            top: '10px',  
                            pointerEvents: 'none',  
                            color: '#999',  
                          }}>  
                          <Calendar />  
                        </span>   */}
                      </div>  
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
              {/* <FormField
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
              />     */}
              <FormField
                control={form.control}
                name="isAffiliated"
                render={({ field }) => (
                  <FormItem className='hidden'>
                    <FormLabel>profileType</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} value={String(field.value)} />
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

              {data ? (
                <Button type="submit" className='bg-indigo-700 hover:bg-indigo-600'> 
                {
                isSubmitting? (
                  <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                  </>
                ) : ('Save Changes')
                }
                </Button>
 
                ) : (
                  <Button type="submit" className='bg-indigo-700 hover:bg-indigo-600'> 
                  {
                  isSubmitting? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin "/> Please wait
                    </>
                  ) : ('Create Profile')
                  }
                  </Button>
              )}

            </form>
          </Form>
      </div>
    </div>
  )
}

export default StudentProfileForm;