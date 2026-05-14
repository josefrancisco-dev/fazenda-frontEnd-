import type { Client } from "@/types/typesApi"
import { Building, Mail, Phone, User, CreditCard, BadgeCheck } from "lucide-react"

type Props = {
  client: Client
}

export function Read({ client }: Props) {
  return (
    <div className="px-4 py-2 space-y-3">

      {/* Avatar + Nome */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-lg shrink-0">
          {client.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Nome</p>
          <p className="text-sm font-semibold text-gray-800">{client.name}</p>
        </div>
      </div>

      {/* Email + Telefone lado a lado */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <Mail size={16} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Email</p>
            <p className="text-sm font-semibold text-gray-800 truncate">{client.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <Phone size={16} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Telefone</p>
            <p className="text-sm font-semibold text-gray-800">{client.phone}</p>
          </div>
        </div>
      </div>

      {/* NIF + Empresa */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <CreditCard size={16} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">NIF</p>
            <p className="text-sm font-semibold text-gray-800">{client.nif}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <Building size={16} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Empresa</p>
            <p className="text-sm font-semibold text-gray-800 truncate">{client.company}</p>
          </div>
        </div>
      </div>

      {/* Role + Status */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <User size={16} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Tipo de usário</p>
            <p className="text-sm font-semibold text-gray-800">{client.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <BadgeCheck size={16} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Estado</p>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              client.status === "Active"
                ? "bg-green-100 text-green-700"
                : client.status === "Lead"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
            }`}>
              {client.status}
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}