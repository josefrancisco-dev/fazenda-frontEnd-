import type { Client } from "@/types/typesApi"

type props  = {
   client : Client 
}

export function Read({client} : props ) {
    return (
    <div className="px-4 space-y-4">
        <div className="bg-amber-500 p-4 rounded-md">
            <p>{client.name}</p>
        </div>
        <div className="bg-amber-500 p-4 rounded-md">
             <p>{client.email}</p>
        </div>
        <div className="bg-amber-500 p-4 rounded-md">
            <p>{client.phone}</p>
        </div>
        <div className="bg-amber-500 p-4 rounded-md">
            <p>{client.nif}</p>
        </div>
        <div className="bg-amber-500 p-4 rounded-md">
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