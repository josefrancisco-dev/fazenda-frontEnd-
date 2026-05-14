import type { Supplier } from "@/types/typesApi"
import { Building, Mail, Phone, CreditCard, BadgeCheck, ShieldCheck } from "lucide-react"

type Props = {
  supplier: Supplier
}

export function Read({ supplier }: Props) {
  const statusColor = {
    'Active':   'bg-green-100 text-green-700',
    'Lead':     'bg-blue-100 text-blue-700',
    'Customer': 'bg-gray-100 text-gray-600',
  }[supplier.status] ?? 'bg-gray-100 text-gray-600'

  return (
    <div className="px-4 py-2 space-y-3">

      {/* Avatar + Nome */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <div className="w-12 h-12 rounded-full bg-amber-400 relative overflow-hidden shrink-0">
          {supplier.avatar ? (
            <img
              src={supplier.avatar}
              alt={supplier.name}
              className="w-full h-full object-cover absolute inset-0"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
              {supplier.company.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Fornecedor</p>
          <p className="text-sm font-semibold text-gray-800">{supplier.company}</p>
        </div>
      </div>

      {/* Email + Telefone */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <Mail size={16} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Email</p>
            <p className="text-sm font-semibold text-gray-800 truncate">{supplier.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <Phone size={16} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Telefone</p>
            <p className="text-sm font-semibold text-gray-800">{supplier.phone}</p>
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
            <p className="text-sm font-semibold text-gray-800">{supplier.nif}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <Building size={16} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Empresa</p>
            <p className="text-sm font-semibold text-gray-800 truncate">{supplier.company}</p>
          </div>
        </div>
      </div>

      {/* Função + Estado */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <ShieldCheck size={16} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Função</p>
            <p className="text-sm font-semibold text-gray-800">{supplier.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="p-2 bg-amber-400 rounded-lg text-white shrink-0">
            <BadgeCheck size={16} />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Estado</p>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusColor}`}>
              {supplier.status}
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}