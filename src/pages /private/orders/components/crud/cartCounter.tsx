import { Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/stores/useUserStore'

interface CartCounterProps {
  product: {
    id: string
    name: string
    emoji: string
    image?: string 
    price: number
    quantity?: number   
  }
}

export function CartCounterCard({ product }: CartCounterProps) {
  const { user } = useUserStore((state) => state); 
  const isClient = user?.role === "Client"

  const { items, addItem, removeItem } = useCart()
  const productQty = items.find((i) => i.id === product.id)?.quantity ?? 0

  if (!isClient) return null  

 if (productQty === 0) {
  return (
    <Button
      onClick={() => addItem(product)}
      disabled={product.quantity === 0}
      className="text-xs font-semibold text-white bg-yellow-500 hover:bg-yellow-600 rounded-full px-4 py-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {product.quantity === 0 ? "Esgotado" : "+ Adicionar"} 
    </Button>
  )
}
  return (
    <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-400 rounded-full px-1 py-0.5">
      <button
        onClick={() => removeItem(product.id)}
        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-yellow-100 transition-colors text-yellow-600"
      >
        {productQty === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
      </button>

      <span className="text-sm font-bold text-yellow-700 min-w-[16px] text-center">
        {productQty}
      </span>

      <button
        onClick={() => addItem(product)}
        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-yellow-100 transition-colors text-yellow-600"
      >
        <Plus size={12} />
      </button>
    </div>
  )
}

export function CartCounterRow({ product }: CartCounterProps) {
  const { items, addItem, removeItem } = useCart()
  const productQty = items.find((i) => i.id === product.id)?.quantity ?? 0

  return (
    <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden w-fit">
      <button
        onClick={() => removeItem(product.id)}
        className="px-2 py-1 text-slate-500 hover:bg-slate-100 transition-colors"
      >
        <Minus size={11} />
      </button>

      <span className="text-xs font-semibold text-slate-700 px-2 min-w-[20px] text-center border-x border-slate-200">
        {productQty}
      </span>

      <button
        onClick={() => addItem(product)}
        disabled={productQty >= (product.quantity ?? 0)} 
        className="px-2 py-1 text-slate-500 hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Plus size={11} />
      </button>
    </div>
  )
}




