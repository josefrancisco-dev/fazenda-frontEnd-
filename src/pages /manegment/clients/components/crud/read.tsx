import type { Client } from "@/types/typesApi"

type props  = {
   client : Client 
}

export function Read({client} : props ) {
    return (
        <div className="px-4">
            <p>{client.name}</p>
            <p>{client.email}</p>
            <p>{client.phone}</p>
            <p>{client.nif}</p>
            <p>{client.company}</p>
            <p>{client.role}</p>
            <p>{client.status}</p>
        </div>
    )
}