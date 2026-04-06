import { MoreHorizontal, Truck, Calendar, Package, CreditCard } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Shopping } from '@/types/typesApi'

interface Props {
  data : Shopping[]
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase()
}

function ShoppingCard({ shopping }: { shopping: Shopping }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5 space-y-4">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-semibold text-sm flex items-center justify-center shrink-0">
              {getInitials(shopping.supplier?.name)}
            </div>
            <div>
              <p className="font-semibold text-slate-800 leading-tight">{shopping.supplier?.name}</p>
              {/* <p className="text-sm text-slate-400">#{shopping.id}</p> */}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 text-slate-400">
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

        {/* Status + Date */}
        <div className="flex items-center justify-between">
          <Badge className={
            shopping.status
              ? 'bg-green-100 text-green-700 hover:bg-green-100'
              : 'bg-red-100 text-red-700 hover:bg-red-100'
          }>
            {shopping.status ? 'Concluído' : 'Pendente'}
          </Badge>
          {/* <span className="text-xs text-slate-400">{shopping.date}</span> */}
        </div>

        {/* Info */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar size={14} className="text-slate-400 shrink-0" />
            {/* <span>{shopping.date}</span> */}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Package size={14} className="text-slate-400 shrink-0" />
            <span>
              {shopping.items.reduce((sum, i) => sum + i.quantity, 0)}
               itens
          </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CreditCard size={14} className="text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">
              AO {shopping.total.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

export function ShoppingGrid({data :  shopping} :  Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {shopping.map((shopping) => (
        <ShoppingCard key={shopping.id} shopping={shopping} />
      ))}
    </div>
  )
}