import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon, ShoppingCart, AlertCircle, Package, FileText } from "lucide-react"

interface Activity {
  id: string
  icon: React.ReactNode
  description: string
  date: string
}

const activities: Activity[] = [
  {
    id: "1",
    icon: <ShoppingCart size={16} className="text-blue-500" />,
    description: "Novo pedido recebido de Supermercado Central",
    date: "2024-03-17 14:32",
  },
  {
    id: "2",
    icon: <AlertCircle size={16} className="text-red-500" />,
    description: "Estoque de Tomate Cherry abaixo do limite",
    date: "2024-03-17 12:15",
  },
  {
    id: "3",
    icon: <Package size={16} className="text-yellow-600" />,
    description: "Compra COM-000450 confirmada com fornecedor",
    date: "2024-03-16 09:45",
  },
  {
    id: "4",
    icon: <ShoppingCart size={16} className="text-blue-500" />,
    description: "Pedido PED-001244 entregue com sucesso",
    date: "2024-03-16 16:20",
  },
  {
    id: "5",
    icon: <FileText size={16} className="text-slate-500" />,
    description: "Relatório semanal gerado e salvo",
    date: "2024-03-15 23:00",
  },
  {
    id: "6",
    icon: <AlertCircle size={16} className="text-red-500" />,
    description: "Estoque de Mel atualizado: 85L",
    date: "2024-03-15 10:30",
  },
]

export function TableDashboard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Atividades Recentes</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    {activity.icon}
                  </div>
                  <span className="text-sm text-slate-700">{activity.description}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-slate-400 whitespace-nowrap">
                {activity.date}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Abrir menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                    <DropdownMenuItem>Marcar como lido</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      Remover
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}