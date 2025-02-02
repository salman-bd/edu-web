import mongoose, { Schema, Document} from 'mongoose'


export interface Profile extends Document {
  _id: mongoose.Types.ObjectId; // Define this based on your model  
  avatar: string;
  name: string;
  institutionName: string;
  grade: string;
  designation: string;
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
  profileType: string;
  isAffiliated: boolean;
  achievements: string[];
}

const ProfileSchema: Schema<Profile> = new Schema({  
  avatar: {  
    type: String,  
    required: [true, 'Profile Picture is required'],  
    trim: true,  
  },  
  name: {  
    type: String,  
    required: [true, 'Full name is required'],  
    trim: true,  
  },  
  institutionName: {  
    type: String,  
    required: [true, 'Institution name is required'],  
    trim: true,  
  },  
  grade: {  
    type: String,  
    trim: true,  
  },  
  designation: {  
    type: String,  
    required: true,  
  },  
  email: {  
    type: String,  
    required: [true, 'Email is required'],  
    trim: true,  
    unique: true,   
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
  },  
  profileType: {  
    type: String,  
    required: true,  
  },  
  isAffiliated: {  
    type: Boolean,  
    required: true,  
  },  
  achievements: {  
    type: [String], // Specify this as an array of strings  
    default: [], // Optional: Set a default value to an empty array  
  },  
}, { timestamps: true }); 

const ProfileModel = (mongoose.models.Profile as mongoose.Model<Profile>) || mongoose.model<Profile>('Profile', ProfileSchema);

export default ProfileModel;