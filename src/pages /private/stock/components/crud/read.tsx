import { UI_THEME } from "@/constants/thme"
import type { Stock } from "@/types/typesApi"
import {
  Package,
  BarChart3,
  Wallet,
} from "lucide-react"

type Props = {
  stock: Stock
}

export function Read({ stock }: Props) {

  const stockColor = {
    Em_Estoque: UI_THEME.success,
    Estoque_Medio: UI_THEME.warning,
    Estoque_Baixo: UI_THEME.danger,
  }[stock.status] ?? UI_THEME.neutral

  const stockLabel = {
    Em_Estoque: "Em Estoque",
    Estoque_Medio: "Estoque Médio",
    Estoque_Baixo: "Estoque Baixo",
  }[stock.status]

  return (
    <div className="px-4 py-2 space-y-4">

      {stock.product && (

        <div className={`flex items-center gap-4 p-4 ${UI_THEME.softCard}`}>

          <div className={UI_THEME.avatar}>
            {stock.product.emoji}
          </div>

          <div>
            <p className={UI_THEME.label}>
              Produto
            </p>

            <p className={UI_THEME.title}>
              {stock.product.name}
            </p>

            <p className="text-xs text-slate-500">
              {stock.product.category?.name}
            </p>
          </div>

        </div>
      )}

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
              {stock.quantity}
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
              {stockLabel}
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

          <p className="text-sm text-white uppercase tracking-wide">
            Valor Total
          </p>

        </div>

        <p className="text-xl font-bold text-white">
          {stock.value_Total.toLocaleString("pt-AO")}
          <span className="text-sm font-normal ml-1">
            AOA
          </span>
        </p>
      </div>

    </div>
  )
}