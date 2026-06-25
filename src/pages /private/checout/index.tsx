import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useCheckout } from '@/quereis/useChecout'

export function CheckoutPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { mutate, isPending, isError } = useCheckout()

  useEffect(() => {
    if (id) {
      mutate(id)
    }
  }, [id, mutate])

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
        <p className="text-slate-600">Redirecionando para o pagamento...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-red-500">Erro ao processar pagamento</p>
        <button 
          onClick={() => navigate('/carrinho')}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Voltar ao carrinho
        </button>
      </div>
    )
  }

  return null
}