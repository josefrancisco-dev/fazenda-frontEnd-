import { z } from 'zod'

export const stockSchema = z.object({
  quantity: z.number().min(0, 'Quantidade não pode ser negativa'),
  productId: z.string().uuid('Selecione um produto válido'),
})

export type StockTDO = z.infer<typeof stockSchema>


export const updateStockSchema = stockSchema.partial().extend({
  value_Total: z.number().optional(),
})
export type updateStockTDO = z.infer<typeof updateStockSchema>


export type CreateStockRequest = {
  quantity: number
  productId: string
  value_Total: number
}

