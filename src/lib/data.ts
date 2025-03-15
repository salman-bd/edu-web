import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

async function getSession() {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    console.error("Error fetching session:", (error as Error).message);
    return null;
  }
}

export async function getProfile() {  
  try {  
    const session = await getSession();  
    if (!session?.user?.email) return null;  
    const email = session.user.email;  
    
    const client = await clientPromise
    const db = client.db("education_app")
    const collection = db.collection("profiles")

    const profile = await collection.findOne({ email });  
  
    if (!profile) return null;  
    let profileData
    if (profile.type === 'student') {
      profileData = {
        id: profile._id.toString(),
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        institutionName: profile.institutionName,

        address: profile.address,
        zipCode: profile.zipCode,
        city: profile.city,
        state: profile.state,
        programLevel: profile.programLevel,
        programType: profile.programType,
        previousSchool: profile.previousSchool,
        personalStatement: profile.personalStatement,
        photoUrl: profile.photoUrl,
        isAffiliated: profile.isAffiliated,
        type: profile.type,
        fullName: profile.fullName,
        createdAt: profile.createdAt
      } 
    } else {
      profileData = {
        id: profile._id.toString(),
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        dateOfBirth: profile.dateOfBirth,
        address: profile.address,
        highestDegree: profile.highestDegree,
        university: profile.university,
        yearsOfExperience: profile.yearsOfExperience,
        subjectSpecialization: profile.subjectSpecialization,
        teachingLevel: profile.teachingLevel,
        coverLetter: profile.coverLetter,
        photoUrl: profile.photoUrl,
        isAffiliated: profile.isAffiliated,
        type: profile.type,
        fullName: profile.fullName,
        createdAt: profile.createdAt
      } 
    }

    // console.log('Profile data: ', profile);
    return profileData

  } catch (error) {  
    console.error("Error fetching personal info:", (error as Error).message);  
    return null;  
  }  
}

export async function getProfileById(id: string) {  
  try {  
    const session = await getSession();  
    if (!session?.user?.email) return null;  

    const client = await clientPromise
    const db = client.db("education_app")
    const collection = db.collection("profiles")

    const profile = await collection.findOne({ _id: new ObjectId(id) });  
  
    if (!profile) return null;  
    let profileData
    if (profile.type === 'student') {
      profileData = {
        id: profile._id.toString(),
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        institutionName: profile.institutionName,

        address: profile.address,
        zipCode: profile.zipCode,
        city: profile.city,
        state: profile.state,
        programLevel: profile.programLevel,
        programType: profile.programType,
        previousSchool: profile.previousSchool,
        personalStatement: profile.personalStatement,
        photoUrl: profile.photoUrl,
        isAffiliated: profile.isAffiliated,
        type: profile.type,
        fullName: profile.fullName,
        createdAt: profile.createdAt
      } 
    } else {
      profileData = {
        id: profile._id.toString(),
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        dateOfBirth: profile.dateOfBirth,
        address: profile.address,
        highestDegree: profile.highestDegree,
        university: profile.university,
        yearsOfExperience: profile.yearsOfExperience,
        subjectSpecialization: profile.subjectSpecialization,
        teachingLevel: profile.teachingLevel,
        coverLetter: profile.coverLetter,
        photoUrl: profile.photoUrl,
        isAffiliated: profile.isAffiliated,
        type: profile.type,
        fullName: profile.fullName,
        createdAt: profile.createdAt
      } 
    }

    // console.log('Profile data: ', profile);
    return profileData

  } catch (error) {  
    console.error("Error fetching personal info:", (error as Error).message);  
    return null;  
  }  
}