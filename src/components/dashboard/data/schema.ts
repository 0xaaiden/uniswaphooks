import { z } from 'zod'

export const hookSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  website: z.string().url(),
  github: z.string().url(),
  status: z.string(),
})

export type Hook = z.infer<typeof hookSchema>
