import { v2 as cloudinary } from 'cloudinary';  
import { mongoDbConnect } from "@/lib/dbConnect";  
import StudentProfileModel from "@/model/StudentProfile";  
import { NextResponse } from 'next/server';  

// Cloudinary configuration  
cloudinary.config({  
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
  api_key: process.env.CLOUDINARY_API_KEY,  
  api_secret: process.env.CLOUDINARY_API_SECRET,  
});  

export async function POST(request: Request) {  
    await mongoDbConnect();  
    try {  
        const formData = await request.formData();  
        const avatar = formData.get('avatar') as File;  
        const name = formData.get('name');   
        const email = formData.get('email');  
        const institutionName = formData.get('institutionName');   
        const grade = formData.get('grade');   
        const contactNo = formData.get('contactNo');  
        const gender = formData.get('gender');  
        const birthDate = formData.get('birthDate');  
        const achievements = formData.get('achievements');    
        const isAffiliated = formData.get('affiliated');   


        // Upload image to Cloudinary  
        const arrayBuffer = await avatar.arrayBuffer();  
        const buffer = Buffer.from(arrayBuffer);  

        const cloudinaryResponse = await new Promise((resolve, reject) => {  
            cloudinary.uploader.upload_stream(  
                { resource_type: 'image' },  
                (error, result) => {  
                    if (error) reject(error);  
                    else resolve(result);  
                }  
            ).end(buffer);  
        });  

        if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {  
            throw new Error('Image upload to Cloudinary failed');  
        }  

        const photoUrl = cloudinaryResponse.secure_url;  
        console.log("Photo URL: ", photoUrl);  

        // Check if a profile already exists  
        const studentExistingProfile = await StudentProfileModel.findOne({ email });  

        // Fields to update  
        const updates = {  
            avatar: photoUrl,  
            name,  
            institutionName,  
            grade,  
            email,  
            contactNo,    
            gender,  
            birthDate,  
            achievements,  
            type: 'student',  
            isAffiliated,  
            updatedAt: Date.now(),  
        };  

        if (studentExistingProfile) {  
            // Update existing profile  
            Object.keys(updates).forEach(field => {  
                if (updates[field]) {  
                    studentExistingProfile[field] = updates[field];  
                }  
            });  

            await studentExistingProfile.save();  
            console.log("Updated student profile: ", studentExistingProfile);  

            return NextResponse.json({  
                success: true,  
                message: "Student profile updated successfully",  
                userProfile: studentExistingProfile,  
            }, { status: 200 });  
        } else {  
            // Create a new profile  
            const studentNewProfile = new StudentProfileModel({   
                ...updates,  
            });  

            await studentNewProfile.save();  
            console.log("Created new student profile: ", studentNewProfile);  

            return NextResponse.json({  
                success: true,  
                message: "Student profile created successfully",  
                userProfile: studentNewProfile,  
            }, { status: 201 });  
        }  
    } catch (error) {  
        console.error("Error updating student profile: ", error);  

        return NextResponse.json({  
            success: false,  
            message: `Error updating student profile: ${error.message}` // More descriptive error message  
        }, { status: 500 });  
    }  
}