import { getProfile } from "@/lib/data"
import { ProfileHandler } from "@/components/profile/ProfileHandler"
import { TeacherProfile } from "@/components/profile/TeacherProfile"
import { StudentProfile } from "@/components/profile/StudentProfile"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import SearchProfile from "@/components/profile/SearchProfile"



export default async function ProfileDataFetch() {
  const profileData = await getProfile()

  if (!profileData) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-indigo-600 text-white p-6">
            <CardTitle className="text-2xl font-bold">No Profile Information Available</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-gray-600">
                It seems you haven&apos;t completed your profile yet or you might be signed in with a different email.
              </p>
              <p className="text-gray-600">
                If you&apos;re a student of CSC, please enter your student identification number to access your profile.
              </p>
              <p className="text-gray-600">
                If you haven&apos;t completed your profile, go for completing the profile clicking the below button.
              </p>
            </div>
            <ProfileHandler/>
          </CardContent>
        </Card>
      </div>
    )
  }

  const profileType = profileData.type
  // console.log('Profile fetched data: ', profileData);
  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-8">
      <SearchProfile />
      <div className="space-y-6">
        {profileType === "teacher" && (
          <TeacherProfile data={profileData} />
        )}
        {profileType === "student" && (
          <StudentProfile data={profileData} />
        )}

      </div>
    </div>
  )
}

