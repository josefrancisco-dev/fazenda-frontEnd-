import { z } from "zod"

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Nome obrigatório"),

  description: z
    .string()
    .optional(),
})

export type CreateCategoryDTO = z.infer<typeof categorySchema>

export const updateCategorySchema = categorySchema.partial()

export type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>

export const categoryResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  
  description: z
    .string()
    .nullable()
    .optional(),

  createdAt: z.string(),
})

export type Category = z.infer<typeof categoryResponseSchema>