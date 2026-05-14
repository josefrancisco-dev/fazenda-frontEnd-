import type { orderResponseTDO } from "@/schemas/orders"
import { ordersService } from "@/service/orders"
import { useCart } from "@/hooks/useCart"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

import { useUserStore } from "@/stores/useUserStore"

export const useGetAllOrders = () => {
  
  const {user } = useUserStore((state) => state);

    return useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () =>  {
      const orders = await ordersService.getAll()
      if (user?.role === 'Admin') return orders  
      return orders.filter(order => order.clientId === user?.id)
    },
     enabled: !!user,
  })
}

export const useCreateOrders = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { items, clearCart } = useCart()   
  return useMutation({
    mutationKey: ['orders'],
    mutationFn: async () => {
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

      const response = await ordersService.create(payload) 
      return response.data
    },
    onSuccess: (data) => {
      clearCart()                        
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      toast.success('Pedido feito com sucesso!', {
        action: { label: 'Fechar', onClick: () => toast.dismiss() }
      })
     navigate(`/checkout/${data.id}`) 
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