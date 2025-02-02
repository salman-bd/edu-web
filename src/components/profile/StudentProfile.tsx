'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { MailIcon, ContactIcon, SchoolIcon, VerifiedIcon, CircleAlert, CalendarClock, User } from "lucide-react"


interface ProfileData {
  data: {
    isAffiliated: boolean;
    birthDate: string | number | Date;
    avatar: string;
    name: string;
    profileType: string;
    institutionName: string;
    grade: string;
    email: string;
    contactNo: string;
    // Add other fields as necessary
  };
}

export function StudentProfile(profileData: ProfileData) {
  // const [showDetails, setShowDetails] = useState(false);

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

  // const toggleShowDetalis = () => {
  //   setShowDetails(!showDetails);
  // }


  return (
    <Card className="md:w-1/2  mx-auto">
      <CardHeader className='flex flex-col justify-center items-center'>
        
        { Verified ? (  
          <div className='flex flex-row gap-2 items-center text-center lg:text-2xl'>  
            <h2>Verified</h2>   
            <VerifiedIcon className='text-blue-600' />  
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
        <h4 className='text-white p-4 py-2 bg-blue-700 rounded-full'>{data.profileType} </h4>
        

      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className='text-gray-800'>
            <div className='flex flex-row gap-2'>
              <SchoolIcon /><p className="0 mb-4">{data.institutionName}</p>
            </div>
            <div className='flex flex-row gap-2'>
              <User /><p className="0 mb-4"> <strong>Class: </strong>{data.grade}</p>
            </div>
            <div className='flex flex-row gap-2'>
              <MailIcon /> <p className="mb-4">{data.email}</p>
            </div>
            <div className='flex flex-row gap-2'>
              <ContactIcon /> <p className=" mb-4">{data.contactNo}</p>
            </div>
            <div className='flex flex-row gap-2'>
              <CalendarClock />
              <p className=" mb-4"><strong className='text-gray-950'>Age: </strong>{age}</p>
            </div>
            <hr />
            <br />
          </div>
          
          {/* {showDetails && (
            <div className=' flex flex-col'>
              <div className='flex flex-row gap-2'>
              <GraduationCap />
                <p className="0 mb-4"><strong className='text-gray-950'>Graduated From: </strong>{data.university}</p>
              </div>
              <div className='flex flex-row gap-2'>
                <Calendar /> <p className="mb-4"> <strong className='text-gray-950'>Graduation Year: </strong>{data.graduationYear}</p>
              </div>
              <div className='flex flex-row gap-2'>
                <School2 /> <p className="mb-4"> <strong className='text-gray-950'>College: </strong>{data.college}</p>
              </div>
              <div className='flex flex-row gap-2'>
                <Calendar /> <p className="mb-4"><strong className='text-gray-950'>Passing Year: </strong>{data.hscPassingYear}</p>
              </div>
              <div className='flex flex-row gap-2'>
                <School2 /> <p className="mb-4"><strong className='text-gray-950'>High School: </strong>{data.school}</p>
              </div>
              <div className='flex flex-row gap-2'>
                <Calendar /> <p className="mb-4"><strong className='text-gray-950'>Graduation Year: </strong>{data.sscPassingYear}</p>
              </div>
              <div className='flex flex-row gap-2'>
                <Medal /> <p className="mb-4"><strong className='text-gray-950'>Achievements: </strong>{data.achievements || ['Not included']}</p>
              </div>
            </div>

          )}
          {showDetails ? (
            <Button onClick={toggleShowDetalis} className='bg-blue-700'>View Short</Button>
          ) : (
            <Button onClick={toggleShowDetalis} className='bg-blue-700'>View Full</Button>
          )}
         */}
        </div>
      </CardContent> 
    </Card>
  )
}

