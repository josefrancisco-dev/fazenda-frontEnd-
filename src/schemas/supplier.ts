import {z} from "zod"

export const supplierSchema = z.object({
  name: z.string(),
  role: z.string(),
  status:  z.enum(['Customer' , 'Lead' , 'Active']) ,
  // date: z.string(),
  company: z.string(),
  email: z.string(),
  phone: z.string(),
  nif:  z.string(),
  avatar: z.string().optional()
})

export type supplierSchemaTDO = z.infer<typeof supplierSchema>

export const updateSupplierSchema = supplierSchema.partial().extend({
  id: z.string(), 
})

export type updateSupplierTDO = z.infer<typeof updateSupplierSchema>