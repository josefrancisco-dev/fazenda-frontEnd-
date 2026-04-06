import { z } from 'zod'

export const orderResponseSchema = z.object({
  // number: z.number(),
  client: z.string(),
  // date: z.string(),
  itens: z.number(),
  // total: z.number(),
  status: z.string(),
})

export type orderResponseTDO = z.infer<typeof orderResponseSchema>

export const updateOrderSchema = orderResponseSchema.partial().extend({
  id: z.string(),
})

export type updateOrderDTO = z.infer<typeof updateOrderSchema>