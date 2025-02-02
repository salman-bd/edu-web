import { z } from 'zod';


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const studentProfileSchema = z.object({
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
    }),   
  ]),   
  
  institutionName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  grade: z
    .string({
      required_error: "Grade is required",
    })
    .min(1, "Please select a grade"),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactNo: z.string().min(10, "Contact number must be 10 digits.").regex(/^\d{10,15}$/, "No special characters are allowed."),
  gender: z.string({
    required_error: "Please select a gender option.",
  }), 
  birthDate: z.date().max(new Date(), "Birthdate must be in the past.").nullable(),
  // achievements: z.array(z.string()).optional(),  
  profileType: z.string(),  
  isAffiliated: z.boolean(),  
})

