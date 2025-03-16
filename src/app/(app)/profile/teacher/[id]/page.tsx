import { TeacherProfile } from "@/components/profile/TeacherProfile"
import { getProfileById } from "@/lib/data"

export default async function TeacherProfilePage({ params }: { params: { id: string } }) {
  const param = await params
  const profileData = await getProfileById(param.id)

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

