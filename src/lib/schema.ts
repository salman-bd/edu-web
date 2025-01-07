import { z } from 'zod'

export const courseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  image: z.string().optional(),
  category: z.string(),
  duration: z.string(),
  price: z.object({
    id: z.string(),
    amount: z.number().optional(),
    display_amount: z.string().optional(),
  }),
})

export const courseListSchema = z.object({
  data: z.array(courseSchema),
  has_more: z.boolean(),
  starting_after: z.string().optional(),
})

