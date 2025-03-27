import { StudentProfile } from "@/components/profile/StudentProfile"
import { getProfileById } from "@/lib/data"

// @ts-ignore - Bypass the type checking for this specific component
export default async function StudentProfilePage({ params, }: {params: Promise<{ id: string }>}) {
  const { id } = await params
  const profileData = await getProfileById(id)

  return (
    <div className="container mx-auto py-10">
      {profileData && (
        <StudentProfile data={profileData} />
      )}
    </div>
  )
}