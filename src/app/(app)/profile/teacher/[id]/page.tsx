// @ts-ignore - Bypass the type checking for this specific component

import { TeacherProfile } from "@/components/profile/TeacherProfile"
import { getProfileById } from "@/lib/data"

export default async function TeacherProfilePage({ params, }: {params: Promise<{ id: string }>}) {
  const { id } = await params
  const profileData = await getProfileById(id)

  return (
    <>
    <div className="container mx-auto py-10">
      {profileData && (
        <TeacherProfile data={profileData} />
      )}
    </div>
    </>
  )
}

