import mongoose, { Schema, Document } from 'mongoose';  

export interface Application extends Document {  
  _id: mongoose.Types.ObjectId;  
  firstName: string;  
  lastName: string;  
  email: string;  
  phone: string;  
  address: string;  
  highestDegree: string;  
  university: string;  
  yearsOfExperience: string;  
  subjectSpecialization: string;  
  teachingLevel: string[];  
  coverLetter: string;  
  resume: {  
    filename: string;  
    contentType: string;  
    size: number;  
    data: Buffer; // Store the file data as a Buffer  
  };  
  status: "PENDING" | string;  
  submittedAt: Date;  
  updatedAt: Date;  
}  

const ApplicationSchema: Schema<Application> = new Schema({  
  firstName: {  
    type: String,  
    required: [true, 'First name is required'],  
    trim: true,  
  },  
  lastName: {  
    type: String,  
    required: [true, 'Last name is required'],  
    trim: true,  
  },  
  email: {  
    type: String,  
    required: [true, 'Email is required'],  
    trim: true,  
    lowercase: true,  
  },  
  phone: {  
    type: String,  
    trim: true,  
  },  
  address: {  
    type: String,  
    required: [true, 'Address is required'],  
    trim: true,  
  },  
  highestDegree: {  
    type: String,  
    required: [true, 'Highest degree is required'],  
    trim: true,  
  },  
  university: {  
    type: String,  
    required: [true, 'University is required'],  
    trim: true,  
  },  
  yearsOfExperience: {  
    type: String,  
    required: [true, 'Years of experience is required'],  
    min: 0, //  Ensure years of experience is not negative  
  },  
  subjectSpecialization: {  
    type: String,  
    required: [true, 'Subject specialization is required'],  
    trim: true,  
  },  
  teachingLevel: {  
    type: [String],  
    required: [true, 'Teaching level is required'],  
    trim: true,  
  },  
  coverLetter: {  
    type: String,  
    required: [true, 'Cover letter is required'],  
  },  
  resume: {  
    filename: {  
      type: String,  
      required: [true, 'Resume filename is required'],  
    },  
    contentType: {  
      type: String,  
      required: [true, 'Resume content type is required'],  
    },  
    size: {  
      type: Number,  
      required: [true, 'Resume size is required'],  
    },  
    data: {  
      type: Buffer,  
      required: [true, 'Resume data is required'],  
    },  
  },  
  status: {  
    type: String,  
    enum: ["PENDING"],  
    default: "PENDING",  
  },  
  submittedAt: {  
    type: Date,  
    default: Date.now,  
  },  
  updatedAt: {  
    type: Date,  
    default: Date.now,  
  },  
}, { timestamps: true });  

const TeacherApplicationModel = (mongoose.models.TeacherApplication as mongoose.Model<Application>) || mongoose.model<Application>('TeacherApplication', ApplicationSchema);  

export default TeacherApplicationModel;  