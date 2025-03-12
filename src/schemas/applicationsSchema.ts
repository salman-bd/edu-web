import { z } from "zod";

export const studentApplicationSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
  zipCode: z.string().min(4, { message: "Zip code must be at least 4 characters" }).optional(),
  programLevel: z.enum(["elementary", "middle", "high", "college"], {
    required_error: "Please select a program level",
  }),
  programType: z.string().min(1, { message: "Please select a program" }),
  previousSchool: z.string().min(2, { message: "Previous school must be at least 2 characters" }),
  personalStatement: z.string().min(50, { message: "Personal statement must be at least 50 characters" }),
})


// Create a schema without the FileList validation for server-side
export const teachingApplicationBaseSchema = {
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  highestDegree: z.string().min(2, { message: "Please enter your highest degree" }),
  university: z.string().min(2, { message: "Please enter your university" }),
  yearsOfExperience: z.string().min(1, { message: "Please enter your years of experience" }),
  subjectSpecialization: z.string().min(2, { message: "Please enter your subject specialization" }),
  teachingLevel: z.array(z.string()).min(1, { message: "Please select at least one teaching level" }),
  coverLetter: z.string().min(100, { message: "Cover letter must be at least 100 characters" }),
}