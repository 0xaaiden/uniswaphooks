import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const hookSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  website: z.string().url(),
  github: z.string().url(),
  status: z.string(),
})

export type Hook = z.infer<typeof hookSchema>
