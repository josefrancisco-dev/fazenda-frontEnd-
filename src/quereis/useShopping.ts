import type { shoppingTDO, updateShoppingTDO } from "@/schemas/shopping"
import { shoppingService } from "@/service/shopping"
import type { GetParams } from "@/types/typesApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"


export const useGetAllShopping = (params?: GetParams) => {
   return useQuery({
    queryKey: ['shopping', params],
    queryFn: async () => {
      const response = await shoppingService.getAll(params)
      return response
    },
   })
}

export const  useCreateShopping  =  () => {
 const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['shopping'],
    mutationFn: async (data: shoppingTDO) => {
      const response = await shoppingService.create(data)
      return response
    },
    onSuccess: async () => {
      toast.success('Cliente criado com sucesso !', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
      queryClient.invalidateQueries({ queryKey: ['shopping'] })
    },
    onError: () => {
      toast.error('Alguma coisa deu errado !')
    },
  })
}

export const  useUpdateShopping  =  () => {
 const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['client'],
    mutationFn: async ({id , data} :  {id: string, data: updateShoppingTDO}) => {
      const response = await shoppingService.update(id , data)
      return response
    },
    onSuccess: async () => {
      toast.success('Cliente criado com sucesso !', {
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