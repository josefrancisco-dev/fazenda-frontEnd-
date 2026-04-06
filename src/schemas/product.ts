import { z } from 'zod'

export const productSchema = z.object({
  name:     z.string().min(1, 'Nome obrigatório'),
  category: z.string().min(1, 'Categoria obrigatória'),
  price:    z.coerce.number().positive('Preço deve ser maior que 0'),
  unit:  z.string(),
  banner:   z.string().min(1, 'Banner obrigatório'),
  emoji:    z.string().min(1, 'Emoji obrigatório'),
  image:    z.instanceof(File).optional()
})

export type ProductTDO = z.infer<typeof productSchema>

export const updateProductSchema = productSchema.partial().extend({
  id: z.string(),
})

export type updateProductTDO = z.infer<typeof updateProductSchema>