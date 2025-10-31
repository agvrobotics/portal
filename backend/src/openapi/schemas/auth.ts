import { z } from 'zod'

export const verifyTokenSchema = z.object({
  message: z.string(),
  user: z.object({
    email: z.string(),
    id: z.string(),
  }),
})
