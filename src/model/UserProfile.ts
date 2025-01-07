import mongoose, { Schema, Document} from 'mongoose'


export interface UserProfile extends Document {
    name: string;
    avatar: string;
    email: string;
    contactNo: string;
    school: string;
    sscPassingYear: string;
    college: string;
    hscPassingYear: string;
    university: string;
    graduationYear: string;
    gender: string;
    birthDate: Date;
    isVerified: boolean;
    achievements: string;
    updatedAt?: Date;
}

const UserProfileSchema: Schema<UserProfile> = new Schema({
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    avatar: {
      type: String,
      required: [true, 'Profile Picture is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      unique: true,
      match:[/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Please use a valid email address']
    },
    contactNo: {
      type: String,
      trim: true,
    },
    sscPassingYear: {
      type: String,
      trim: true,
    },
    college: {
      type: String,
      trim: true,
    },
    hscPassingYear: {
      type: String,
      trim: true,
    },
    university: {
      type: String,
      trim: true,
    },
    graduationYear: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    birthDate: {
      type: Date,
      trim: true,
    },
    achievements: {
      type: String,
      trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    updatedAt: {  
        type: Date,     
    },
}, {timestamps: true}
);

const UserProfileModel = (mongoose.models.UserProfile as mongoose.Model<UserProfile>) || mongoose.model<UserProfile>('UserProfile', UserProfileSchema);

export default UserProfileModel;
