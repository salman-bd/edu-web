import { cache } from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { mongoDbConnect } from './dbConnect'
import ProfileModel from '@/model/ProfileModel'

export interface ProfilelInfoData {
  avatar: string
  name: string
  designation: string
  isAffiliated: boolean
  email: string
  contactNo: string
  birthDate: string
  profileType: string
  institutionName: string
  
  gender: string
  grade: string
  school: string
  sscPassingYear: string
  college: string
  hscPassingYear: string
  university: string
  graduationYear: string
  achievements: [string]
}



async function getSession() {
  return await getServerSession(authOptions)
}

export const getProfileInfo = cache(async (): Promise<ProfilelInfoData | null> => {  
  try {  
    const session = await getSession();  
    if (!session?.user?.email) return null;  

    const email = session.user.email;  
    console.log("\nSession email: ", email);  
  
    await mongoDbConnect(); 
    const profile = await ProfileModel.findOne({ email });
    

    if (!profile) return null; 
    

    const ProfileInfo = {  
      avatar: profile.avatar,  
      name: profile.name,  
      designation: profile.designation,  
      isAffiliated: profile.isAffiliated,  
      email: profile.email,  
      contactNo: profile.contactNo,  
      birthDate: profile.birthDate,  
      gender: profile.gender,  
      profileType: profile.profileType,  
      institutionName: profile.institutionName,  
      grade: profile.grade || '',  
      school: profile.school || 'Not Provided',  
      sscPassingYear: profile.sscPassingYear || 'Not Provided',  
      college: profile.college || 'Not Provided',  
      hscPassingYear: profile.hscPassingYear || 'Not Provided',  
      university: profile.university || 'Not Provided',  
      graduationYear: profile.graduationYear || 'Not Provided',  
      achievements: Array.isArray(profile.achievements) ? profile.achievements.map((achievement) => achievement) : []  
  };
    console.log("Personal info after fetching: ", ProfileInfo );  
    return ProfileInfo;  
  
  } catch (error) {  
      console.error("Error fetching personal info:", error);  
      return null; // Or handle the error according to your app's logic  
  }  
});



