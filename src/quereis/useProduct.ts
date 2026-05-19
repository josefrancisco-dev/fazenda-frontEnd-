import type { ProductTDO, updateProductTDO } from "@/schemas/product"
import { productService } from "@/service/product"
import type { GetParams } from "@/types/typesApi"
// import type { GetParams } from "@/types/typesApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const CLIENT_KEY = ['product'] as const

export const useGetAllProducts = (params?: GetParams) =>
  useQuery({
    queryKey: ['product', params],
    queryFn: async () => {
      const response = await productService.getAll(params)
      return response
    },
    placeholderData: (previousData) => previousData,
  })


export const  useCreateProduct  =  () => {
 const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['product'],
    mutationFn: async (data: ProductTDO) => {
      const response = await productService.create(data)
      return response
    },
    onSuccess: async () => {
      toast.success('Product criado com sucesso !', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
      queryClient.invalidateQueries({ queryKey: ['product'] })
    },
    onError: () => {
      toast.error('Alguma coisa deu errado !')
    },
  })
}

export const  useUpdateProduct  =  () => {
 const queryClient = useQueryClient()

  return useMutation({
    mutationKey: CLIENT_KEY,
    mutationFn: async ({id , data} :  {id: string, data: updateProductTDO}) => {
      const response = await productService.update(id , data)
      return response
    },
    onSuccess: async () => {
      toast.success('Cliente criado com sucesso !', {
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