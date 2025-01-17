'use client'

import { usePathname } from "next/navigation";
import  TeacherProfileForm  from "./TeacherProfileForm"
import  StudentProfileForm  from "./StudentProfileForm"


export default function ProfileCompletionPage() {
  const pathName = usePathname();
  const pathParts = pathName.split('/').filter((part) => part);
  const profileType = pathParts[1];

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      { profileType === 'teacher'&& (
        <>
        <TeacherProfileForm />
        </>
      )}
      { profileType === 'student' && (
         <>
         <StudentProfileForm />
         </>
      )}
    </div>
  )
}

