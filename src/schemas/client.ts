import {z} from "zod"

export const clientSchema = z.object({
  name: z.string(),
  role: z.enum(['Client' , 'Supplier' , 'Admin']),
  status:  z.enum(['Customer' , 'Lead' , 'Active']),
  // date: z.string(),
  company: z.string(),
  email: z.email(),
  phone: z.string(),
  nif:  z.string(),
  password :  z.string(),
  avatar: z.string().optional(),
})

export type clientSchemaTDO = z.infer<typeof clientSchema>

export const updateClientSchema = clientSchema.partial()
.extend({id: z.string()})

export type updateClientTDO = z.infer<typeof updateClientSchema>