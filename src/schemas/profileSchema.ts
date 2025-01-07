import { z } from 'zod';


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const profileSchema = z.object({

  avatar: z
    .custom<File>()
    .refine((file) => file instanceof File, "Avatar is required.")
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .png, and .webp formats are supported."
    )
    .nullable(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactNo: z.string().regex(/^\d{10}$/, "Contact number must be 10 digits."),
  school: z.string().min(2, {
    message: "School must be at least 2 characters.",
  }),
  gender: z.string({
    required_error: "Please select a gender option.",
  }), 
  birthDate: z.date().max(new Date(), "Birthdate must be in the past.").nullable(),
  sscPassingYear:  z.string().regex(/^\d{4}$/, {
    message: "Please enter a valid year (YYYY).",
  }),
  college: z.string().min(2, {
    message: "University must be at least 2 characters.",
  }),
  hscPassingYear:  z.string().regex(/^\d{4}$/, {
    message: "Please enter a valid year (YYYY).",
  }),
  university: z.string().min(2, {
    message: "University must be at least 2 characters.",
  }),
  graduationYear: z.string().regex(/^\d{4}$/, {
    message: "Please enter a valid year (YYYY).",
  }),
  achievements: z.array(z.string()).optional(),  


})

