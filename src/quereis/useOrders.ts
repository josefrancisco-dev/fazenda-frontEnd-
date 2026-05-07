import type { orderResponseTDO } from "@/schemas/orders"
import { ordersService } from "@/service/orders"
import { useCart } from "@/hooks/useCart"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersService.getAll(),
  })
}

export const useCreateOrders = () => {
  const queryClient = useQueryClient()
  const { items, clearCart } = useCart()   
  return useMutation({
    mutationKey: ['orders'],
    mutationFn: () => {
      const payload: orderResponseTDO = {
        number: Date.now(),               
        date:   new Date().toISOString(),
        total:  items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        items:  items.map(item => ({
          quantity:  item.quantity,
          price:     item.price,
          productId: item.id,
        }))
      }

      return ordersService.create(payload)
    },
    onSuccess: () => {
      clearCart()                        
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      toast.success('Pedido feito com sucesso!', {
        action: { label: 'Fechar', onClick: () => toast.dismiss() }
      })
    },
    onError: (error) => {
      console.log("erro : ", error)
      toast.error('Alguma coisa deu errado!')
    },
  })
}

// export const useDeleteOrder = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (id: string) => ordersService.delete(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['orders'] })
//       toast.success('Pedido removido!')
//     },
//     onError: () => {
//       toast.error('Erro ao remover pedido!')
//     },
//   })
// }