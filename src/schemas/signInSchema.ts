import * as z from 'zod';  

export const signInSchema = z.object({  
  email: z.string().min(1, 'Email is required'), // Ensure it’s not empty  
  password: z.string().min(6, 'Password must be at least 6 characters'),  
  rememberMe: z.boolean().default(false).optional(),
});