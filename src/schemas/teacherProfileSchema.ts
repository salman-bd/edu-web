import * as z from "zod"  

// Define the maximum file size (5MB)  
export const MAX_FILE_SIZE = 5 * 1024 * 1024  

// Define accepted image types  
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]  

// Create a schema for client-side validation  
export const teacherProfileSchema = z.object({  
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),  
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),  
  email: z.string().email({ message: "Please enter a valid email address" }),  
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),  
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),  
  address: z.string().min(5, { message: "Please enter your full address" }),  
  highestDegree: z.string().min(1, { message: "Please select your highest degree" }),  
  university: z.string().min(2, { message: "Please enter your university/institution" }),  
  yearsOfExperience: z.string().min(1, { message: "Please select your years of experience" }),  
  subjectSpecialization: z.string().min(2, { message: "Please enter your subject specialization" }),  
  teachingLevel: z.array(z.string()).min(1, { message: "Please select at least one teaching level" }),  
  coverLetter: z.string().optional(),  
  // Use union type to accommodate both FileList and string  
  photo: z.union([  
    typeof FileList !== "undefined"  
      ? z  
          .instanceof(FileList)  
          .refine((files) => files.length > 0, { message: "Profile photo is required" })  
          .refine((files) => files[0]?.size <= MAX_FILE_SIZE, { message: "File size must be less than 5MB" })  
          .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type), {  
            message: "Only JPEG, JPG, PNG, and WebP images are accepted",  
          })  
      : z.any(), // During SSR, just use any type  
    z.string() // Allow a string (for existing image URL)  
  ]),  
}); 

// Server-side schema without file validation (files are handled separately)
export const serverTeacherProfileSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  address: z.string().min(5, { message: "Please enter your full address" }),
  highestDegree: z.string().min(1, { message: "Please select your highest degree" }),
  university: z.string().min(2, { message: "Please enter your university/institution" }),
  yearsOfExperience: z.string().min(1, { message: "Please select your years of experience" }),
  subjectSpecialization: z.string().min(2, { message: "Please enter your subject specialization" }),
  teachingLevel: z.array(z.string()).min(1, { message: "Please select at least one teaching level" }),
  coverLetter: z.string().optional(),
  photo: z.any(), // Handle file validation separately in the route handler
})

export type TeacherProfileFormValues = z.infer<typeof teacherProfileSchema>

/*

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
  career: z.string().min(150, {  
    message: "You need to describe your career with at least 150 characters.",  
  }).max(400, {message: "You need to describe your career within 400 characters."}), 
  // achievements: z.array(z.string()).optional(),  
  profileType: z.string(),  
  isAffiliated: z.boolean(),  

  
  */