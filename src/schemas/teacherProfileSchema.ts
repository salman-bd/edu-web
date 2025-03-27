import * as z from "zod"

// Define the maximum file size (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024

// Define accepted image types
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

// Teacher profile schema
export const teacherProfileSchema = z.object({
  // Make photo optional and handle validation more robustly
  photo: z
    .union([
      typeof FileList !== "undefined"
        ? z
            .instanceof(FileList)
            .optional()
            .refine((files) => !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE, {
              message: "File size must be less than 5MB",
            })
            .refine((files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0]?.type), {
              message: "Only JPEG, JPG, PNG, and WebP images are accepted",
            })
        : z.any(), // During SSR, just use any type
      z
        .string()
        .optional(), // Allow a string (for existing image URL)
      z.null(), // Allow null for no image
    ])
    .optional(),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  dateOfBirth: z.string(),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  highestDegree: z.string(),
  university: z.string().min(2, {
    message: "University name must be at least 2 characters.",
  }),
  yearsOfExperience: z.string(),
  subjectSpecialization: z.string().min(2, {
    message: "Subject specialization must be at least 2 characters.",
  }),
  teachingLevel: z.string().array().min(1, {
    message: "Please select at least one teaching level.",
  }),
  coverLetter: z.string().optional(),
})

// Type for the form values
export type TeacherProfileFormValues = z.infer<typeof teacherProfileSchema>

// Server-side schema without file validation
export const serverTeacherProfileSchema = teacherProfileSchema.omit({ photo: true }).extend({
  photo: z.any(),
})

