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
import { useSelected } from "@/hooks/useSelected"
import { ActionOption } from "@/types/enums"
import type { Category} from "@/types/typesApi"
import { MoreHorizontalIcon } from "lucide-react"
import React from "react"
import { CategorySheetModal} from "../crud"
import { usePagination } from "@/hooks/usePagination"
import { PaginationControls } from "@/app/components/pagination"


interface Props {
  data : Category[]
}

function TableCategoryRow({category, onAction}  : {category :  Category, onAction: (onAction: Category, action: ActionOption) => void }) {

return(
<TableRow key={category.id}>
        <TableCell className="text-slate-500">
          {category.id}
        </TableCell>
       <TableCell className="text-slate-700">
          {category.name}
        </TableCell>
      
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
                      onClick={() => onAction(category, label)} 
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

export function TableProducts({data :  category}: Props) {
  
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
          itemsPerPage: 10,
        })
  
     const handleSelection = (category : Category, action: ActionOption) => {
      setAction(action)
      onSelected(category)
    }
  
    const onClose = () => {
      close()
      setAction(null)
    }

  const hasProduct = category && category.length > 0

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody> 
            {hasProduct ? (
              paginatedData.map((category) => (
                <TableCategoryRow 
                  key={category.id}
                  category={category}
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
            totalItems={category.length}
          />
        )}

        {active && selected && action && (
          <CategorySheetModal action={action} category={selected} controls={{ open: active, close: onClose }} />
        )}
    </>
  )
}