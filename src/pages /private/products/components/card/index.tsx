import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { MoreHorizontalIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CartCounterCard } from '@/pages /private/orders/components/crud/cartCounter'
import { useUserStore } from '@/stores/useUserStore'
import { ActionOption } from '@/types/enums'
import { ProductSheetModal } from '../crud'
import { useSelected } from '@/hooks/useSelected'
import React from 'react'
import type { Product } from '@/types/typesApi'
import { usePagination } from '@/hooks/usePagination'
import { PaginationControls } from '@/app/components/pagination'

interface Props {
  data: Product[]
}

const stockConfig: Record<Product['stock'], { color: string; badge: string; progress: number }> = {
  'Em Estoque':    { color: 'bg-green-500',  badge: 'bg-green-100 text-green-700 hover:bg-green-100',    progress: 85 },
  'Estoque Médio': { color: 'bg-yellow-500', badge: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100', progress: 45 },
  'Estoque Baixo': { color: 'bg-red-500',    badge: 'bg-red-100 text-red-700 hover:bg-red-100',           progress: 15 },
}

const stockConfigFallback = {
  color: 'bg-gray-500',
  badge: 'bg-gray-100 text-gray-700 hover:bg-gray-100',
  progress: 0,
}

function ProductCard({ product, onAction }: { product: Product, onAction: (product: Product, action: ActionOption) => void }) {
  const { user } = useUserStore((state) => state)
  const isAdmin = user?.role === 'Admin'
  const config = stockConfig[product.stock] ?? stockConfigFallback

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group overflow-hidden p-0">
      <div className={`relative h-36 bg-gradient-to-br ${product.banner} flex items-center justify-center`}>
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover absolute inset-0" />
        ) : (
          <span className="text-7xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
            {product.emoji}
          </span>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {product.category?.name}
          </span>
        </div>
        <div className="absolute top-2 right-2">
          {isAdmin && (
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
                    <DropdownMenuItem key={value} onClick={() => onAction(product, label)} className="cursor-pointer">
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <CardContent className="p-5 space-y-4">
        <div className="flex justify-between">
          <h3 className="font-bold text-slate-800 text-base">{product.name}</h3>
          <CartCounterCard product={{
            id:    product.id,
            name:  product.name,
            image: product.image,
            emoji: product.emoji,
            price: product.price,
            quantity: product.quantity, 
          }} />
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-400 mb-1">Quantidade</p>
            <p className="font-bold text-slate-800">
              {product.quantity}{' '}
              <span className="text-sm font-normal text-slate-400">{product.unit}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 mb-1">Preço</p>
            <p className="font-bold text-lg text-slate-800">
              AO {product.price.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">Estoque</p>
            <Badge className={config.badge}>
              {product.stock ?? <span className="text-gray-500 text-xs">Sem stock</span>}
            </Badge>
          </div>
          <Progress value={config.progress} className={`h-1.5 [&>div]:${config.color}`} />
        </div>
      </CardContent>
    </Card>
  )
}

export function ProductsGrid({ data = [] }: Props) {
  const { active, close, onSelected, selected } = useSelected<Product>()
  const [action, setAction] = React.useState<ActionOption | null>(null)

  const { 
    currentPage,
     totalPages, 
     paginatedData, 
     nextPage, 
     prevPage, 
     goToPage } = usePagination({
    data,
    itemsPerPage: 6,
  })

  const handleSelection = (product: Product, action: ActionOption) => {
    setAction(action)
    onSelected(product)
  }

  const onClose = () => {
    close()
    setAction(null)
  }

  const hasProduct = data.length > 0

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hasProduct ? (
          paginatedData.map((product) => (
            <ProductCard key={product.id} product={product} onAction={handleSelection} />
          ))
        ) : (
          <p className="text-slate-500 col-span-3 text-center py-8">
            Nenhum produto encontrado
          </p>
        )}
      </div>

      {hasProduct && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onNext={nextPage}
          onPrev={prevPage}
          showTotalItems={true}
          totalItems={data.length}
        />
      )}

      {active && selected && action && (
        <ProductSheetModal action={action} product={selected} controls={{ open: active, close: onClose }} />
      )}
    </>
  )
}