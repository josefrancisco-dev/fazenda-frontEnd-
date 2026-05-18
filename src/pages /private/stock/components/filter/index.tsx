import { Filter} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ExportDropdownStock } from '../export/export'
import { SearchComponent } from '@/app/components/search'

interface FilterBarProps {
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  onFilter?: () => void
  onExport?: () => void
}

export function FilterBar({
  onFilter,
}: FilterBarProps) {
  return (
    <div className="flex items-center justify-between gap-3 w-full">
     
      <SearchComponent />

      <div className='space-x-2'>
        <Button variant="outline" onClick={onFilter} className="gap-2">
            <Filter size={16} />
            Filtrar
        </Button>

        <ExportDropdownStock />
      </div>
    </div>
  )
}