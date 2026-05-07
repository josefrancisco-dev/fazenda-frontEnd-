import {Building2, Mail, Phone, MoreHorizontalIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Client } from '@/types/typesApi'
import { ActionOption } from '@/types/enums'
import React from 'react'
import { useSelected } from '@/hooks/useSelected'
import { ClientSheetModal } from '../crud'

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

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase()
}

function ClientCard({client, onAction} : {client : Client, onAction: (onAction: Client, action: ActionOption) => void }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              {client.avatar && <AvatarImage src={client.avatar} alt={client.name} />}
              <AvatarFallback className="bg-slate-200 text-slate-700 font-semibold text-sm">
                {getInitials(client.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-slate-800 leading-tight">{client.name}</p>
              <p className="text-sm text-slate-400">{client.role}</p>
            </div>
          </div>

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
                    className="cursor-pointer">
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between">
          <Badge className={statusStyles[client.status]}>{client.status}</Badge>
          <span className="text-xs text-slate-400">{client.date}</span>
        </div>
        
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Building2 size={14} className="text-slate-400 shrink-0" />
            <span>{client.company}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Mail size={14} className="text-slate-400 shrink-0" />
            <span className="truncate">{client.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone size={14} className="text-slate-400 shrink-0" />
            <span>{client.phone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ClientsGrid({data : clients} :  Props) {

  const { active, close, onSelected, selected } = useSelected<Client>()
    const [action, setAction] = React.useState<ActionOption | null>(null)
  
     const handleSelection = (client : Client, action: ActionOption) => {
      setAction(action)
      onSelected(client)
    }
  
    const onClose = () => {
      close()
      setAction(null)
    }
    

  const hasClients = clients && clients.length > 0
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hasClients ? (
            clients.map((client) => (
              <ClientCard
              key={client.id} 
              client={client}
              onAction={handleSelection}
                />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-slate-500">
              Nenhum cliente encontrado
            </div>
          )
        }
      </div>

      {active && selected && action && (
        <ClientSheetModal action={action} client={selected} controls={{ open: active, close: onClose }} />
      )}
    </>    
  )
}