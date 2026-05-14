import type { Shopping } from "@/types/typesApi"
import { Package, Wallet, Hash, BadgeCheck } from "lucide-react"

type Props = {
  shopping: Shopping
}

export function Read({ shopping }: Props) {
  return (
    <div className="px-4 py-2 space-y-3">
      
      <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-lg shrink-0">
          {shopping.supplier.company.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Fornecedor</p>
          <p className="text-sm font-semibold text-gray-800">{shopping.supplier.company}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <Hash size={16} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Número</p>
            <p className="text-sm font-semibold text-gray-800">#{shopping.number}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <BadgeCheck size={16} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Estado</p>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              shopping.status
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
              {shopping.status ? "Concluído" : "Pendente"}
            </span>
          </div>
        </div>
      </div>

      {/* Itens */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <Package size={16} />
          </div>
          <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Itens</p>
        </div>
        <div className="space-y-2 pl-1">
          {shopping.items.map(item => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                  {item.quantity}x
                </span>
                <span className="text-xs text-gray-500">
                  {item.price.toLocaleString("pt-AO")} AOA
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-amber-400 border border-amber-500">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/30 rounded-lg text-white">
            <Wallet size={18} />
          </div>
          <p className="text-sm font-medium text-white uppercase tracking-wide">Total</p>
        </div>
        <p className="text-lg font-bold text-white">
          {shopping.total.toLocaleString("pt-AO")} <span className="text-sm font-normal">AOA</span>
        </p>
      </div>

    </div>
  )
}