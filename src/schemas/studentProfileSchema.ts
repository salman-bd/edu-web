import { z } from 'zod';


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const studentProfileSchema = z.object({
  avatar: z.instanceof(File)  
    .refine(file => file.size > 0, {  
        message: "Avatar file is required and must be valid.", // Ensures a file exists  
    })  
    .refine(file => file.size <= MAX_FILE_SIZE, {  
        message: `Max file size is 5MB.`, // Checks max file size  
    })  
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {  
        message: "Only .jpg, .png, and .webp formats are supported.", // Validates file type  
    }),  
  
  institutionName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  grade: z.string(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactNo: z.string().min(10, "Contact number must be 10 digits.").regex(/^\d{10,15}$/, "No special characters are allowed."),
  gender: z.string({
    required_error: "Please select a gender option.",
  }), 
  birthDate: z.date().max(new Date(), "Birthdate must be in the past.").nullable(),
  achievements: z.array(z.string()).optional(),  
  profileType: z.string(),
  affiliated: z.boolean(),
})

