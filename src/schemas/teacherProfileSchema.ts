import { z } from 'zod';  

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB  
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];  

export const teacherProfileSchema = z.object({  
  avatar: z  
    .union([ // Use union to allow File or string  
      z.instanceof(File)  
        .refine(file => file.size > 0, {   
          message: "Avatar file is required."   
        })  
        .refine(file => file.size <= MAX_FILE_SIZE, {   
          message: `Max file size is 5MB.`   
        })  
        .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {   
          message: "Only .jpg, .png, and .webp formats are supported."   
        }),  
      z.string().url().refine(url => url.length > 0, {   
        message: "Avatar URL is required."  
      }), // Ensure that the URL is a valid string  
    ]),  

  name: z.string().min(2, {  
    message: "Name must be at least 2 characters.",  
  }),  
  institutionName: z.string().min(2, {  
    message: "Institution name must be at least 2 characters.",  
  }).optional(),  
  designation: z.string({  
    required_error: "Designation is required.",  
  }),  
  email: z.string().email({  
    message: "Please enter a valid email address.",  
  }),  
  contactNo: z.string().regex(/^\d{10,15}$/, "Contact number must be between 10 and 15 digits."),  
  gender: z.string({  
    required_error: "Please select a gender option.",  
  }),   
  
  birthDate: z.date({  
    required_error: "Please select a date of birth.",  
  }).refine((date) => date !== null, {  
    message: "Please select a date of birth.",  
  }).refine((date) => {  
    const age = new Date().getFullYear() - date.getFullYear();  
    return age >= 4;  
  }, {  
    message: "You must be at least 4 years old to register.",  
  }).nullable(),  

  school: z.string().min(2, {  
    message: "School must be at least 2 characters.",  
  }),  
  sscPassingYear: z.string().regex(/^\d{4}$/, {  
    message: "Please enter a valid year (YYYY).",  
  }),  
  college: z.string().min(2, {  
    message: "College must be at least 2 characters.",  
  }),  
  hscPassingYear: z.string().regex(/^\d{4}$/, {  
    message: "Please enter a valid year (YYYY).",  
  }),  
  university: z.string().min(2, {  
    message: "University must be at least 2 characters.",  
  }),  
  graduationYear: z.string().regex(/^\d{4}$/, {  
    message: "Please enter a valid year (YYYY).",  
  }),  
  achievements: z.array(z.string()).optional(),  
  profileType: z.string(),  
  isAffiliated: z.boolean(),  
});