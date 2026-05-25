import { Card, CardContent } from '@/components/ui/card'
import { ActionOption } from '@/types/enums'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontalIcon } from 'lucide-react'
import { useSelected } from '@/hooks/useSelected'
import React from 'react'
import { StockSheetModal } from '../crud'
import type { Stock } from '@/types/typesApi'
import { usePagination } from '@/hooks/usePagination'
import { PaginationControls } from '@/app/components/pagination'

interface Props {
  data : Stock[]
}

function ProductCard({stock, onAction} : {stock :  Stock, onAction :  (onAction :  Stock , action : ActionOption) => void}) {
 
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5 space-y-4">
        <div className='flex justify-between'>
          <div>
            <h3 className="font-semibold text-slate-800">{stock.product?.name}</h3>
            <p className="text-sm text-slate-400">{stock.product?.category}</p>
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
        </div>
      

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-400 mb-1">Quantidade</p>
            <p className="font-bold text-slate-800">
              {stock.quantity}{' '}
              <span className="text-sm font-normal text-slate-400">{stock.product?.unit}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 mb-1">Preço</p>
            <p className="font-bold text-slate-800">
              AO {stock.product?.price.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StockGrid({data :  stock} : Props) {

  const { active, close, onSelected, selected } = useSelected<Stock>()
  const [action, setAction] = React.useState<ActionOption | null>(null)

  const {
    currentPage, 
    totalPages, 
    paginatedData,
    nextPage,
    prevPage, 
    goToPage } = usePagination({
    data: stock,
    itemsPerPage: 6,
  })
  
  const handleSelection = (stock : Stock, action: ActionOption) => {
    setAction(action)
    onSelected(stock)
  }
    
  const onClose = () => {
    close()
    setAction(null)
  }
      
  const hasStock = stock && stock.length > 0

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hasStock ?
          (paginatedData.map((item) => (
            <ProductCard
             key={item.id} stock={item} 
             onAction={handleSelection} 
             />
          ))
        )
        : (
      <p>. </p>
        )}
      
      </div>


      {hasStock && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onNext={nextPage}
          onPrev={prevPage}
          showTotalItems={true}
          totalItems={stock.length}
        />
      )}

      {action && active && selected && (
        <StockSheetModal action={action} stock={selected} controls={{ open: active, close: onClose }} />
        )
      }
    </> 
  )
}