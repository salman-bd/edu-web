import { mongoDbConnect } from "@/lib/dbConnect";  
import ProfileModel from "@/models/ProfileModel";  

export const fetchProfileData = async function (email: string) {  
  await mongoDbConnect();  

  try {  
    const profileData = await ProfileModel.findOne({ email });  

    if (profileData) {  
      console.log("Fetched user profile data: ", profileData);  
      return profileData;  
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