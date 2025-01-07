import { Metadata } from 'next'

import { Suspense, lazy } from 'react'
import ProfileSkeleton from '@/components/ui/profile-skeleton'

const LazyComponent = lazy(() => import('./Profile'));  

export const metadata: Metadata = {
  title: 'User Profile',
  description: 'View your educational profile',
}

export default function ProfilePage() {
  
  return (
    <Suspense fallback={<ProfileSkeleton />}>  
    <LazyComponent />  
    </Suspense>
  )
}

