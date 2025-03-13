import * as z from "zod"

// Define the maximum file size (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024

// Define accepted image types
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

// Student profile schema
export const studentProfileSchema = z.object({
  // Use conditional check for FileList to avoid SSR issues
  photo:
    typeof FileList !== "undefined"
      ? z
          .instanceof(FileList)
          .refine((files) => files.length > 0, { message: "Profile photo is required" })
          .refine((files) => files[0]?.size <= MAX_FILE_SIZE, { message: "File size must be less than 5MB" })
          .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type), {
            message: "Only JPEG, JPG, PNG, and WebP images are accepted",
          })
      : z.any(), // During SSR, just use any type
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"], {
    required_error: "Please select your gender",
  }),
  institutionName: z.string().min(2, { message: "Institution name is required" }),
  address: z.string().min(5, { message: "Please enter your full address" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Zip code is required" }),
  programLevel: z.enum(["elementary", "middle", "high", "college"], {
    required_error: "Please select a program level",
  }),
  programType: z.string().min(1, { message: "Please select a program" }),
  previousSchool: z.string().optional(),
  personalStatement: z.string().optional(),
})

// Type for the form values
export type StudentProfileFormValues = z.infer<typeof studentProfileSchema>

// Server-side schema without file validation
export const serverStudentProfileSchema = studentProfileSchema.omit({ photo: true }).extend({
  photo: z.any().optional(),
})



/*
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

*/