import { mongoDbConnect } from "@/lib/dbConnect";  
import SocialUserModel from "@/model/User.Social"; 


export async function POST(request: Request) {
    await mongoDbConnect();
    try {  
        const { name, email } =await request.json(); 
        console.log("Social data after receiving from client: ", name, email);  
        
        const existingUserByEmail = await SocialUserModel.findOne({email});  

        if (existingUserByEmail) {  
            return Response.json(
                {
                    success: false,
                    message: "User already exist with this email"
                },
                {status: 500}
            )
        }   
        const newUser = new SocialUserModel({  
            name,  
            email,  
            isVerified: true,  
        });  

        console.log("New user: ", newUser);  
        await newUser.save();  
        return Response.json(
            {
                success: true,
                message: "User registered successfully. Please verify your email"
            },
            {status: 201}
        )
    } catch (error) {  
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }
        ) 
    }  
}