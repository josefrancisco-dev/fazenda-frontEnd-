// import { z } from 'zod'

// export const stockSchema = z.object({
//   quantity:  z.coerce.number().int().nonnegative('Quantidade não pode ser negativa'),
//   unit:      z.string(),
//   product :  z.string()
// })

// export type StockTDO = z.infer<typeof stockSchema>

// export const updateStockSchema = stockSchema.partial().extend({
//   id: z.string(), 
// })

// export type updateStockTDO = z.infer<typeof updateStockSchema>

// schemas/stock.ts

// schemas/stock.ts

// import { z } from 'zod'

// export const stockSchema = z.object({
//   quantity: z.number().min(0, 'Quantidade não pode ser negativa'),
//   productId: z.string().uuid('Selecione um produto válido'),
// })

// export type StockTDO = z.infer<typeof stockSchema>

// export const updateStockSchema = stockSchema.partial().extend({
//   id: z.string(),
// })

// export type updateStockTDO = z.infer<typeof updateStockSchema>

// schemas/stock.ts
import { z } from 'zod'

export const stockSchema = z.object({
  quantity: z.number().min(0, 'Quantidade não pode ser negativa'),
  productId: z.string().uuid('Selecione um produto válido'),
})

export type StockTDO = z.infer<typeof stockSchema>

// Tipo para criar estoque no backend
export type CreateStockRequest = {
  quantity: number
  productId: string
  value_Total: number
}

export const updateStockSchema = stockSchema.partial().extend({
  id: z.string(),
})

export type updateStockTDO = z.infer<typeof updateStockSchema>