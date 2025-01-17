

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Calendar, User, Briefcase, ChevronDown, ChevronUp, Verified } from 'lucide-react'
import { getProfileInfo } from '@/lib/data'

import { InfoIcon, BadgeInfoIcon, MailIcon } from "lucide-react"
import { UserProfile } from "@/app/(app)/profile/(overview)/UserProfile"
import { ProfileAlertDialog } from "./ProfileAlertDialog"


export default async function ProfileInfo() {
  

  const data = await getProfileInfo();
  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const toggleShowDetalis = () => {
    setShowDetails(!showDetails);
  }
 
  const handleProfileCompletion = () => {
        setIsDialogOpen(true);
  }

  if (!data) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-1">No personal information available</CardTitle>
          <div className="text-left mt-8">
          <h2>Probably you didn't complete profile or signed in with different email. </h2>
          <p>If you are a student of CSC put the student identification number to go your profile</p>
          </div>

        </CardHeader>
        <Button onClick={() => handleProfileCompletion()}>Complete Profile</Button>
        
      </Card>
    )
  }


  return (
    <>
          {/* <CardHeader className="text-center">
        <h2>Verififed: {Verified}</h2>
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src={data.avatar} alt={data.name} />
          <AvatarFallback>{data.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>

        <CardTitle className="text-2xl mb-1">{data.name}</CardTitle>
        <p className="text-gray-500 mb-4">{data.designation}</p>
      </CardHeader>

      <p className="text-gray-500">{data.email}</p>
        <p className="text-gray-500 mb-4">{data.contactNo}</p>
        <p className="text-gray-500 mb-4">{data.birthDate}</p>
      <CardContent className="grid gap-2">
          
      </CardContent> */}
      <UserProfile data = {data}/>
      {/* {showDetails && (
        <CardContent className="grid gap-2">
          <InfoItem icon={<Mail className="text-blue-500" />} label="Email" value={data.email} />
          <InfoItem icon={<Phone className="text-green-500" />} label="Contact" value={data.contactNo} />
          <InfoItem icon={<Calendar className="text-red-500" />} label="Date of Birth" value={data.birthDate} />
          <InfoItem icon={<User className="text-purple-500" />} label="Gender" value={data.gender} />
          <InfoItem icon={<Briefcase className="text-yellow-500" />} label="Designation" value={data.designation} />
        </CardContent>
      )} */}
    </>

  )
}

// function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
//   return (
//     <div className="flex items-center space-x-2">
//       {icon}
//       <span className="text-gray-500">{label}:</span>
//       <span className="font-medium">{value}</span>
//     </div>
//   )
// }



