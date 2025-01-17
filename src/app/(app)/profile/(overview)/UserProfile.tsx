'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ProfileAlertDialog } from '@/components/profile/ProfileAlertDialog'
import { InfoIcon, MailIcon, ContactIcon, SchoolIcon, VerifiedIcon, CircleAlert, GraduationCap, CalendarCheck, CalendarClock, Calendar, School2, Medal, Loader2, } from "lucide-react"
import TeacherProfileForm from './[type]/profile-completion/TeacherProfileForm'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { AvatarUpload } from '@/components/ui/Avatar-upload'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { teacherProfileSchema } from '@/schemas/teacherProfileSchema'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/date-picker'
import { AchievementInput } from '@/components/ui/achievement-input'
import StudentProfileForm from './[type]/profile-completion/StudentProfileForm'


export function UserProfile(profileData) {
  const router = useRouter();  
  const { query } = router;

  const success = query?.success;

  const [isProfileEditing, setIsProfileEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const data = profileData?.data;
  const profileType = data?.profileType;
  // console.log("Fetched profile data: ", profileData);


// console.log('Profile data int user profie page', profileData);


  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }


  // const detailsHandler = () => {
    
  // }

  const handleContinue = (preData: { type: string; isCSCAffiliated: string; }) => {
    // console.log('Profile data:', preData)
    setIsDialogOpen(false)
    if (preData.type === 'student' && preData.isCSCAffiliated === 'yes') {
      router.replace('profile/student')
    } else if (preData.type === 'teacher' && preData.isCSCAffiliated === 'yes') {
      router.replace('profile/teacher');
    } else if (preData.type === 'student'  && preData.isCSCAffiliated === 'no') {
      router.replace(`profile/student/profile-completion/`);
    } else {
      router.replace(`profile/teacher/profile-completion/`);
    }
  }

  const handleProfileComplete = () => {
    setIsDialogOpen(true);
  }
  const handleProfileEdit = () => {
    // if (profileType === 'teacher') {
    //   router.push('/profile/teacher/profile-completion')
    // }
    setIsProfileEditing(true);
  }
  const handleProfileDelete = () => {
    setIsDialogOpen(true);
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setdata(prevData => ({ ...prevData, [name]: value }))
  }

 
 

  /*
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated data to your backend
    console.log('Updated user data:', data)
    setIsEditing(false)
  } */




  return (
    <>
      <div className='flex flex-col items-center'>
          <ProfileAlertDialog 
          isOpen={isDialogOpen} 
          onClose={handleCloseDialog}
          onContinue={handleContinue}
        />
        
        { data && isProfileEditing && profileType === 'teacher' && (
          <TeacherProfileForm dbData = {data} />
        )}
        { data && isProfileEditing && profileType === 'student' && (
          <StudentProfileForm dbData = {data} />
        )}
      </div>

      <Card className="lg:w-1/2  mx-auto mt-4 flex flex-row justify-between p-4 ">
        


        {/* {isProfileEditing ? (
          <div className="flex justify-end space-x-2 w-full">
            <Button variant="outline" onClick={() => setIsProfileEditing(false)}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        ) : (
          <Button onClick={() => setIsProfileEditing(true)}>Edit Profile</Button>
        )} */}
  
        {data ? (
          <>
          {isProfileEditing ? (
            <Button variant="outline" onClick={() => setIsProfileEditing(false)}>Cancel</Button>
          ) : (
            <Button onClick={() => handleProfileEdit()}>Edit Profile</Button>
          )}
            <Button onClick={() => handleProfileDelete()}>Delete Profile</Button>
          </>
        ) : (
          <Button onClick={() => handleProfileComplete()}>Complete Profile</Button>
        )}
      </Card>

    </>
  )
}

