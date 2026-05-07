import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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

interface Props {
  data :  Orders[]
}

function TableProductRow({orders} :  {orders  : Orders}) {

  const formattedDate = useFormatDate(orders.date)

  return (
  <TableRow key={orders.id}>
      <TableCell className="text-slate-700">
        {orders.client?.name}
      </TableCell>
      <TableCell className="text-slate-700">
        {orders.items.length} itens
      </TableCell>
      <TableCell>
        <Badge className={
          orders.status
            ? 'bg-green-100 text-green-700 hover:bg-green-100'
            : 'bg-red-100 text-red-700 hover:bg-red-100'
        }>
          {orders.status ? 'Concluído' : 'Pendente'}
        </Badge>
      </TableCell>
       <TableCell className="text-slate-700">
        {formattedDate} 
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontalIcon />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
  </TableRow>
)
}

export function TableProducts({data :  orders} : Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Itens</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Data de Selicitação</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((orders) => (
            <TableProductRow
             key={orders.id}
             orders={orders}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}