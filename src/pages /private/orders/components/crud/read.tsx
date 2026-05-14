import { useFormatDate } from "@/hooks/useFormatDate"
import type { Orders } from "@/types/typesApi"
import { Box, CalendarDays, User, Wallet, Package } from "lucide-react"

type Props = {
  orders: Orders
}

export function Read({ orders }: Props) {
  const formattedDate = useFormatDate(orders.date)

  return (
    <div className="px-4 py-2 space-y-3">

      {/* Cliente */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <div className="p-2 bg-amber-400 rounded-lg text-white">
          <User size={18} />
        </div>
        <div>
          <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Cliente</p>
          <p className="text-sm font-semibold text-gray-800">{orders.client.name}</p>
        </div>
      </div>

      {/* Produtos */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-amber-400 rounded-lg text-white">
            <Package size={18} />
          </div>
          <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Produtos</p>
        </div>
        <div className="space-y-2 pl-1">
          {orders.items.map(item => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                <span className="text-sm text-gray-700">{item.product.name}</span>
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

      {/* Data + Quantidade lado a lado */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white">
            <CalendarDays size={18} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Data</p>
            <p className="text-sm font-semibold text-gray-800">{formattedDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white">
            <Box size={18} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Itens</p>
            <p className="text-sm font-semibold text-gray-800">{orders.items.length} produto{orders.items.length !== 1 ? "s" : ""}</p>
          </div>
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
          {orders.total.toLocaleString("pt-AO")} <span className="text-sm font-normal">AOA</span>
        </p>
      </div>

    </div>
  )
}