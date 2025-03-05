import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { mongoDbConnect } from './dbConnect';
import ProfileModel from '@/models/ProfileModel';

export interface ProfileInfoData {
  id: string;
  avatar: string;
  name: string;
  designation: string;
  isAffiliated: boolean;
  email: string;
  contactNo: string;
  birthDate: string;
  profileType: string;
  institutionName: string;
  gender: string;
  grade: string;
  school: string;
  sscPassingYear: string;
  college: string;
  hscPassingYear: string;
  university: string;
  graduationYear: string;
  career: string;
  achievements: string[];
}

async function getSession() {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    console.error("Error fetching session:", (error as Error).message);
    return null;
  }
}

export async function getProfileInfo(): Promise<ProfileInfoData | null> {  
  try {  
    const session = await getSession();  
    if (!session?.user?.email) return null;  

    const email = session.user.email;  
    await mongoDbConnect();  
    const profile = await ProfileModel.findOne({ email });  

    if (!profile) return null;  

    const profileInfo: ProfileInfoData = {  
      id: profile._id.toString(), // Now correctly inferred  
      avatar: profile.avatar,  
      name: profile.name,  
      designation: profile.designation,  
      isAffiliated: profile.isAffiliated,  
      email: profile.email,  
      contactNo: profile.contactNo,  
      birthDate: profile.birthDate.toISOString(),  
      gender: profile.gender,  
      profileType: profile.profileType,  
      institutionName: profile.institutionName,  
      grade: profile.grade || 'not added',  
      school: profile.school || 'not added',  
      sscPassingYear: profile.sscPassingYear || 'not added',  
      college: profile.college || 'not added',  
      hscPassingYear: profile.hscPassingYear || 'not added',  
      university: profile.university || 'not added',  
      graduationYear: profile.graduationYear || 'not added',  
      career: profile.career || '',  
      achievements: Array.isArray(profile.achievements) ? profile.achievements : [],  
    };  

    return profileInfo;  

  } catch (error) {  
    console.error("Error fetching personal info:", (error as Error).message);  
    return null;  
  }  
}