import { UI_THEME } from "@/constants/thme"
import type { Shopping } from "@/types/typesApi"
import {
  Package,
  Wallet,
  Hash,
  BadgeCheck,
} from "lucide-react"

type Props = {
  shopping: Shopping
}

export function Read({ shopping }: Props) {

  const statusColor = shopping.status
    ? UI_THEME.success
    : UI_THEME.danger

  return (
    <div className="px-4 py-2 space-y-4">

      <div className={`flex items-center gap-4 p-4 ${UI_THEME.softCard}`}>

        <div className={UI_THEME.avatar}>
          {shopping.supplier.company.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className={UI_THEME.label}>
            Fornecedor
          </p>

          <p className={UI_THEME.title}>
            {shopping.supplier.company}
          </p>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-3">

        <div className={`flex items-center gap-3 p-4 ${UI_THEME.card}`}>
          <div className={UI_THEME.icon}>
            <Hash size={16} />
          </div>

          <div>
            <p className={UI_THEME.label}>
              Número
            </p>

            <p className={UI_THEME.title}>
              #{shopping.number}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-4 ${UI_THEME.card}`}>
          <div className={UI_THEME.icon}>
            <BadgeCheck size={16} />
          </div>

          <div>
            <p className={UI_THEME.label}>
              Estado
            </p>

            <span
              className={`text-xs font-bold px-2 py-1 rounded-full ${statusColor}`}
            >
              {shopping.status
                ? "Concluído"
                : "Pendente"}
            </span>
          </div>
        </div>

      </div>

      <div className={`p-4 ${UI_THEME.card}`}>

        <div className="flex items-center gap-3 mb-4">
          <div className={UI_THEME.icon}>
            <Package size={16} />
          </div>

          <p className={UI_THEME.label}>
            Itens da Compra
          </p>
        </div>

        <div className="space-y-3">

          {shopping.items.map((item) => (
            <div
              key={item.id}
              className="
                flex
                items-center
                justify-between
                py-2
                border-b
                border-slate-100
                last:border-none
              "
            >
              <div className="flex items-center gap-2">

                <span
                  className="
                  w-2
                  h-2
                  rounded-full
                  bg-[#C8D75B]
                  "
                />

                <span className="text-sm text-slate-700">
                  {item.name}
                </span>

              </div>

              <div className="flex items-center gap-2">

                <span className={UI_THEME.quantity}>
                  {item.quantity}x
                </span>

                <span className="text-xs text-slate-500">
                  {item.price.toLocaleString("pt-AO")} AOA
                </span>

              </div>
            </div>
          ))}

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
            Total
          </p>

        </div>

        <p className="text-xl font-bold text-white">
          {shopping.total.toLocaleString("pt-AO")}
          <span className="text-sm font-normal ml-1">
            AOA
          </span>
        </p>
      </div>

    </div>
  )
}