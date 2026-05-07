import type { Client } from "@/types/typesApi"
import { Building, Mail, Phone, User } from "lucide-react"

type props  = {
   client : Client 
}

export function Read({client} : props ) {
    return (
    <div className="px-4 space-y-4">
        <div className="bg-amber-500 p-4 rounded-md flex items-center gap-2">
          <User />
          <p>{client.name}</p>
        </div>
        <div className="bg-amber-500 p-4 rounded-md flex items-center gap-2">
          <Mail />   <p>{client.email}</p>
        </div>
        <div className="bg-amber-500 p-4 rounded-md flex items-center gap-2">
         <Phone />
         <p>{client.phone}</p>
        </div>
        <div className="bg-amber-500 p-4 rounded-md flex items-center gap-2">
          <p>#</p>
          <p>{client.nif}</p>
        </div>
        <div className="bg-amber-500 p-4 rounded-md flex items-center gap-2">
        <Building />
        <p>{client.company}</p>
        </div>
        <div className="bg-amber-500 p-4 rounded-md">
           <p>{client.role}</p>
        </div>
        <div className="bg-amber-500 p-4 rounded-md">
           <p>{client.status}</p>
        </div>
    </div>
    )
}