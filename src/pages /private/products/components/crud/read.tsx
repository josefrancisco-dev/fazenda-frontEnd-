import { UI_THEME } from "@/constants/thme"
import type { Product } from "@/types/typesApi"
import {
  Tag,
  Ruler,
  Wallet,
  Package,
  BarChart3,
} from "lucide-react"

type Props = {
  product: Product
}

export function Read({ product }: Props) {

  const stockColor = {
    "Em Estoque": UI_THEME.success,
    "Estoque Médio": UI_THEME.warning,
    "Estoque Baixo": UI_THEME.danger,
  }[product.stock] ?? UI_THEME.neutral

  return (
    <div className="px-4 py-2 space-y-4">

      <div className={`flex items-center gap-4 p-4 ${UI_THEME.softCard}`}>

        <div
          className={`${UI_THEME.avatar} relative overflow-hidden`}
        >
          {product.image ? (
            <img
              src={product.image}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="text-2xl">
              {product.emoji}
            </div>
          )}
        </div>

        <div>
          <p className={UI_THEME.label}>
            Produto
          </p>

          <p className={UI_THEME.title}>
            {product.name}
          </p>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-3">

        <div className={`flex items-center gap-3 p-4 ${UI_THEME.card}`}>
          <div className={UI_THEME.icon}>
            <Tag size={16} />
          </div>

          <div>
            <p className={UI_THEME.label}>
              Categoria
            </p>

            <p className={UI_THEME.title}>
              {product.category?.name}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-4 ${UI_THEME.card}`}>
          <div className={UI_THEME.icon}>
            <Ruler size={16} />
          </div>

          <div>
            <p className={UI_THEME.label}>
              Unidade
            </p>

            <p className={UI_THEME.title}>
              {product.unit}
            </p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-3">

        <div className={`flex items-center gap-3 p-4 ${UI_THEME.card}`}>
          <div className={UI_THEME.icon}>
            <Package size={16} />
          </div>

          <div>
            <p className={UI_THEME.label}>
              Quantidade
            </p>

            <p className={UI_THEME.title}>
              {product.quantity}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-4 ${UI_THEME.card}`}>
          <div className={UI_THEME.icon}>
            <BarChart3 size={16} />
          </div>

          <div>
            <p className={UI_THEME.label}>
              Estado
            </p>

            <span
              className={`text-xs font-bold px-2 py-1 rounded-full ${stockColor}`}
            >
              {product.stock}
            </span>
          </div>
        </div>

      </div>

      <div
        className={`flex items-center justify-between p-5 ${UI_THEME.total}`}
      >
        <div className="flex items-center gap-3">

          <div className="p-2 bg-white/20 rounded-xl text-white">
            <Wallet size={18} />
          </div>

          <p className="text-sm font-medium text-white uppercase tracking-wide">
            Preço
          </p>

        </div>

        <p className="text-xl font-bold text-white">
          {product.price.toLocaleString("pt-AO")}
          <span className="text-sm font-normal ml-1">
            AOA
          </span>
        </p>
      </div>

    </div>
  )
}