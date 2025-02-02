'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { MailIcon, ContactIcon, SchoolIcon, VerifiedIcon, CircleAlert, GraduationCap, CalendarClock, Calendar, School2 } from "lucide-react"


interface ProfileData {
  isAffiliated: boolean;
  birthDate: string | number | Date;
  avatar: string;
  name: string;
  designation: string;
  institutionName: string;
  email: string;
  contactNo: string;
  university: string;
  graduationYear: string;
  college: string;
  hscPassingYear: string;
  school: string;
  sscPassingYear: string;
}

export function TeacherProfile(profileData: { data: ProfileData }) {
  const [showDetails, setShowDetails] = useState(false);

  const data = profileData.data;
  const Verified = data.isAffiliated;

  function calculateAge(birthDateString: string | number | Date) {  
    const birthDate = new Date(birthDateString);  
    const today = new Date();  
    
    let years = today.getFullYear() - birthDate.getFullYear();  
    let months = today.getMonth() - birthDate.getMonth();  
    let days = today.getDate() - birthDate.getDate();  

    // Adjust for negative days  
    if (days < 0) {  
        months--;  
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // Last day of previous month  
    }  
    // Adjust for negative months  
    if (months < 0) {  
        years--;  
        months += 12;  
    }  
    return `${years} Years ${months} Months ${days} Days`;  
  }  
  const birthDate = data.birthDate; 
  const age = calculateAge(birthDate);

  const toggleShowDetalis = () => {
    setShowDetails(!showDetails);
  }


  return (
    <Card className="lg:w-1/2  mx-auto">
      <CardHeader className='flex flex-col justify-center items-center'>
        
        { Verified ? (  
          <div className='flex flex-row gap-2 items-center text-center lg:text-2xl'>  
            <h2>Verified</h2>   
            <VerifiedIcon className='text-indigo-600' />  
          </div>  
        ) : (  
          <div className='flex flex-row gap-2 items-center text-center lg:text-2xl'>  
            <h2>Not Verified</h2>   
            <CircleAlert className='text-red-600' />  
          </div>  
        )}

        <Avatar className="w-32 h-32 mx-auto mb-4">
          <AvatarImage src={data.avatar} alt={data.name} />
          <AvatarFallback className="bg-violet-600 text-white text-4xl">{data?.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <h4 className='text-white p-4 py-2 bg-indigo-600 rounded-full'>{data.designation} </h4>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col">
          <div className='text-gray-800'>
            <div className='flex flex-row gap-2'>
              <SchoolIcon className='w-5 h-5'/><p className="0 mb-4">{data.institutionName}</p>
            </div>
            <div className='flex flex-row gap-2'>
              <MailIcon className='w-5 h-5'/> <p className="mb-4">{data.email}</p>
            </div>
            <div className='flex flex-row gap-2'>
              <ContactIcon className='w-5 h-5'/> <p className=" mb-4">{data.contactNo}</p>
            </div>
            <div className='flex flex-row gap-2'>
            <CalendarClock className='w-5 h-5'/>
              <p className=" mb-4"><strong className='text-gray-950'>Age: </strong>{age}</p>
            </div>
            <hr />
            <br />
          </div>
          
          {showDetails && (
            <div className=' flex flex-col'>
              <div className='flex flex-row justify-start gap-2'>
              <GraduationCap className='min-w-5 min-h-5'/>
                <p className="0 mb-4"><strong className='text-gray-950'>Graduated From: </strong>{data.university}</p>
              </div>
              <div className='flex flex-row gap-2'>
                <Calendar className='w-5 h-5'/> <p className="mb-4"> <strong className='text-gray-950'>Graduation Year: </strong>{data.graduationYear}</p>
              </div>
              <div className='flex flex-row gap-2'>
                <School2 className='w-5 h-5'/> <p className="mb-4"> <strong className='text-gray-950'>College: </strong>{data.college}</p>
              </div>
              <div className='flex flex-row gap-2'>
                <Calendar className='w-5 h-5'/> <p className="mb-4"><strong className='text-gray-950'>Passing Year: </strong>{data.hscPassingYear}</p>
              </div>
              <div className='flex flex-row gap-2'>
                <School2 className='w-5 h-5'/> <p className="mb-4"><strong className='text-gray-950'>High School: </strong>{data.school}</p>
              </div>
              <div className='flex flex-row gap-2'>
                <Calendar className='w-5 h-5'/> <p className="mb-4"><strong className='text-gray-950'>Graduation Year: </strong>{data.sscPassingYear}</p>
              </div>
              {/* <div className='flex flex-row gap-2'>
                <Medal className='w-5 h-5'/> <p className="mb-4"><strong className='text-gray-950'>Achievements: </strong>{data.achievements.map((achivement, index) => achivement) || ['Not included']}</p>
              </div> */}
            </div>

          )}
          {showDetails ? (
            <Button onClick={toggleShowDetalis} className='bg-indigo-600 hover:bg-indigo-700'>View Short</Button>
          ) : (
            <Button onClick={toggleShowDetalis} className='bg-indigo-600 hover:bg-indigo-700'>See Details</Button>
          )}
        
        </div>
      </CardContent> 
    </Card>
  )
}

