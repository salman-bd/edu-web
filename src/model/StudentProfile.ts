import mongoose, { Schema, Document} from 'mongoose'


export interface StudentProfile extends Document {
  avatar: string;
  name: string;
  institutionName: string;
  grade: string;
  email: string;
  contactNo: string;
  birthDate: Date;
  gender: string;
  achievements: string;
  type: string;
  isAffiliated: boolean;
  updatedAt?: Date;
}

const StudentProfileSchema: Schema<StudentProfile> = new Schema({
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
    required: [true, 'Full name is required'],
    trim: true,
  },
  grade: {
    type: String,
    required: true,
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
  birthDate: {
    type: Date,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  achievements: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    required: true,
  },
  isAffiliated: {
    type: Boolean,
    required: true,
  },
  updatedAt: {  
    type: Date,     
  },
}, {timestamps: true}
);

const StudentProfileModel = (mongoose.models.StudentProfile as mongoose.Model<StudentProfile>) || mongoose.model<StudentProfile>('StudentProfile', StudentProfileSchema);

export default StudentProfileModel;
