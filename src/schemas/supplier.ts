import {z} from "zod"

export const supplierSchema = z.object({
  name: z.string()
  .min(1, "O nome é obrigatório")
  .regex(/^[A-Za-zÀ-ÿ\s]+$/, "O nome não deve conter números ou caracteres especiais"),
  role: z.enum(['Client' , 'Supplier' , 'Admin']),
  status:  z.enum(['Customer' , 'Lead' , 'Active']) ,
  // date: z.string(),
  company: z.string()
  .min(1, "O nome é obrigatório")
  .regex(/^[A-Za-zÀ-ÿ\s]+$/, "O nome não deve conter números ou caracteres especiais"),
  email: z.string().min(1, "O email é obrigatório"),
  phone: z
  .string()
  .regex(/^[0-9]+$/, "O telefone deve conter apenas números")
  .length(9, "O telefone deve ter exactamente 9 dígitos"),
  nif: z
    .string().min(1, "O nif é obrigatório")
    .regex(/^[0-9]{10}$/, "NIF de empresa deve conter 10 dígitos numéricos"),
  avatar: z.string().optional()
})

export type supplierSchemaTDO = z.infer<typeof supplierSchema>

export const updateSupplierSchema = supplierSchema.partial()

export type updateSupplierTDO = z.infer<typeof updateSupplierSchema>