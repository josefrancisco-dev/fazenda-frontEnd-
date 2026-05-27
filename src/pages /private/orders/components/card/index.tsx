import { ShoppingCart, Calendar, Package, CreditCard, MoreHorizontalIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Orders } from '@/types/typesApi'
import { useFormatDate } from '@/hooks/useFormatDate'
import { ActionOptionView } from '@/types/enums'
import { useSelected } from '@/hooks/useSelected'
import React from 'react'
import { OrdersSheetModal } from '../crud'
import { usePagination } from '@/hooks/usePagination'
import { PaginationControls } from '@/app/components/pagination'
import { statusConfig } from '@/constants/statusConfig'

interface Props {
  data: Orders[]
}

function OrderCard({ orders, onAction }: { orders: Orders, onAction: (orders: Orders, action: ActionOptionView) => void }) {
  const formattedDate = useFormatDate(orders.date)
  const config = statusConfig[orders.status]

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
              <p className="font-semibold text-slate-800 leading-tight">{orders.client?.name}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontalIcon />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup className="cursor-pointer">
                {Object.entries(ActionOptionView).map(([value, label]) => (
                  <DropdownMenuItem
                    key={value}
                    onClick={() => onAction(orders, label)}
                    className="cursor-pointer"
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className={config?.badgeClass}
          >
            {config?.label ?? orders.status}
          </Badge>
        </div>

        <div className="space-y-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar size={14} className="text-slate-400 shrink-0" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Package size={14} className="text-slate-400 shrink-0" />
            <span>{orders.items.length} itens</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CreditCard size={14} className="text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">
              AO {orders.total.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

export function OrdersGrid({ data: orders = [] }: Props) {
  const { active, close, onSelected, selected } = useSelected<Orders>()
  const [action, setAction] = React.useState<ActionOptionView | null>(null)

  const {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination({
    data: orders,
    itemsPerPage: 6,
  })

  const handleSelection = (orders: Orders, action: ActionOptionView) => {
    setAction(action)
    onSelected(orders)
  }

  const onClose = () => {
    close()
    setAction(null)
  }

  const hasOrders = orders.length > 0

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hasOrders ? (
          paginatedData.map((order) => (
            <OrderCard
              key={order.id}
              orders={order}
              onAction={handleSelection}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-8 text-slate-500">
            Nenhum pedido encontrado
          </div>
        )}
      </div>

      {hasOrders && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onNext={nextPage}
          onPrev={prevPage}
          showTotalItems={true}
          totalItems={orders.length}
        />
      )}

      {active && selected && action && (
        <OrdersSheetModal
          action={action}
          orders={selected}
          controls={{ open: active, close: onClose }}
        />
      )}
    </>
  )
}