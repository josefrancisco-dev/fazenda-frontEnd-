import type { clientSchemaTDO} from "@/schemas/client"
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
    mutationFn: async (data: clientSchemaTDO) => {
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