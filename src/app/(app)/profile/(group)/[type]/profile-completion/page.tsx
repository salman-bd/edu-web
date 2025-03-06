'use client'

import { usePathname } from "next/navigation";
import  TeacherProfileForm  from "@/components/profile/TeacherProfileForm"
import  StudentProfileForm  from "@/components/profile/StudentProfileForm"



export default function ProfileCompletionPage() {
  const pathName = usePathname();
  const pathParts = pathName.split('/').filter((part) => part);
  const profileType = pathParts[1];

  const teacherProfileData = {
    profileType: '',
    birthDate: '',
    gender: '',
    graduationYear: '',
    university: '',
    hscPassingYear: '',
    college: '',
    sscPassingYear: '',
    school: '',
    contactNo: '',
    email: '',
    name: '',
    avatar: '',
    isAffiliated: false,
    designation: '',
    institutionName: '',
    career: '',
  };

  const studentProfileData = {
    profileType: '',
    avatar: '',
    name: '',
    institutionName: '',
    grade: '',
    email: '',
    contactNo: '',
    birthDate: '',
    gender: '',
    isAffiliated: false
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      { profileType === 'teacher'&& (
        <>
        <TeacherProfileForm data={teacherProfileData} />
        </>
      )}
      { profileType === 'student' && (
         <>
         <StudentProfileForm data={studentProfileData}/>
         </>
      )}
    </div>
  )
}

