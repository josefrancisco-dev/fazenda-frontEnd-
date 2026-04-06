import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CartCounterRow } from "@/pages /manegment/orders/components/crud/cartCounter"
import type { Product } from "@/types/typesApi"


// const products: Product[] = [
//   { id: '1', name: 'Milho Orgânico',  category: 'Grãos',    quantity: 450, unit: 'kg',       price: 3.50, stock: 'Em Estoque',    emoji: '🌽', banner: 'from-yellow-400 to-yellow-600' },
//   { id: '2', name: 'Feijão Carioca',  category: 'Grãos',    quantity: 120, unit: 'kg',       price: 5.20, stock: 'Estoque Médio', emoji: '🫘', banner: 'from-amber-700 to-amber-900'   },
//   { id: '3', name: 'Tomate Cherry',   category: 'Frutas',   quantity: 35,  unit: 'crates',   price: 8.75, stock: 'Estoque Baixo', emoji: '🍅', banner: 'from-red-400 to-red-600'       },
//   { id: '4', name: 'Alface Crespa',   category: 'Verduras', quantity: 280, unit: 'unidades', price: 2.15, stock: 'Em Estoque',    emoji: '🥬', banner: 'from-green-400 to-green-600'   },
//   { id: '5', name: 'Cenoura Roxa',    category: 'Verduras', quantity: 95,  unit: 'kg',       price: 4.30, stock: 'Estoque Médio', emoji: '🥕', banner: 'from-orange-400 to-orange-600' },
//   { id: '6', name: 'Uva', category: 'Frutas', quantity: 45,  unit: 'kg', price: 6.80, stock: 'Estoque Médio', emoji: '🍇', banner: 'from-violet-500 to-amber-700'   },
// ]

interface Props {
  data  :  Product[]
}

const stockConfig: Record<Product['stock'], { badge: string }> = {
  'Em Estoque':    { badge: 'bg-green-100 text-green-700 hover:bg-green-100'    },
  'Estoque Médio': { badge: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' },
  'Estoque Baixo': { badge: 'bg-red-100 text-red-700 hover:bg-red-100'          },
}


function TableProductRow({product}  : {product :  Product}) {
  return(
<TableRow key={product.id}>
        <TableCell className="font-medium text-slate-700">
          <div className="flex items-center gap-2">
            {product.image ? (
              <img
                src={product.image} 
                alt={product.name}
                className="w-8 h-8 object-cover rounded-md flex-shrink-0"
              />
            ) : (
              <span className="text-xl">{product.emoji || '📦'}</span>
            )}
            {product.name}
          </div>
        </TableCell>
        <TableCell className="text-slate-500">
          {product.category}
        </TableCell>
       <TableCell className="text-slate-700">
          {product.quantity || <span>0</span>}
        </TableCell>
        <TableCell className="text-slate-500">
          {product.unit}
        </TableCell>
        <TableCell className="font-medium text-slate-800">
          AO {product.price.toFixed(2).replace('.', ',')}
        </TableCell>
        <TableCell>
         <Badge className={stockConfig[product.stock]?.badge ?? 'bg-gray-100 text-gray-700'}>
          {product.stock || <span className="text-red-500 text-xs">Sem stock</span>}
        </Badge>
        </TableCell>
        <TableCell>
          <div className="flex items-center justify-center">
            <CartCounterRow product={{
              id:    product.id,
              name:  product.name,
              emoji: product.emoji,
              price: product.price,
            }} />
          </div>
        </TableCell>
    </TableRow>
  )
}

export function TableProducts({data :  product}: Props) {

  const hasProduct = product && product.length > 0

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Unidade</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>       
          {product.map((product) => (
            <TableProductRow 
            key={product.id}
            product={product}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}