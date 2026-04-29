import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CartCounter } from '@/pages /private/orders/components/crud/cartCounter'

interface Product {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  price: number
  stock: 'Em Estoque' | 'Estoque Médio' | 'Estoque Baixo'
  banner: string
  emoji: string
}

const products: Product[] = [
  { id: '1', name: 'Milho Orgânico',  category: 'Grãos',    quantity: 450, unit: 'kg',       price: 3.50, stock: 'Em Estoque',    emoji: '🌽', banner: 'from-yellow-400 to-yellow-600'  },
  { id: '2', name: 'Feijão Carioca',  category: 'Grãos',    quantity: 120, unit: 'kg',       price: 5.20, stock: 'Estoque Médio', emoji: '🫘', banner: 'from-amber-700 to-amber-900'    },
  { id: '3', name: 'Tomate Cherry',   category: 'Frutas',   quantity: 35,  unit: 'crates',   price: 8.75, stock: 'Estoque Baixo', emoji: '🍅', banner: 'from-red-400 to-red-600'        },
  { id: '4', name: 'Alface Crespa',   category: 'Verduras', quantity: 280, unit: 'unidades', price: 2.15, stock: 'Em Estoque',    emoji: '🥬', banner: 'from-green-400 to-green-600'    },
  { id: '5', name: 'Cenoura Roxa',    category: 'Verduras', quantity: 95,  unit: 'kg',       price: 4.30, stock: 'Estoque Médio', emoji: '🥕', banner: 'from-orange-400 to-orange-600'  },
  { id: '6', name: 'Uva', category: 'Frutas', quantity: 45,  unit: 'kg', price: 6.80, stock: 'Estoque Médio', emoji: '🍇', banner: 'from-violet-500 to-amber-700'   },
]

const stockConfig: Record<Product['stock'], { color: string; badge: string; progress: number }> = {
  'Em Estoque':    { color: 'bg-green-500',  badge: 'bg-green-100 text-green-700 hover:bg-green-100',    progress: 85 },
  'Estoque Médio': { color: 'bg-yellow-500', badge: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100', progress: 45 },
  'Estoque Baixo': { color: 'bg-red-500',    badge: 'bg-red-100 text-red-700 hover:bg-red-100',           progress: 15 },
}

function ProductCard({ product }: { product: Product }) {
  const config = stockConfig[product.stock]

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group overflow-hidden p-0">
      {/* Banner */}
      <div className={`relative h-36 bg-gradient-to-br ${product.banner} flex items-center justify-center`}>
        <span className="text-7xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
          {product.emoji}
        </span>
        {/* Categoria */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        {/* Menu */}
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
              >
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Remover</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Nome */}
        <div className='flex justify-between'>
            <h3 className="font-bold text-slate-800 text-base">{product.name}</h3>
            <CartCounter product={{
              id:    product.id,
              name:  product.name,
              emoji: product.emoji,
              price: product.price,
            }} />
        </div>
      

        {/* Quantidade e Preço */}
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

        {/* Estoque */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">Estoque</p>
            <Badge className={config.badge}>{product.stock}</Badge>
          </div>
          <Progress value={config.progress} className={`h-1.5 [&>div]:${config.color}`} />
        </div>
      </CardContent>
    </Card>
  )
}

export function ProductsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}