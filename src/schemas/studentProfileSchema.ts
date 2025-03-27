import * as z from "zod"

// Define the maximum file size (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024

// Define accepted image types
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

// Student profile schema
export const studentProfileSchema = z.object({
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
  zipCode: z.string().min(4, { message: "Zip code is required" }),
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
  photo: z.any(),
})

