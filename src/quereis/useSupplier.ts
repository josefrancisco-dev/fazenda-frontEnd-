import type { supplierSchemaTDO, updateSupplierTDO } from "@/schemas/supplier"
import { supplierService } from "@/service/suppliers"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"


export const useGetAllSupplier = () => {
   return useQuery({
    queryKey: ['supplier'],
    queryFn: async () => {
      const response = await supplierService.getAll()
      return response
    },
   })
}

export const  useCreateSupplier  =  () => {
 const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['supplier'],
    mutationFn: async (data: supplierSchemaTDO) => {
      const response = await supplierService.create(data)
      return response
    },
    onSuccess: async () => {
      toast.success('Cliente criado com sucesso !', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
      queryClient.invalidateQueries({ queryKey: ['supplier'] })
    },
    onError: () => {
      toast.error('Alguma coisa deu errado !')
    },
  })
}

export const  useUpdateSupplier  =  () => {
 const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['client'],
    mutationFn: async ({id , data} :  {id: string, data: updateSupplierTDO}) => {
      const response = await supplierService.update(id , data)
      return response
    },
    onSuccess: async () => {
      toast.success('Fornecedor criado com sucesso !', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
      queryClient.invalidateQueries({ queryKey: ['client'] })
    },
    onError: () => {
      toast.error('Alguma coisa deu errado !')
    },
  })
}