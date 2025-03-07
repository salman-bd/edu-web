import mongoose, { Schema, Document} from 'mongoose'  

export interface Application extends Document {  
  _id: mongoose.Types.ObjectId;  
  firstName: string;  
  lastName: string;  
  email: string;  
  phone: string;  
  dateOfBirth: Date;  
  address: string;  
  city: string;  
  state: string;  
  zipCode: string;  
  programLevel: string;  
  programType: string;  
  previousSchool: string;  
  personalStatement: string;  
  status: "PENDING" | string; //  Allow other status values in the future  
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
    lowercase: true, // Good practice for emails  
  },  
  phone: {  
    type: String,  
    required: [true, 'Phone number is required'],  
    trim: true,  
  },  
  dateOfBirth: {  
    type: Date,  
    required: [true, 'Date of birth is required'],  
  },  
  address: {  
    type: String,  
    required: [true, 'Address is required'],  
    trim: true,  
  },  
  city: {  
    type: String,  
    required: [true, 'City is required'],  
    trim: true,  
  },  
  state: {  
    type: String,  
    required: [true, 'State is required'],  
    trim: true,  
  },  
  zipCode: {  
    type: String,  
    trim: true,  
    validate: {  
      validator: function(v: string) {  
        return /^\d{4,6}(-\d{4})?$/.test(v);  
      },  
      message: 'Zip code is invalid. Use 4 to 6 digits, optionally followed by -XXXX.'  
    }  
  },
  programLevel: {  
    type: String,  
    required: [true, 'Program level is required'],  
    trim: true,  
  },  
  programType: {  
    type: String,  
    required: [true, 'Program type is required'],  
    trim: true,  
  },  
  previousSchool: {  
    type: String,  
    trim: true,  
  },  
  personalStatement: {  
    type: String,  
    required: [true, 'Personal statement is required'],  
  },  
  status: {  
    type: String,  
    enum: ["PENDING"], // Restrict possible values, use array if more  
    default: "PENDING",  
  },  
  submittedAt: {  
    type: Date,  
    default: Date.now, // Automatically set the submission date  
  },  
}, { timestamps: true }); //  Shorthand for setting both timestamps  

const StudentApplicationModel = (mongoose.models.StudentApplication as mongoose.Model<Application>) || mongoose.model<Application>('StudentApplication', ApplicationSchema);  

export default StudentApplicationModel;  