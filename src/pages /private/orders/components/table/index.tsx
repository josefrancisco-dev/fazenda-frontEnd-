import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { OrdersSheetModal } from "../crud"
import { usePagination } from "@/hooks/usePagination"
import { PaginationControls } from "@/app/components/pagination"

interface Props {
  data: Orders[]
}

function TableProductRow({
  orders,
  onAction,
}: {
  orders: Orders
  onAction: (orders: Orders, action: ActionOptionView) => void
}) {
  const formattedDate = useFormatDate(orders.date)

  return (
    <TableRow key={orders.id}>
      <TableCell className="font-medium">{orders.client?.name}</TableCell>
      <TableCell>{orders.items.length} itens</TableCell>
      <TableCell>
        <Badge
          variant="secondary"
          className={
            orders.status
              ? "bg-green-100 text-green-700 hover:bg-green-100"
              : "bg-red-100 text-red-700 hover:bg-red-100"
          }
        >
          {orders.status ? "Concluído" : "Pendente"}
        </Badge>
      </TableCell>
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

export function TableProducts({ data: orders }: Props) {
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
              <TableHead>Cliente</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Data de Solicitação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {hasOrders ? (
              paginatedData.map((order) => (
                <TableProductRow
                  key={order.id}
                  orders={order}
                  onAction={handleSelection}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                  Nenhum pedido encontrado
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