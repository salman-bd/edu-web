import { v2 as cloudinary } from 'cloudinary';  
import { mongoDbConnect } from "@/lib/dbConnect";  
import ProfileModel from "@/model/ProfileModel";  

cloudinary.config({  
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
  api_key: process.env.CLOUDINARY_API_KEY,  
  api_secret: process.env.CLOUDINARY_API_SECRET,  
})  

export async function POST(request: Request) {  
    await mongoDbConnect();  

    try {  
        const formData = await request.formData();  
        
        // Define the types explicitly for clarity  
        const avatar = formData.get('avatar') as File | string;  
        const name = formData.get('name') as string;   
        const institutionName = formData.get('institutionName') as string;  
        const designation = formData.get('designation') as string;   
        const email = formData.get('email') as string;  
        const contactNo = formData.get('contactNo') as string;  
        const school = formData.get('school') as string;  
        const sscPassingYear = formData.get('sscPassingYear') as string;  
        const college = formData.get('college') as string;  
        const hscPassingYear = formData.get('hscPassingYear') as string;  
        const university = formData.get('university') as string;  
        const graduationYear = formData.get('graduationYear') as string;  
        const gender = formData.get('gender') as string;  
        const birthDateString = formData.get('birthDate') as string;  
        // const achievements = formData.get('achievements') as string[]; 
        const isAffiliated = formData.get('isAffiliated') === 'true'; // Ensure this is a boolean  
        const profileType = formData.get('profileType') as string;  

        let cloudinaryResponse;  

        // Handle avatar file upload  
        if (avatar instanceof File) {  
            const arrayBuffer = await avatar.arrayBuffer();   
            const buffer = Buffer.from(arrayBuffer);  

            cloudinaryResponse = await new Promise((resolve, reject) => {  
                cloudinary.uploader.upload_stream(  
                    { resource_type: 'auto' },   
                    (error, result) => {  
                        if (error) {  
                            reject(error);  
                        } else {  
                            resolve(result);  
                        }  
                    }  
                ).end(buffer);  
            });  
        } else if (typeof avatar === 'string') {  
            cloudinaryResponse = await cloudinary.uploader.upload(avatar, {  
                resource_type: 'auto',  
            });  
        } else {  
            throw new TypeError('Invalid avatar type. Expected a File or a URL string.');  
        }  

        const photoUrl = cloudinaryResponse.secure_url;  

        // console.log("\nachievements: ", achievements);
        // console.log("\nachievements: ", achievements instanceof Array);

        const existingProfile = await ProfileModel.findOne({ email });  

        const updates = {  
            avatar: photoUrl,  
            name,  
            institutionName,  
            designation,  
            email,  
            contactNo,  
            school: school || undefined,  
            sscPassingYear: sscPassingYear || undefined,  
            college: college || undefined,  
            hscPassingYear: hscPassingYear || undefined,  
            university: university || undefined,  
            graduationYear: graduationYear || undefined,  
            gender,  
            birthDate: new Date(birthDateString), // Ensure date is stored as Date  
            profileType,  
            isAffiliated,  
            // achievements: Array.isArray(achievements) ? achievements : [],  
        };   

        if (existingProfile) {  
            Object.assign(existingProfile, updates); // Using Object.assign for better readability  
            await existingProfile.save();  

            // console.log("Updated profile: ", existingProfile);  
            return Response.json(  
                {  
                    success: true,  
                    message: "Profile updated successfully",  
                    profile: existingProfile,  
                },  
                { status: 200 }  
            );  
        } else {  
            const teacherNewProfile = new ProfileModel(updates);  
            await teacherNewProfile.save();  

            // console.log("Created new profile: ", teacherNewProfile);  
            return Response.json(  
                {  
                    success: true,  
                    message: "Profile created successfully",  
                    teacherProfile: teacherNewProfile,  
                },  
                { status: 201 }   
            );  
        }  

    } catch (error) {  
        console.error("Error updating profile: ", error);  
        return Response.json(  
            {  
                success: false,  
                message: `Error updating profile: ${error.message || error}` // More descriptive error message  
            },  
            { status: 500 }  
        );  
    }  
}