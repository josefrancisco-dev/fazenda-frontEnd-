import { Card, CardContent } from '@/components/ui/card'
import { ActionOption } from '@/types/enums'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontalIcon } from 'lucide-react'
import { useSelected } from '@/hooks/useSelected'
import React from 'react'
import { CategorySheetModal} from '../crud'
import type { Category} from '@/types/typesApi'
import { usePagination } from '@/hooks/usePagination'
import { PaginationControls } from '@/app/components/pagination'

interface Props {
  data : Category[]
}

function CategoryCard({category, onAction} : {category :  Category, onAction :  (onAction :  Category , action : ActionOption) => void}) {
 
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5 space-y-4">
        <div className='flex justify-between'>
          <div>
            {/* <h3 className="font-semibold text-slate-800">{category.id}</h3> */}
            <p className="text-sm text-slate-400">{category.name}</p>
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
                      onClick={() => onAction(category, label)} 
                      className="cursor-pointer">
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

export function CategoryGrid({data : category } : Props) {

  const { active, close, onSelected, selected } = useSelected<Category>()
  const [action, setAction] = React.useState<ActionOption | null>(null)

  const {
    currentPage, 
    totalPages, 
    paginatedData,
    nextPage,
    prevPage, 
    goToPage } = usePagination({
    data: category,
    itemsPerPage: 6,
  })
  
  const handleSelection = (stock : Category, action: ActionOption) => {
    setAction(action)
    onSelected(stock)
  }
    
  const onClose = () => {
    close()
    setAction(null)
  }
      
  const hasStock = category && category.length > 0

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hasStock ?
          (paginatedData.map((item) => (
            <CategoryCard
             key={item.id} category={item} 
             onAction={handleSelection} 
             />
          ))
        )
        : (
      <p>
        Nenhuma Categoria encontrada
      </p>
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
          totalItems={category.length}
        />
      )}


      {active && selected && action && (
       <CategorySheetModal action={action} category={selected} controls={{ open: active, close: onClose }} />
      )}
    </> 
  )
}