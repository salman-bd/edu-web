import { StudentProfile } from "@/components/profile/StudentProfile"
import { getProfileById } from "@/lib/data"

export default async function StudentProfilePage({ params }: { params: { id: string } }) {
  const profileData = await getProfileById(params.id)

  return (
    <>
    <div className="container mx-auto py-10">
      {profileData && (
        <StudentProfile data={profileData} />
      )}
    </div>
    </>
  )
}

