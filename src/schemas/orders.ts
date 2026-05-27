
import z from 'zod'


export const orderItemSchema = z.object({
  quantity:  z.number().min(1),
  price:     z.number().min(0),
  productId: z.string().uuid(),
})

export const orderSchema = z.object({
  number: z.number(),
  date:   z.string(),
  total:  z.number().min(0),
  items:  z.array(orderItemSchema).min(1, 'Adicione pelo menos um item'),
})

export type orderResponseTDO = z.infer<typeof orderSchema>

export const orderStatusSchema = z.enum([
  "Pendente",
  "Confirmado",
  "Em_processamento",
  "Enviado",
  "Entregue",
])

export const updateOrderSchema = orderSchema
  .partial()
  .extend({
    id:     z.string().optional(),
    status: orderStatusSchema.optional(),
  })

export type updateOrderDTO = z.infer<typeof updateOrderSchema>