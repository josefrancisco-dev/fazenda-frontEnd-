import { MoreHorizontal, ShoppingCart, Calendar, Package, CreditCard } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Orders } from '@/types/typesApi'
import { useFormatDate } from '@/hooks/useFormatDate'
import { useUserStore } from '@/stores/useUserStore'
import { PERMISSION } from '@/constants/permitions'

interface Props {
  data :  Orders[]
}

function OrderCard({ order }: { order: Orders }) {

  const { user } = useUserStore((state) => state)
  const isClient = user?.role === PERMISSION.Client
  const formattedDate = useFormatDate(order.date)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5 space-y-4">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
              <ShoppingCart size={18} className="text-yellow-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 leading-tight">{order.client?.name}</p>
              {/* <p className="text-sm text-slate-400">#{order.number}</p> */}
            </div>
          </div>
          {isClient  ?  (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 text-slate-400">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          ) :  (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 text-slate-400">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Remover</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          )}
        </div>

        {/* Status + Date */}
        <div className="flex items-center justify-between">
          <Badge className={
            order.status
              ? 'bg-green-100 text-green-700 hover:bg-green-100'
              : 'bg-red-100 text-red-700 hover:bg-red-100'
          }>
            {order.status ? 'Concluído' : 'Pendente'}
          </Badge>
        </div>

        {/* Info */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar size={14} className="text-slate-400 shrink-0" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Package size={14} className="text-slate-400 shrink-0" />
            <span>{order.items.length} itens</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CreditCard size={14} className="text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">
              AO {order.total.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

export function OrdersGrid({data : orders } :  Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}