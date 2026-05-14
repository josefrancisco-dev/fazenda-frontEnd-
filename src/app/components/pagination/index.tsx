import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onNext: () => void
  onPrev: () => void
  showTotalItems?: boolean
  totalItems?: number
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
  showTotalItems = false,
  totalItems = 0,
}: PaginationControlsProps) {

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
      {showTotalItems && (
        <span className="text-sm text-slate-500 order-2 sm:order-1">
          {totalItems} {totalItems === 1 ? 'item' : 'itens'} no total
        </span>
      )}

      <div className="flex items-center gap-1 order-1 sm:order-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={onPrev}
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Anterior</span>
        </Button>

        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-slate-400 select-none"
              >
                ...
              </span>
            )
          }

          const pageNumber = page as number
          
          return (
            <Button
              key={pageNumber}
              size="sm"
              variant={currentPage === pageNumber ? "default" : "outline"}
              className={`min-w-[36px] ${
                currentPage === pageNumber
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "hover:bg-slate-100"
              }`}
              onClick={() => onPageChange(pageNumber)}
              aria-label={`Ir para página ${pageNumber}`}
              aria-current={currentPage === pageNumber ? "page" : undefined}
            >
              {pageNumber}
            </Button>
          )
        })}

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={onNext}
          aria-label="Próxima página"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Próxima</span>
        </Button>
      </div>
    </div>
  )
}