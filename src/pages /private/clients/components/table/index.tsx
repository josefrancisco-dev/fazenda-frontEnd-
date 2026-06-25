import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
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
import { MoreHorizontalIcon } from "lucide-react"
import type { Client } from "@/types/typesApi"
import { ActionOption } from "@/types/enums"
import React from "react"
import { useSelected } from "@/hooks/useSelected"
import { ClientSheetModal } from "../crud"
import { usePagination } from "@/hooks/usePagination" 
import { PaginationControls } from "@/app/components/pagination"

type Props = {
  data: Client[]
  isLoading?: boolean
  isError?: boolean
  isEmpty?: boolean
}

const statusStyles: Record<Client['status'], string> = {
  Customer: 'bg-green-100 text-green-700 hover:bg-green-100',
  Lead:     'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
  Active:   'bg-blue-100 text-blue-700 hover:bg-blue-100',
}

const roleLabels: Record<Client['role'], string> = {
  Client:   'Cliente',
  Admin:    'Administrador',
  Commercial_Manager: 'Gestor Comercial',
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase()
}

function ClientTableRow({ client, onAction }: { client: Client, onAction: (client: Client, action: ActionOption) => void }) {
  return (
    <TableRow key={client.id}>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            {client.avatar && <AvatarImage src={client.avatar} alt={client.name} />}
            <AvatarFallback className="bg-slate-200 text-slate-700 text-xs font-semibold">
              {getInitials(client.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-slate-800 text-sm">{client.name}</p>
            <p className="text-xs text-slate-400">{roleLabels[client.role]}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-slate-600 text-sm">
       {client.nif || "N/A"}
      </TableCell>
      <TableCell className="text-slate-500 text-sm">
        {client.email}
      </TableCell>
      <TableCell className="text-slate-500 text-sm whitespace-nowrap">
        {client.phone}
      </TableCell>
      <TableCell>
        <Badge className={statusStyles[client.status]}>
          {client.status}
        </Badge>
      </TableCell>
      <TableCell className="text-slate-400 text-sm whitespace-nowrap">
        {client.date}
      </TableCell>
      <TableCell className="">
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
                <DropdownMenuItem
                  key={value}
                  onClick={() => onAction(client, label)}
                  className="cursor-pointer"
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

export function TableClients({ data: client }: Props) {
  const { active, close, onSelected, selected } = useSelected<Client>()
  const [action, setAction] = React.useState<ActionOption | null>(null)

  const {
      currentPage,
      totalPages,
      paginatedData,
      nextPage,
      prevPage,
      goToPage,
    } = usePagination({
      data: client ?? [],
      itemsPerPage: 5,
    })

  const handleSelection = (client: Client, action: ActionOption) => {
    setAction(action)
    onSelected(client)
  }

  const onClose = () => {
    close()
    setAction(null)
  }

  const hasClients = client && client.length > 0

  return (
    <>
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>NIF</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Cadastro</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {hasClients ? (
            paginatedData.map((client) => (
              <ClientTableRow
                key={client.id}
                client={client}
                onAction={handleSelection}
              />
            ))
          ) : (
           <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                Nenhum cliente encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>

    {hasClients && (
       <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onNext={nextPage}
          onPrev={prevPage}
          showTotalItems={true}
          totalItems={client.length}
        />
      )}

      {active && selected && action && (
        <ClientSheetModal 
          action={action} 
          client={selected} 
          controls={{ open: active, close: onClose }} 
        />
      )}
    </>
    
  )
}