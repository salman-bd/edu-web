import { mongoDbConnect } from "@/lib/dbConnect";  
import SocialUserModel from "@/model/User.Social"; 



export async function POST(request: Request) {
    await mongoDbConnect();
    try {
        const { searchParams} = new URL(request.url);
        const userSession = searchParams.get('userSession');
        const userName = userSession.name;
        const userEmail = userSession.email;

        console.log('User session to make data base query: ', userSession);
        

        const existingUserByEmail = await SocialUserModel.findOne({userEmail});  

        if (existingUserByEmail) {  
            return;
        } 
        const newUser = new SocialUserModel({  
            name: userName,  
            email: userEmail,
            isVerified: true,  
        });  
        console.log("New user: ", newUser);  
        await newUser.save();   ;
        
    } catch (error) {  
        console.log('Error in social registering: ', error);
        return;
    }  
}