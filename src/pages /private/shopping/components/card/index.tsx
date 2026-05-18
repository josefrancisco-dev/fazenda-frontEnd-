import { Calendar, Package, CreditCard, MoreHorizontalIcon } from 'lucide-react'
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
import type { Shopping } from '@/types/typesApi'
import { ActionOption } from '@/types/enums'
import { useSelected } from '@/hooks/useSelected'
import React from 'react'
import { ShoopingSheetModal } from '../crud'
import { usePagination } from '@/hooks/usePagination'
import { PaginationControls } from '@/app/components/pagination'

interface Props {
  data: Shopping[]
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase()
}

function ShoppingCard({ shopping, onAction }: { shopping: Shopping, onAction: (shopping: Shopping, action: ActionOption) => void }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-semibold text-sm flex items-center justify-center shrink-0">
              {getInitials(shopping.supplier?.company)}
            </div>
            <div>
              <p className="font-semibold text-slate-800 leading-tight">{shopping.supplier?.company}</p>
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
                {Object.entries(ActionOption).map(([value, label]) => (
                  <DropdownMenuItem key={value} onClick={() => onAction(shopping, label)} className="cursor-pointer">
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center justify-between">
          <Badge className={
            shopping.status
              ? 'bg-green-100 text-green-700 hover:bg-green-100'
              : 'bg-red-100 text-red-700 hover:bg-red-100'
          }>
            {shopping.status ? 'Concluído' : 'Pendente'}
          </Badge>
        </div>
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar size={14} className="text-slate-400 shrink-0" />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Package size={14} className="text-slate-400 shrink-0" />
            <span>{shopping.items.reduce((sum, i) => sum + i.quantity, 0)} itens</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CreditCard size={14} className="text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">
              AO {shopping.total.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ShoppingGrid({ data: shopping = [] }: Props) {
  const { active, close, onSelected, selected } = useSelected<Shopping>()
  const [action, setAction] = React.useState<ActionOption | null>(null)

  const { currentPage, totalPages, paginatedData, nextPage, prevPage, goToPage } = usePagination({
    data: shopping,
    itemsPerPage: 6,
  })

  const handleSelection = (shopping: Shopping, action: ActionOption) => {
    setAction(action)
    onSelected(shopping)
  }

  const onClose = () => {
    close()
    setAction(null)
  }

  const hasShopping = shopping.length > 0

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hasShopping ? (
          paginatedData.map((item) => (
            <ShoppingCard key={item.id} shopping={item} onAction={handleSelection} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-slate-500">
            Nenhuma compra encontrada
          </div>
        )}
      </div>

      {hasShopping && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onNext={nextPage}
          onPrev={prevPage}
          showTotalItems={true}
          totalItems={shopping.length}
        />
      )}

      {active && selected && action && (
        <ShoopingSheetModal action={action} shopping={selected} controls={{ open: active, close: onClose }} />
      )}
    </>
  )
}