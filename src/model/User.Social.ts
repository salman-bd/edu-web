import mongoose, { Schema, Document } from 'mongoose';  
import { mongoDbConnect } from "@/lib/dbConnect";
mongoDbConnect();

export interface SocialUser extends Document {  
    name: string;  
    email: string;  
    isVerified: boolean;  
}  

const SocialUserSchema: Schema<SocialUser> = new Schema({  
    name: {  
        type: String,  
        required: [true, 'Full name is required'],  
        trim: true,  
    },  
    email: {  
        type: String,  
        required: [true, 'Email is required'],  
        trim: true,  
        unique: true,  
        match: [/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Please use a valid email address'],  
    },  
    isVerified: {  
        type: Boolean,  
        default: false,  
    },  
}, { timestamps: true });  

const SocialUserModel = (mongoose.models.SocialUser as mongoose.Model<SocialUser>) || mongoose.model<SocialUser>('SocialUser', SocialUserSchema);  

export default SocialUserModel;