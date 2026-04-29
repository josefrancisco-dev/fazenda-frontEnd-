import type { shoppingTDO } from "@/schemas/shopping"
import { shoppingService } from "@/service/shopping"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"


export const useGetAllShopping = () => {
   return useQuery({
    queryKey: ['shopping'],
    queryFn: async () => {
      const response = await shoppingService.getAll()
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

// export const  useUpdateClient  =  () => {
//  const queryClient = useQueryClient()

//   return useMutation({
//     mutationKey: ['client'],
//     mutationFn: async ({id , data} :  {id: string, data: updateClientTDO}) => {
//       const response = await clientService.update({id , data})
//       return response
//     },
//     onSuccess: async () => {
//       toast.success('Cliente criado com sucesso !', {
//         action: {
//           label: 'Fechar',
//           onClick: () => toast.dismiss(),
//         },
//       })
//       queryClient.invalidateQueries({ queryKey: ['client'] })
//     },
//     onError: () => {
//       toast.error('Alguma coisa deu errado !')
//     },
//   })
// }