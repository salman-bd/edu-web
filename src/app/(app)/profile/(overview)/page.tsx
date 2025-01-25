import { getProfileInfo } from "@/lib/data"
import { UserProfile } from "./UserProfile"
import { TeacherProfile } from "./TeacherProfile"
import { StudentProfile } from "./StudentProfile"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function ProfilePage() {
  const fetchedProfileData = await getProfileInfo()

  if (!fetchedProfileData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-indigo-600 text-white p-6">
            <CardTitle className="text-2xl font-bold">No Personal Information Available</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-gray-600">
                Probably you didn't complete your profile or signed in with a different email.
              </p>
              <p className="text-gray-600">
                If you are a student of CSC, please enter your student identification number to access your profile.
              </p>
            </div>
            <UserProfile />
          </CardContent>
        </Card>
      </div>
    )
  }

  const profileType = fetchedProfileData?.profileType

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <h1 className="text-4xl font-bold mb-12 text-center text-indigo-600">Your Profile</h1>

      <div className="space-y-12">
        {profileType === "teacher" && (
          <>
            <TeacherProfile data={fetchedProfileData} />
            <UserProfile data={fetchedProfileData} />
          </>
        )}
        {profileType === "student" && (
          <>
            <StudentProfile data={fetchedProfileData} />
            <UserProfile data={fetchedProfileData} />
          </>
        )}
      </div>
    </div>
  )
}

