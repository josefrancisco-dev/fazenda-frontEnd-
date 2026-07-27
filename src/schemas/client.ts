import {z} from "zod"

export const clientSchema = z.object({
  name: z
  .string()
  .min(1, "O nome é obrigatório")
  .regex(/^[A-Za-zÀ-ÿ\s]+$/, "O nome não deve conter números ou caracteres especiais"),
  role: z.enum(['Client' , 'Commercial_Manager' , 'Admin']),
  status:  z.enum(['Customer' , 'Lead' , 'Active']),
  // date: z.string(),
  email: z.email(),
  phone: z
  .string()
  .regex(/^[0-9]+$/, "O telefone deve conter apenas números") 
  .length(9, "O telefone deve ter exactamente 9 dígitos"),
  nif:  z.string().optional(),
  password :  z.string(),
  avatar: z.string().optional(),
  isCorporative : z.string().optional()
})

export type clientSchemaTDO = z.infer<typeof clientSchema>

export const updateClientSchema = clientSchema.partial()
// .extend({id: z.string()})

export type updateClientTDO = z.infer<typeof updateClientSchema>