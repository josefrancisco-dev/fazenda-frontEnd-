import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
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
import type { Stock } from "@/types/typesApi"
import { ActionOption } from "@/types/enums"
import { useSelected } from "@/hooks/useSelected"
import React from "react"
import { StockSheetModal } from "../crud"

interface Props {
  data : Stock[]
}

function TableStockRow({stock, onAction} : {stock :  Stock, onAction :  (onAction :  Stock , action : ActionOption) => void}) {
  return (
    <TableRow key={stock.id}>
            <TableCell className="font-medium text-slate-700">
              {stock.product?.name}
            </TableCell>
            <TableCell className="text-slate-500">
              {stock.product?.category}
            </TableCell>
            <TableCell className="text-slate-700">
              {stock.quantity} {stock.product?.unit}
            </TableCell>
            <TableCell className="text-slate-700">
              AO {stock.product?.price.toFixed(2).replace('.', ',')}
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
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                  <DropdownMenuGroup className="cursor-pointer">
                  {Object.entries(ActionOption).map(([value, label]) => (
                    <DropdownMenuItem 
                      key={value} 
                      onClick={() => onAction(stock, label)} 
                      className="cursor-pointer">
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

export function TableStock({data :  stock} : Props) {

  const { active, close, onSelected, selected } = useSelected<Stock>()
    const [action, setAction] = React.useState<ActionOption | null>(null)
  
     const handleSelection = (stock : Stock, action: ActionOption) => {
      setAction(action)
      onSelected(stock)
    }
  
    const onClose = () => {
      close()
      setAction(null)
    }
    

  return (
    <>
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
              onAction={handleSelection}
            />
          ))}
        </TableBody>
      </Table>
    </div>

    {action && active && selected && (
    <StockSheetModal action={action} stock={selected} controls={{ open: active, close: onClose }} />
    )
    }
    </>
  )
}