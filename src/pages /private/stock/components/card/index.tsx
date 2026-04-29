import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface Stock {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  price: number
  stock: 'Em Estoque' | 'Estoque Médio' | 'Estoque Baixo'
}

const stock: Stock[] = [
  { id: '1', name: 'Milho Orgânico',   category: 'Grãos',    quantity: 450, unit: 'kg',       price: 3.50, stock: 'Em Estoque'    },
  { id: '2', name: 'Feijão Carioca',   category: 'Grãos',    quantity: 120, unit: 'kg',       price: 5.20, stock: 'Estoque Médio' },
  { id: '3', name: 'Tomate Cherry',    category: 'Frutas',   quantity: 35,  unit: 'crates',   price: 8.75, stock: 'Estoque Baixo' },
  { id: '4', name: 'Alface Crespa',    category: 'Verduras', quantity: 280, unit: 'unidades', price: 2.15, stock: 'Em Estoque'    },
  { id: '5', name: 'Cenoura Roxa',     category: 'Verduras', quantity: 95,  unit: 'kg',       price: 4.30, stock: 'Estoque Médio' },
  { id: '6', name: 'Abóbora Cabotiá',  category: 'Verduras', quantity: 45,  unit: 'unidades', price: 6.80, stock: 'Estoque Médio' },
]

const stockConfig: Record<Stock['stock'], { color: string; badge: string; progress: number }> = {
  'Em Estoque':    { color: 'bg-green-500',  badge: 'bg-green-100 text-green-700 hover:bg-green-100',   progress: 85 },
  'Estoque Médio': { color: 'bg-yellow-500', badge: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100', progress: 45 },
  'Estoque Baixo': { color: 'bg-red-500',    badge: 'bg-red-100 text-red-700 hover:bg-red-100',          progress: 15 },
}

function ProductCard({ stock }: { stock: Stock }) {
  const config = stockConfig[stock.stock]

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5 space-y-4">
        {/* Nome e categoria */}
        <div>
          <h3 className="font-semibold text-slate-800">{stock.name}</h3>
          <p className="text-sm text-slate-400">{stock.category}</p>
        </div>

        {/* Quantidade e Preço */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-400 mb-1">Quantidade</p>
            <p className="font-bold text-slate-800">
              {stock.quantity}{' '}
              <span className="text-sm font-normal text-slate-400">{stock.unit}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 mb-1">Preço</p>
            <p className="font-bold text-slate-800">
              AO {stock.price.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>

        {/* Estoque */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">Estoque</p>
            <Badge className={config.badge}>{stock.stock}</Badge>
          </div>
          <Progress value={config.progress} className={`h-1.5 [&>div]:${config.color}`} />
        </div>
      </CardContent>
    </Card>
  )
}

export function StockGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stock.map((stock) => (
        <ProductCard key={stock.id} stock={stock} />
      ))}
    </div>
  )
}