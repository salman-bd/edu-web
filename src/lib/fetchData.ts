import { mongoDbConnect } from "@/lib/dbConnect";  
import UserProfile, { UserProfile as UserProfileType } from "@/model/UserProfile";  

export const fetchUserProfileData = async function (email: string): Promise<UserProfileType | null> {  
  await mongoDbConnect();  

  try {  
    const userProfileData = await UserProfile.findOne({ email });  

    if (userProfileData) {  
      console.log("Fetched user profile data: ", userProfileData);  
      return userProfileData;  
    }
  } catch (error) {  
    console.error("Error during fetching user profile data: ", error);  
    return null;
  }  
};


export const fetchSessionData = async () => {  
  const response = await fetch('/api/session'); // Your API endpoint  
  if (!response.ok) {  
      throw new Error('Session data fetch failed!');  
  }  
  return response.json();  
};