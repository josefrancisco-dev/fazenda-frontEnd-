import { z } from 'zod'

const itemSchema = z.object({
  name:     z.string().min(1, 'Nome do item obrigatório'),
  quantity: z.number().int().positive('Quantidade deve ser maior que 0'),
  price:    z.number().nonnegative('Preço não pode ser negativo'),
})

export const shoppingSchema = z.object({
  supplierId: z.string().uuid('Selecione um fornecedor'), 
  items:      z.array(itemSchema).min(1, 'Adicione pelo menos um item'), 
  status:     z.boolean(),
})

export type shoppingTDO = z.infer<typeof shoppingSchema>

export const updateShoppingSchema = shoppingSchema.partial()

export type updateShoppingTDO = z.infer<typeof updateShoppingSchema>