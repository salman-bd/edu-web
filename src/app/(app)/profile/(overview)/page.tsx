
import { getProfileInfo } from '@/lib/data'
import { UserProfile } from './UserProfile'
import { TeacherProfile } from './TeacherProfile';
import { StudentProfile } from './StudentProfile';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';



export default async function ProfilePage() {
  const fetchedProfileData = await getProfileInfo();
  // console.log("Fetched profile data: ", fetchedProfileData);

  if (!fetchedProfileData) {
    return (
      <Card className="w-full max-w-2xl mx-auto ">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-1">No personal information available</CardTitle>
          <div className="text-left mt-8">
          <h2>Probably you didn't complete profile or signed in with different email. </h2>
          <p>If you are a student of CSC put the student identification number to go your profile</p>
          </div>

        </CardHeader>
        <UserProfile />
        
      </Card>
    )
  }

  const profileType = fetchedProfileData?.profileType
    
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>

      { profileType === 'teacher' && (
        <>
          <TeacherProfile data = {fetchedProfileData}/>
          <UserProfile data = {fetchedProfileData} />
        </>

      )}
      { profileType === 'student' && (
      <>
        <StudentProfile data = {fetchedProfileData}/>
        <UserProfile data = {fetchedProfileData} />
      </>

      )}

    </div>
  )
}

