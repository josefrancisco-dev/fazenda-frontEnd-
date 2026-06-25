import {z} from "zod"

export const clientSchema = z.object({
  name: z.string(),
  role: z.enum(['Client' , 'Commercial_Manager' , 'Admin']),
  status:  z.enum(['Customer' , 'Lead' , 'Active']),
  // date: z.string(),
  email: z.email(),
  phone: z.string(),
  nif:  z.string().optional(),
  password :  z.string(),
  avatar: z.string().optional(),
  isCorporative : z.string().optional()
})

export type clientSchemaTDO = z.infer<typeof clientSchema>

export const updateClientSchema = clientSchema.partial()
// .extend({id: z.string()})

export type updateClientTDO = z.infer<typeof updateClientSchema>