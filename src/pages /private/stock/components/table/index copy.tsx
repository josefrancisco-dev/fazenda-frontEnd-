import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"
import type { Orders } from "@/types/typesApi"
import { useFormatDate } from "@/hooks/useFormatDate"
import { ActionOptionView } from "@/types/enums"
import { useSelected } from "@/hooks/useSelected"
import React from "react"
import { usePagination } from "@/hooks/usePagination"
import { PaginationControls } from "@/app/components/pagination"
import { OrdersSheetModal } from "../crud/output"


interface Props {
  order: Orders[]
}


function TableOrderRow({
  orders,
  onAction,
}: {
  orders: Orders
  onAction: (orders: Orders, action: ActionOptionView) => void
}) {
  const formattedDate = useFormatDate(orders.date)
  const totalItens = orders.items.reduce((total , item) => {
    return total + item.quantity;
  }, 0)

  return (
    <TableRow key={orders.id}>
      <TableCell className="font-medium">{orders.items[0].product?.name}</TableCell>
      <TableCell>{orders.items[0].product.category?.name}</TableCell>
      <TableCell>{totalItens}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
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
      </TableCell>
    </TableRow>
  )
}


export function TableStockOutput({ order: orders }: Props) {
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
    itemsPerPage: 10,
  })

  const handleSelection = (orders: Orders, action: ActionOptionView) => {
    setAction(action)
    onSelected(orders)
  }

  const onClose = () => {
    close()
    setAction(null)
  }

  const hasOrders = orders && orders.length > 0

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {hasOrders ? (
              paginatedData.map((order) => (
                <TableOrderRow
                  key={order.id}
                  orders={order}
                  onAction={handleSelection}
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-slate-500"
                >
                  Nenhuma de Estoque encontrada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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