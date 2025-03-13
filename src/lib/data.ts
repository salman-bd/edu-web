import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import clientPromise from './mongodb';


async function getSession() {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    console.error("Error fetching session:", (error as Error).message);
    return null;
  }
}

export async function getProfileInfo() {  
  try {  
    const session = await getSession();  
    if (!session?.user?.email) return null;  

    const email = session.user.email;  
    
    const client = await clientPromise
    const db = client.db("education_app")
    const collection = db.collection("profiles")

    const profile = await collection.findOne({ email });  
    console.log('Profile data: ', profile);
    

    if (!profile) return null;  
 
    return profile;  

  } catch (error) {  
    console.error("Error fetching personal info:", (error as Error).message);  
    return null;  
  }  
}