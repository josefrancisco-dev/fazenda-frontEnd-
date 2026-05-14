
import { useMutation } from '@tanstack/react-query'
import { api } from '@/api'
import { toast } from 'sonner'

export function useCheckout() {
  return useMutation({
    mutationFn: async (orderId: string) => {
      const response = await api.post(`/orders/${orderId}/checkout`)
      return response.data
    },
    onSuccess: (data) => {
      window.location.href = data.checkoutUrl
    },
    onError: (error) => {
      console.error('Erro no checkout:', error)
      toast.error('Erro ao processar pagamento. Tente novamente!')
    }
  })
}