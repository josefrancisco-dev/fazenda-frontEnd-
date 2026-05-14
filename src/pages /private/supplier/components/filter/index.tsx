import { Search, Filter} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ExportDropdownSuppliers } from '../export/export'

interface FilterBarProps {
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  onFilter?: () => void
  onExport?: () => void
}

export function FilterBar({
  searchPlaceholder = 'Pesquisar...',
  onSearch,
  onFilter,
}: FilterBarProps) {
  return (
    <div className="flex items-center justify-between gap-3 w-full">
      {/* Search */}
     <div className="flex items-center gap-2">
       <div className="flex-1">
        <Input
          placeholder={searchPlaceholder}
          className="pl-9 py-4 w-96"
          onChange={(e) => onSearch?.(e.target.value)}
        />
       </div>
        <Button variant="outline">
            <Search size={16} />
            Pesquisar
        </Button>
     </div>
     

      <div className='space-x-2'>
        <Button variant="outline" onClick={onFilter} className="gap-2">
            <Filter size={16} />
            Filtrar
        </Button>

        <ExportDropdownSuppliers/>
      </div>
    </div>
  )
}