import ProfileDataFetch from "@/components/profile/ProfileDataFetch"
import SearchProfile from "@/components/profile/SearchProfile"
import PersonalInfoSkeleton from '@/components/profile/skeletons/personal-info-skeleton'

import { Suspense } from "react"

export const dynamic = "force-dynamic"

export default async function ProfilePage() {

  

  return (
    <div className="">
      <Suspense fallback={<PersonalInfoSkeleton />}> 
       
        <SearchProfile />
        <ProfileDataFetch />
      </Suspense>

    </div>
  )
}


