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
import { useDashboardOverview } from "@/quereis/useDashboard"
import { MoreHorizontalIcon, ShoppingCart, AlertCircle, Package, FileText } from "lucide-react"

export function TableDashboard() {
  const { data: overview, isLoading } = useDashboardOverview()

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case "pedido":  return <ShoppingCart size={16} className="text-blue-500"   />
      case "compra":  return <Package      size={16} className="text-yellow-600" />
      case "estoque": return <AlertCircle  size={16} className="text-red-500"    />
      default:        return <FileText     size={16} className="text-slate-500"  />
    }
  }

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
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="h-4 bg-slate-100 rounded animate-pulse w-64" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-slate-100 rounded animate-pulse w-32" />
                  </TableCell>
                  <TableCell />
                </TableRow>
              ))
            : overview?.atividades.length === 0
            ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-sm text-slate-400 py-8">
                    Nenhuma atividade recente
                  </TableCell>
                </TableRow>
              )
            : overview?.atividades.map((activity, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                        {getIcon(activity.tipo)}
                      </div>
                      <span className="text-sm text-slate-700">{activity.descricao}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-400 whitespace-nowrap">
                    {activity.data}
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
              ))
          }
        </TableBody>
      </Table>
    </div>
  )
}