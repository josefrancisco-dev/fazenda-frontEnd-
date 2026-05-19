import type { supplierSchemaTDO, updateSupplierTDO } from "@/schemas/supplier"
import { supplierService } from "@/service/suppliers"
import type { GetParams } from "@/types/typesApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const CLIENT_KEY = ['supplier'] as const

export const useGetAllSupplier = (params?: GetParams) => {
   return useQuery({
    queryKey: ['supplier', params],
    queryFn: async () => {
      const response = await supplierService.getAll(params)
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
    mutationKey: CLIENT_KEY,
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
      queryClient.invalidateQueries({ queryKey: CLIENT_KEY })
    },
    onError: () => {
      toast.error('Alguma coisa deu errado !')
    },
  })
}

export const  usePatchSupplier  =  () => {
 const queryClient = useQueryClient()

  return useMutation({
    mutationKey: CLIENT_KEY,
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
      queryClient.invalidateQueries({ queryKey: CLIENT_KEY})
    },
    onError: () => {
      toast.error('Alguma coisa deu errado !')
    },
  })
}