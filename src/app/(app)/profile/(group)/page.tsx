import ProfileDataFetch from "@/components/profile/ProfileDataFetch"
import PersonalInfoSkeleton from '@/components/profile/skeletons/personal-info-skeleton'
import { Suspense } from "react"

export default async function ProfilePage() {
  
  
  return (
    <div className="">
      <Suspense fallback={<PersonalInfoSkeleton />}> 
        <ProfileDataFetch />
      </Suspense>

    </div>
  )
}


