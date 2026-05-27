import type { Product } from "@/types/typesApi"
import { Tag, Ruler, Wallet, Package, BarChart3 } from "lucide-react"

type Props = {
  product: Product
}

export function Read({ product }: Props) {
  const stockColor = {
    'Em Estoque':    'bg-green-100 text-green-700',
    'Estoque Médio': 'bg-yellow-100 text-yellow-700',
    'Estoque Baixo': 'bg-red-100 text-red-700',
  }[product.stock] ?? 'bg-gray-100 text-gray-600'

  return (
    <div className="px-4 py-2 space-y-3">

      {/* Imagem + Nome + Emoji */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
      <div className="w-12 h-12 rounded-full bg-amber-400 relative overflow-hidden shrink-0">
        {product.image ? (
          <img
            src={product.image}
            className="w-full h-full object-cover absolute inset-0"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">
            {product.emoji}
          </div>
        )}
      </div>
      <div>
          <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Produto</p>
          <p className="text-sm font-semibold text-gray-800">{product.name}</p>
        </div>
      </div>

      {/* Categoria + Unidade */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <Tag size={16} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Categoria</p>
            <p className="text-sm font-semibold text-gray-800">{product.category?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <Ruler size={16} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Unidade</p>
            <p className="text-sm font-semibold text-gray-800">{product.unit}</p>
          </div>
        </div>
      </div>

      {/* Quantidade + Stock status */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <Package size={16} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Quantidade</p>
            <p className="text-sm font-semibold text-gray-800">{product.quantity}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <BarChart3 size={16} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Estado</p>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stockColor}`}>
              {product.stock}
            </span>
          </div>
        </div>
      </div>

      {/* Preço */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-amber-400 border border-amber-500">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/30 rounded-lg text-white">
            <Wallet size={18} />
          </div>
          <p className="text-sm font-medium text-white uppercase tracking-wide">Preço</p>
        </div>
        <p className="text-lg font-bold text-white">
          {product.price.toLocaleString("pt-AO")} <span className="text-sm font-normal">AOA</span>
        </p>
      </div>

    </div>
  )
}