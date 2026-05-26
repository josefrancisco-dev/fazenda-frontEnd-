import type { Category } from "@/types/typesApi"
import { Tag, Ruler} from "lucide-react"

type Props = {
  category : Category
}

export function Read({ category }: Props) { 

  return (
    <div className="px-4 py-2 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <Tag size={16} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">ID</p>
            <p className="text-sm font-semibold text-gray-800">{category.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <Ruler size={16} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Categoria</p>
            <p className="text-sm font-semibold text-gray-800">{category.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}