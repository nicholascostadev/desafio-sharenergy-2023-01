import { z } from 'zod'

// "email" | "name"
// http://localhost:4444/clients?filter=name&query=nicholas
// http://localhost:4444/clients?email=nicholascostadev@gmail.com
export const querySchema = z.object({
  filter: z.union([z.literal('email'), z.literal('name')]).default('name'),
  query: z.string().transform(val => val.toLowerCase()).optional(),
  perPage: z.number().min(1).max(100).default(10),
  page: z.number().min(1).default(1)
})
