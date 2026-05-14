import type { Stock } from "@/types/typesApi"
import { Package, BarChart3, Wallet} from "lucide-react"

type Props = {
  stock: Stock
}

export function Read({ stock }: Props) {
  const stockColor = {
    'Em_Estoque':    'bg-green-100 text-green-700',
    'Estoque_Medio': 'bg-yellow-100 text-yellow-700',
    'Estoque_Baixo': 'bg-red-100 text-red-700',
  }[stock.status] ?? 'bg-gray-100 text-gray-600'

  const stockLabel = {
    'Em_Estoque':    'Em Estoque',
    'Estoque_Medio': 'Estoque Médio',
    'Estoque_Baixo': 'Estoque Baixo',
  }[stock.status]

  return (
    <div className="px-4 py-2 space-y-3">

      {/* Produto */}
      {stock.product && (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-2xl shrink-0">
            {stock.product.emoji}
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Produto</p>
            <p className="text-sm font-semibold text-gray-800">{stock.product.name}</p>
            <p className="text-xs text-gray-500">{stock.product.category}</p>
          </div>
        </div>
      )}

      {/* Quantidade + Estado */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <Package size={16} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Quantidade</p>
            <p className="text-sm font-semibold text-gray-800">{stock.quantity}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <BarChart3 size={16} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Estado</p>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stockColor}`}>
              {stockLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Valor Total */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-amber-400 border border-amber-500">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/30 rounded-lg text-white">
            <Wallet size={18} />
          </div>
          <p className="text-sm font-medium text-white uppercase tracking-wide">Valor Total</p>
        </div>
        <p className="text-lg font-bold text-white">
          {stock.value_Total.toLocaleString("pt-AO")} <span className="text-sm font-normal">AOA</span>
        </p>
      </div>

    </div>
  )
}