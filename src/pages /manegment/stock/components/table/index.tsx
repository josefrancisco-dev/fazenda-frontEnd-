import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
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
import type { Stock } from "@/types/typesApi"

interface Props {
  data : Stock[]
}

function TableStockRow({stock} : {stock :  Stock}) {
  return (
    <TableRow key={stock.id}>
            <TableCell className="font-medium text-slate-700">
              {stock.product?.name}
            </TableCell>
            <TableCell className="text-slate-500">
              {/* {stock.categoria} */}
            </TableCell>
            <TableCell className="text-slate-700">
              {stock.quantity} {stock.product?.unit}
            </TableCell>
            <TableCell className="text-slate-700">
              {/* AO {stock.preco_Unit.toFixed(2).replace('.', ',')} */}
            </TableCell>
            <TableCell className="font-medium text-slate-800">
              AO {stock.value_Total.toFixed(2).replace('.', ',')}
            </TableCell>
            <TableCell>
            {stock.status}
              {/* <Badge className={
                stock.status
                  ? 'bg-green-100 text-green-700 hover:bg-green-100'
                  : 'bg-red-100 text-red-700 hover:bg-red-100'
              }>
                {stock.status ? 'Em Estoque' : 'Estoque Baixo'}
              </Badge> */}
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

export function TableStock({data :  stock} : Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Preço Unit.</TableHead>
            <TableHead>Valor Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stock.map((stock) => (
            < TableStockRow 
              key={stock.id}
              stock={stock}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}