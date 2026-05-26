import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PERMISSION } from "@/constants/constants"
import { useSelected } from "@/hooks/useSelected"
import { CartCounterRow } from "@/pages /private/orders/components/crud/cartCounter"
import { useUserStore } from "@/stores/useUserStore"
import { ActionOption } from "@/types/enums"
import type { Product } from "@/types/typesApi"
import { MoreHorizontalIcon } from "lucide-react"
import React from "react"
import { ProductSheetModal } from "../crud"
import { usePagination } from "@/hooks/usePagination"
import { PaginationControls } from "@/app/components/pagination"


interface Props {
  data : Product[]
}

const stockConfig: Record<Product['stock'], { badge: string }> = {
  'Em Estoque':    { badge: 'bg-green-100 text-green-700 hover:bg-green-100'    },
  'Estoque Médio': { badge: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' },
  'Estoque Baixo': { badge: 'bg-red-100 text-red-700 hover:bg-red-100'          },
}


function TableProductRow({product, onAction}  : {product :  Product, onAction: (onAction: Product, action: ActionOption) => void }) {
    const { user } = useUserStore((state) => state)
    const isAdmin = user?.role === PERMISSION.Admin

return(
<TableRow key={product.id}>
        <TableCell className="font-medium text-slate-700">
          <div className="flex items-center gap-2">
            {product.image ? (
              <img
                src={product.image} 
                alt={product.name}
                className="w-8 h-8 object-cover rounded-md flex-shrink-0"
              />
            ) : (
              <span className="text-xl">{product.emoji || '📦'}</span>
            )}
            {product.name}
          </div>
        </TableCell>
        <TableCell className="text-slate-500">
          {product.category?.name}
        </TableCell>
       <TableCell className="text-slate-700">
          {product.quantity || <span>0</span>}
        </TableCell>
        <TableCell className="text-slate-500">
          {product.unit}
        </TableCell>
        <TableCell className="font-medium text-slate-800">
          AO {product.price.toFixed(2).replace('.', ',')}
        </TableCell>
        <TableCell>
         <Badge className={stockConfig[product.stock]?.badge ?? 'bg-gray-100 text-gray-700'}>
          {product.stock || <span className="text-red-500 text-xs">Sem stock</span>}
        </Badge>
        </TableCell>
        {isAdmin ?  (
         <TableCell className="text-center">  
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
                      onClick={() => onAction(product, label)} 
                      className="cursor-pointer">
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
          </DropdownMenu>
          </TableCell>  
          ) :  (
          <TableCell> 
            <div className="flex items-center justify-center">
                <CartCounterRow product={{
                  id:    product.id,
                  name:  product.name,
                  emoji: product.emoji,
                  price: product.price,
                }} />
            </div>
           </TableCell> 
          )}
    </TableRow>
  )
}

export function TableProducts({data :  product}: Props) {
  
    const { active, close, onSelected, selected } = useSelected<Product>()
    const [action, setAction] = React.useState<ActionOption | null>(null)

    const { 
        currentPage, 
        totalPages, 
        paginatedData,
          nextPage,
          prevPage, 
          goToPage } = usePagination({
          data: product,
          itemsPerPage: 10,
        })
  
     const handleSelection = (product : Product, action: ActionOption) => {
      setAction(action)
      onSelected(product)
    }
  
    const onClose = () => {
      close()
      setAction(null)
    }

  const hasProduct = product && product.length > 0

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody> 
            {hasProduct ? (
              paginatedData.map((product) => (
                <TableProductRow 
                  key={product.id}
                  product={product}
                  onAction={handleSelection}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-slate-500 py-8">
                  Nenhum produto encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

        {hasProduct && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            onNext={nextPage}
            onPrev={prevPage}
            showTotalItems={true}
            totalItems={product.length}
          />
        )}

        {active && selected && action && (
          <ProductSheetModal action={action} product={selected} controls={{ open: active, close: onClose }} />
        )}
    </>
  )
}