import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório')
  .regex(/^[A-Za-zÀ-ÿ\s]+$/, "O nome não deve conter números ou caracteres especiais"),
  categoryId: z.string().min(1, 'Categoria obrigatória'),
  price: z.coerce.number().positive('Preço deve ser maior que 0'),
  unit: z.string(),
  image: z.instanceof(File).optional()
})

 export type ProductTDO = z.infer<typeof productSchema>

 export const updateProductSchema = productSchema.partial()

 export type updateProductTDO = z.infer<typeof updateProductSchema>