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
import type { Shopping } from "@/types/typesApi"
import { ActionOption } from "@/types/enums"
import { useSelected } from "@/hooks/useSelected"
import React from "react"
import { ShoopingSheetModal } from "../crud"
import { usePagination } from "@/hooks/usePagination"
import { PaginationControls } from "@/app/components/pagination"

interface Props {
  data :  Shopping[]
}

function Row({shopping, onAction} :  {shopping : Shopping, onAction: (onAction: Shopping, action: ActionOption) => void} ) {
  return (
     <TableRow key={shopping.id}>
      <TableCell className="text-slate-700">
        {shopping.supplier?.company}
      </TableCell>
      <TableCell className="text-slate-700">
        {shopping.items.reduce((sum, i) => sum + i.quantity, 0)} itens
      </TableCell>
      <TableCell className="font-medium text-slate-800">
        AO {shopping.total.toFixed(2).replace('.', ',')}
      </TableCell>
      <TableCell>
        <Badge className={
          shopping.status
            ? 'bg-green-100 text-green-700 hover:bg-green-100'
            : 'bg-red-100 text-red-700 hover:bg-red-100'
        }>
          {shopping.status ? 'Concluído' : 'Pendente'}
        </Badge>
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
                    onClick={() => onAction(shopping, label)} 
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

export function TableShopping({data : shopping } :  Props) {


  const { active, close, onSelected, selected } = useSelected<Shopping>()
    const [action, setAction] = React.useState<ActionOption | null>(null)

    const {
       currentPage, 
      totalPages, 
      paginatedData,
       nextPage,
       prevPage, 
       goToPage } = usePagination({
        data: shopping,
        itemsPerPage: 10,
    })
    
  
     const handleSelection = (shopping : Shopping, action: ActionOption) => {
      setAction(action)
      onSelected(shopping)
    }
  
    const onClose = () => {
      close()
      setAction(null)
    }
    

    const hasShopping = shopping && shopping.length > 0

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fornecedor</TableHead>
              {/* <TableHead>Data</TableHead> */}
              <TableHead>Itens</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          {hasShopping ? (
          <TableBody>
            {paginatedData.map((shopping) => (
              <Row 
                key={shopping.id}
                shopping={shopping}
                onAction={handleSelection}
              />
            ))}
          </TableBody>
          ) :  (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-slate-500">
              Nenhuma compra encontrada
            </TableCell>
          </TableRow>

          )}
        </Table>  
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