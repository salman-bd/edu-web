'use client'

import { usePathname } from "next/navigation"
import StudentProfileSkeleton from "@/components/profile/skeletons/studentProfileForm";
import TeacherProfileSkeleton from "@/components/profile/skeletons/teacherProfileForm";
 
export default function Loading() {
  const pathName = usePathname();
  const pathParts = pathName.split('/').filter((pathPart) => pathPart);
  const type = pathParts[1];

   return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">

      {type === 'student' && (
        <>
          <StudentProfileSkeleton />
        </>
      )}
      {type === 'teacher' && (
        <>
          <TeacherProfileSkeleton />
        </>
      )}

    </div>
   )
}