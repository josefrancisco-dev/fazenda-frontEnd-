import type { clientSchemaTDO, updateClientTDO} from "@/schemas/client"
import { clientService } from "@/service/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"


export const useGetAllClient = () => {
   return useQuery({
    queryKey: ['client'],
    queryFn: async () => {
      const response = await clientService.getAll()
      return response
    },
   })
}
  
export const  useCreateClient  =  () => {
 const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['client'],
    mutationFn: async (data: clientSchemaTDO) => {
      const response = await clientService.create(data)
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

export const  useUpdateClient  =  () => {
 const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['client'],
    mutationFn: async ({id , data} :  {id: string, data: updateClientTDO}) => {
      const response = await clientService.update(id , data)
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