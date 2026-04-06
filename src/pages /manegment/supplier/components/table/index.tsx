import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { MoreHorizontalIcon} from "lucide-react"
import type {Supplier } from "@/types/typesApi"

type Props = {
  data: Supplier[]
  isLoading?: boolean
  isError?: boolean
  isEmpty?: boolean
}

const statusStyles: Record<Supplier['status'], string> = {
  Customer: 'bg-green-100 text-green-700 hover:bg-green-100',
  Lead:     'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
  Active:   'bg-blue-100 text-blue-700 hover:bg-blue-100',
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase()
}

function ClientTableRow({supplier} :  {supplier : Supplier}) {
     return( 
        <TableRow key={supplier.id}>
          <TableCell>
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                {supplier.avatar && <AvatarImage src={supplier.avatar} alt={supplier.name} />}
                <AvatarFallback className="bg-slate-200 text-slate-700 text-xs font-semibold">
                  {getInitials(supplier.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-slate-800 text-sm">{supplier.name}</p>
                <p className="text-xs text-slate-400">{supplier.role}</p>
              </div>
            </div>
          </TableCell>
          <TableCell className="text-slate-600 text-sm">
            {supplier.company}
          </TableCell>
          <TableCell className="text-slate-600 text-sm">
            {supplier.nif}
          </TableCell>
          <TableCell className="text-slate-500 text-sm">
            {supplier.email}
          </TableCell>
          <TableCell className="text-slate-500 text-sm whitespace-nowrap">
            {supplier.phone}
          </TableCell>
          <TableCell>
            <Badge className={statusStyles[supplier.status]}>
              {supplier.status}
            </Badge>
          </TableCell>
          <TableCell className="text-slate-400 text-sm whitespace-nowrap">
            {supplier.date}
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
                <DropdownMenuItem>Editar</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  Remover
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>     
     )
}

export function TableSuppliers({data : supplier} : Props) {
  
  const hasClients = supplier && supplier.length > 0

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Representante</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>NIF</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hasClients ?  (
            supplier?.map((supplier) => (
              <ClientTableRow 
               key={supplier.id}
               supplier={supplier}
              />
            ))
          ) :  (
            <TableRow>
              <TableCell colSpan={8} className="text-center  py-8 text-slate-500">
                Nenhum cliente encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}