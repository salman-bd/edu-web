import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { mongoDbConnect } from "@/lib/dbConnect";  
import UserProfileModel from "@/model/UserProfile";  



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {  
    await mongoDbConnect();  

        try {  
            const formData = await request.formData()
            const avatar = formData.get('avatar') as File
            const name = formData.get('name');  
            const email = formData.get('email');  
            const contactNo = formData.get('contactNo');  
            const school = formData.get('school');  
            const sscPassingYear = formData.get('sscPassingYear');  
            const college = formData.get('college');  
            const hscPassingYear = formData.get('hscPassingYear');  
            const university = formData.get('university');  
            const graduationYear = formData.get('graduationYear');  
            const gender = formData.get('gender');  
            const birthDate = formData.get('birthDate');  
            const achievements = formData.get('achievements');   
    
            if (!name || !email || !avatar) {
                return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
            }

            // Upload image to Cloudinary
            const arrayBuffer = await avatar.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            const cloudinaryResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'image' },
                (error, result) => {
                if (error) reject(error)
                else resolve(result)
                }
            ).end(buffer)
            });

             // ts-ignore
            const photoUrl = cloudinaryResponse.secure_url

            console.log("Received data:", {  
                avatar, name, email,   
            });  
    
    
            const userExistingProfile = await UserProfileModel.findOne({ email });  
    
            // Fields to update:  
            const updates = {  
                avatar: photoUrl,  
                name,  
                email,  
                contactNo,  
                school,  
                sscPassingYear,  
                college,  
                hscPassingYear,  
                university,  
                graduationYear,  
                gender,  
                birthDate,  
                achievements  
            }; 

        if (userExistingProfile) {  
            // Update existing profile  
            Object.keys(updates).forEach(field => {  
                if (updates[field]) userExistingProfile[field] = updates[field];  
            });  
            await userExistingProfile.save();  
            console.log("Updated user profile: ", userExistingProfile);  

            return Response.json(  
                {  
                    success: true,  
                    message: "User profile updated successfully",  
                    userProfile: userExistingProfile,  
                },  
                { status: 200 }  
            );  
        } else {  
            // Create new profile  
            const userNewProfile = new UserProfileModel({   
                ...updates,
                updatedAt: Date.now(),
                isVerified: false,  
            });  
            await userNewProfile.save();  
            console.log("Created new user profile: ", userNewProfile);  

            return Response.json(  
                {  
                    success: true,  
                    message: "User profile created successfully",  
                    userProfile: userNewProfile,  
                },  
                { status: 201 }   
            );  
        }  

    } catch (error) {  
        console.error("Error updating user profile: ", error);  
        return Response.json(  
            {  
                success: false,  
                message: `Error updating user profile: ${error.message}` // More descriptive error message  
            },  
            { status: 500 }  
        );  
    }  
}