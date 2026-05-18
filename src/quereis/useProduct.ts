import type { ProductTDO } from "@/schemas/product"
import { productService } from "@/service/product"
import type { GetParams } from "@/types/typesApi"
// import type { GetParams } from "@/types/typesApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"


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