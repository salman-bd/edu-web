import { StudentProfile } from "@/components/profile/StudentProfile"
import { getProfileById } from "@/lib/data"


export default async function Page({ params }: { params: { id: string } }) {
  // Extract the ID from props.params
  const { id } = params
  
  const profileData = await getProfileById(id)

  return (
    <div className="container mx-auto py-10">
      {profileData && (
        <StudentProfile data={profileData} />
      )}
    </div>
  )
}