import type { clientSchemaTDO, updateClientTDO} from "@/schemas/client"
import { clientService } from "@/service/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const CLIENT_KEY = ['client'] as const

export const useGetAllClient = () => {
   return useQuery({
    queryKey: CLIENT_KEY,
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
    mutationKey: CLIENT_KEY,
    mutationFn: async ({id , data} :  {id: string, data: updateClientTDO}) => {
      const response = await clientService.update(id , data)
      return response
    },
    onSuccess: async () => {
      toast.success('Cliente actualizado com sucesso !', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
      queryClient.invalidateQueries({ queryKey: CLIENT_KEY})
    },
    onError: () => {
      toast.error('Alguma coisa deu errado ao actualizar cliente !')
    },
  })
}

export const useUpdateClientPartial = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: CLIENT_KEY,
    mutationFn: async ({ id, data }: { id: string; data: updateClientTDO }) => {
      await clientService.patch(id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENT_KEY })
      toast.success('Cliente actualizado com sucesso!', {
        action: { label: 'Fechar', onClick: () => toast.dismiss() },
      })
    },
    onError: () => {
      toast.error('Erro ao actualizar cliente.')
    },
  })
}