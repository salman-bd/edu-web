'use client';  

import { useState } from 'react';  
import { useRouter } from 'next/navigation';  
import { useToast } from '@/components/ui/use-toast';  
import * as z from "zod";  
import { zodResolver } from "@hookform/resolvers/zod";  
import { useForm } from "react-hook-form";  
import { ApiResponse } from '@/types/ApiResponse';  
import { teacherProfileSchema } from '@/schemas/teacherProfileSchema';  
import { Button } from "@/components/ui/button";  
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";  
import { AvatarUpload } from '@/components/ui/Avatar-upload';  
// import { AchievementInput } from '@/components/ui/achievement-input';  
import axios, { AxiosError } from 'axios';  
import {Loader2 } from 'lucide-react';  
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DatePicker from 'react-datepicker';  
import 'react-datepicker/dist/react-datepicker.css';
import { Textarea } from '../ui/textarea';


interface TeacherProfileFormProps {  
  data: {
    profileType: string;
    birthDate: string;
    gender: string;
    graduationYear: string;
    university: string;
    hscPassingYear: string;
    college: string;
    sscPassingYear: string;
    school: string;
    contactNo: string;
    email: string;
    designation: string;
    institutionName: string;
    name: string;
    avatar: string;
    isAffiliated: boolean;  
    career:string;
  };  
}  

export default function TeacherProfileForm({ data }: TeacherProfileFormProps) {  
  const router = useRouter();  
  const { toast } = useToast();  
  const [isSubmitting, setIsSubmitting] = useState(false);  

  const { searchParams } = new URL(window.location.href);  
  const csc = searchParams.get('affiliated');  
  const profileType = 'teacher';  
  const isAffiliated = csc? true : data?.isAffiliated || false;  

  // console.log("CSC, data.isAffiliated, isAffiliated: ", csc, data?.isAffiliated, isAffiliated);
  
  const form = useForm<z.infer<typeof teacherProfileSchema>>({  
    resolver: zodResolver(teacherProfileSchema),  
    defaultValues: {  
      avatar: data?.avatar || undefined,  
      name: data?.name || '',  
      institutionName: data?.institutionName || csc || '',  
      designation: data?.designation || '',  
      email: data?.email || '',  
      contactNo: data?.contactNo || '',  
      school: data?.school || '',  
      sscPassingYear: data?.sscPassingYear || '',  
      college: data?.college || '',  
      hscPassingYear: data?.hscPassingYear || '',  
      university: data?.university || '',  
      graduationYear: data?.graduationYear || '',  
      gender: data?.gender || '',  
      birthDate: data?.birthDate ? new Date(data.birthDate) : null,  
      isAffiliated: isAffiliated,  
      profileType: data?.profileType || profileType,  
      career: data?.career || ''
      // achievements: data?.achievements || []  
    },  
  });  

  async function onSubmit(data: z.infer<typeof teacherProfileSchema>) {  
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

      const response = await axios.post<ApiResponse>(`/api/profile`, formData);  
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
                        value={field.value as File | null}
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
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your designation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Professor">Professor</SelectItem>
                        <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                        <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                        <SelectItem value="Lecturer">Lecturer</SelectItem>
                        <SelectItem value="Assistant Teacher">Assistant Teacher</SelectItem>
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
                name="school"  
                render={({ field }) => (  
                  <FormItem>  
                    <FormLabel>High School</FormLabel>  
                    <FormControl>  
                      <Input placeholder="Enter the name of your high school" {...field} />  
                    </FormControl>  
                    <FormDescription></FormDescription>  
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
                        {[...Array(30)].map((_, i) => {  
                          const year = 2024 - i;  
                          return (  
                            <SelectItem key={year} value={year.toString()}>  
                              {year}  
                            </SelectItem>  
                          );  
                        })}  
                      </SelectContent>  
                    </Select>  
                    <FormDescription></FormDescription>  
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
                    <FormDescription></FormDescription>  
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
                        {[...Array(30)].map((_, i) => {  
                          const year = new Date().getFullYear() - i;  
                          return (  
                            <SelectItem key={year} value={year.toString()}>  
                              {year}  
                            </SelectItem>  
                          );  
                        })}  
                      </SelectContent>  
                    </Select>  
                    <FormDescription></FormDescription>  
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
                    <FormDescription></FormDescription>  
                    <FormMessage />  
                  </FormItem>  
                )}  
              />  
              <FormField  
                control={form.control}  
                name="graduationYear"  
                render={({ field }) => (  
                  <FormItem>  
                    <FormLabel>Graduation Year</FormLabel>  
                    <Select onValueChange={field.onChange} defaultValue={field.value}>  
                      <FormControl>  
                        <SelectTrigger>  
                          <SelectValue placeholder="Select your graduation year" />  
                        </SelectTrigger>  
                      </FormControl>  
                      <SelectContent>  
                        {[...Array(25)].map((_, i) => {  
                          const year = new Date().getFullYear() - i;  
                          return (  
                            <SelectItem key={year} value={year.toString()}>  
                              {year}  
                            </SelectItem>  
                          );  
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
              
              {/* <FormField  
                control={form.control}  
                name="achievements"  
                render={({ field }) => (  
                    <FormItem>  
                        <FormLabel>Achievements / Certifications (Optional)</FormLabel>  
                        <FormControl>  
                          <AchievementInput  
                            achievements={Array.isArray(field.value) ? field.value : []} // Ensure achievements is an array  
                            setAchievements={(newAchievements) => {  
                              // Process achievements: if newAchievements is a string, split it, else use it directly.  
                              const processedAchievements = typeof newAchievements === 'string'  
                                ? newAchievements.split(',').map(item => item.trim()) // Convert string to array  
                                : Array.isArray(newAchievements) // If already an array, use it as is.  
                                ? newAchievements  
                                : [];  
                              
                              field.onChange(processedAchievements); // Set processed array of achievements  
                            }}  
                          />  
                        </FormControl>  
                        <FormDescription>  
                            Add your notable academic accomplishments, awards, or any significant educational milestones.  
                        </FormDescription>  
                        <FormMessage />  
                    </FormItem>  
                )}  
              /> */}

              <FormField  
                control={form.control}  
                name="career"  
                render={({ field }) => (  
                  <FormItem>  
                    <FormLabel>Describe Your Career</FormLabel>  
                    <FormControl>  
                      <Textarea placeholder="" {...field} />  
                    </FormControl>  
                    <FormDescription>
                    You should start like <br /> <b>&quot;For 5 years I am in Elementary Education .... / I am in the teaching profession for 5 years expertise in .....&quot;</b> <br /> Don&apos;t need to mention your name.
                    </FormDescription>  
                    <FormMessage />  
                  </FormItem>  
                )}  
              /> 

              <FormField
                control={form.control}
                name="isAffiliated"
                render={({ field }) => (
                  <FormItem className='hidden'>
                    <FormLabel> Affiliated </FormLabel>
                    <FormControl>
                    <Input placeholder="" {...field} value={field.value.toString()}/>
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profileType"
                render={({ field }) => (
                  <FormItem className='hidden'>
                    <FormLabel> profileType </FormLabel>
                    <FormControl>
                    <Input placeholder="" {...field}/>
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
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

{/* <FormField
  name="date"
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>Date</FormLabel>
      <Popover>
        <PopoverTriggerr asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-[240px] pl-3 text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTriggerr>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate)
              field.onChange(newDate?.toISOString())
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormDescription>
        Select a date for your event or appointment.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/> */}