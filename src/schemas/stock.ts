import { z } from 'zod'

export const stockSchema = z.object({
  quantity: z.number().min(0, 'Quantidade não pode ser negativa'),
  productId: z.string().uuid('Selecione um produto válido'),
})

export type StockTDO = z.infer<typeof stockSchema>

export type CreateStockRequest = {
  quantity: number
  productId: string
  value_Total: number
}

export const updateStockSchema = stockSchema.partial().extend({
  id: z.string(),
})

export type updateStockTDO = z.infer<typeof updateStockSchema>