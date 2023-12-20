import { z } from 'zod'

const categorySchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  emoji: z.string(),
  count: z.number(),
  tag: z.string(),
})

export const hookSchema = z.object({
  id: z.number(),

  title: z.string(),
  creator: z.string(),
  description: z.string(),
  website: z.string().url(),
  github: z.string().url(),

  categoryId: z.string(),
  categories: z.array(categorySchema),

  status: z.string(),
})

export type Hook = z.infer<typeof hookSchema>

export const resourceSchema = z.object({
  id: z.number(),

  title: z.string(),
  description: z.string(),
  imageUrl: z.string().url(),
  resourceUrl: z.string().url(),

  emoji: z.string(),
  section: z.string(),

  status: z.string(),
  createdAt: z.string(),
})

export type Resource = z.infer<typeof resourceSchema>
