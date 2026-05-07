import { api } from "@/api"
import { useMutation } from "@tanstack/react-query"

export function useCheckout() {
  return useMutation({
    mutationFn: async (orderId: string) => {
      const { data } = await api.post("/payments/checkout", { orderId })
      return data as { url: string }
    },
    onSuccess: ({ url }) => {
      window.location.href = url 
    },
    onError: () => {
      alert("Erro ao processar pagamento!")
    }
  })
}