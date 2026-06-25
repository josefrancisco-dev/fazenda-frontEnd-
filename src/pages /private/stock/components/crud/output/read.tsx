import { useFormatDate } from "@/hooks/useFormatDate"
import type { Orders } from "@/types/typesApi"
import {
  Box,
  CalendarDays,
  Wallet,
  Package,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { orderStatusSchema } from "@/schemas/orders"
import type z from "zod"
import { statusConfig } from "@/constants/statusConfig"
import { UI_THEME } from "@/constants/thme"


type OrderStatus = z.infer<typeof orderStatusSchema>

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status]

  return (
    <Badge
      variant="outline"
      className={`
        flex items-center gap-1.5
        rounded-full px-3 py-1
        ${config?.badgeClass}
      `}
    >
      <span className={`w-2 h-2 rounded-full ${config?.dotClass}`} />
      {config?.label ?? status}
    </Badge>
  )
}

type Props = {
  orders: Orders
}

export function Read({ orders}: Props) {
  const formattedDate = useFormatDate(orders.date)

  return (
    <div className="px-4 py-3 space-y-4">

      <div className={`p-4 rounded-2xl ${UI_THEME.card}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={UI_THEME.icon}>
            <Package size={18} />
          </div>
          <p className={UI_THEME.label}>Produtos</p>
        </div>

        <div className="space-y-3">
          {orders.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C8D75B]" />
                <span className="text-sm text-slate-700">
                  {item.product.name}
                </span>
              </span>

              <span className="flex items-center gap-2">
                <span className={UI_THEME.badgeQty}>
                  {item.quantity}x
                </span>
                <span className="text-xs text-slate-500">
                  {item.price.toLocaleString("pt-AO")} AOA
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">

        <div className={`flex items-center gap-3 p-4 rounded-2xl ${UI_THEME.card}`}>
          <div className={UI_THEME.icon}>
            <CalendarDays size={18} />
          </div>

          <div>
            <p className={UI_THEME.label}>Data</p>
            <p className={UI_THEME.title}>{formattedDate}</p>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-4 rounded-2xl ${UI_THEME.card}`}>
          <div className={UI_THEME.icon}>
            <Box size={18} />
          </div>

          <div>
            <p className={UI_THEME.label}>Itens</p>
            <p className={UI_THEME.title}>
              {orders.items.length} produto{orders.items.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      <div className={`flex items-center justify-between p-5 rounded-2xl text-white ${UI_THEME.moneyGradient}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/20 rounded-xl">
            <Wallet size={18} />
          </div>
          <p className="text-sm uppercase tracking-wide">Total</p>
        </div>

        <p className="text-2xl font-bold">
          {orders.total.toLocaleString("pt-AO")}
          <span className="ml-1 text-sm font-normal">AOA</span>
        </p>
      </div>
    </div>
  )
}