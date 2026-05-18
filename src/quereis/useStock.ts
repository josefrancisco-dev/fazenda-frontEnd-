import type { CreateStockRequest} from "@/schemas/stock"
import { stockService } from "@/service/stock"
import type { GetParams } from "@/types/typesApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"


export const useGetAllStock  = (params?:GetParams) => {
   return useQuery ({
     queryKey:  ['stock', params],
     queryFn :  async () => {
        const response = await stockService.getAll(params)
        return response
     },
   }) 

}

export const useCreateStock  = () => {

   const queryClient = useQueryClient()

    return useMutation ({
        mutationKey : ['stock'],
        mutationFn : async (data : CreateStockRequest) => {
          const response = await stockService.create(data)
          return response
        }, 
        onSuccess: async () => {
      toast.success('Product criado com sucesso !', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
      queryClient.invalidateQueries({ queryKey: ['stock'] })
    },
    onError: () => {
      toast.error('Alguma coisa deu errado !')
    },
    })
}