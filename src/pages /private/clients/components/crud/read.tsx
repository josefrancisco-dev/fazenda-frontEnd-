import { UI_THEME } from "@/constants/thme"
import type { Client } from "@/types/typesApi"
import {
  Building,
  Mail,
  Phone,
  User,
  CreditCard,
  BadgeCheck,
} from "lucide-react"

type Props = {
  client: Client
}

export function Read({ client }: Props) {
  const statusColor =
    client.status === "Active"
      ? UI_THEME.success
      : client.status === "Lead"
      ? UI_THEME.info
      : UI_THEME.neutral

  return (
    <div className="px-4 py-2 space-y-4">

      <div className={`flex items-center gap-4 p-4 ${UI_THEME.softCard}`}>
        <div className={UI_THEME.avatar}>
          {client.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className={UI_THEME.label}>Cliente</p>
          <p className={UI_THEME.title}>{client.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">

        <div className={`flex items-center gap-3 p-4 ${UI_THEME.card}`}>
          <div className={UI_THEME.icon}>
            <Mail size={16} />
          </div>

          <div className="min-w-0">
            <p className={UI_THEME.label}>Email</p>
            <p className={`${UI_THEME.title} truncate`}>
              {client.email}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-4 ${UI_THEME.card}`}>
          <div className={UI_THEME.icon}>
            <Phone size={16} />
          </div>

          <div>
            <p className={UI_THEME.label}>Telefone</p>
            <p className={UI_THEME.title}>
              {client.phone}
            </p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-3">

        <div className={`flex items-center gap-3 p-4 ${UI_THEME.card}`}>
          <div className={UI_THEME.icon}>
            <CreditCard size={16} />
          </div>

          <div>
            <p className={UI_THEME.label}>NIF</p>
            <p className={UI_THEME.title}>
              {client.nif}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-4 ${UI_THEME.card}`}>
          <div className={UI_THEME.icon}>
            <Building size={16} />
          </div>

          <div className="min-w-0">
            <p className={UI_THEME.label}>Empresa</p>
            <p className={`${UI_THEME.title} truncate`}>
              {client.company}
            </p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-3">

        <div className={`flex items-center gap-3 p-4 ${UI_THEME.card}`}>
          <div className={UI_THEME.icon}>
            <User size={16} />
          </div>

          <div>
            <p className={UI_THEME.label}>
              Tipo de Utilizador
            </p>

            <p className={UI_THEME.title}>
              {client.role}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-4 ${UI_THEME.card}`}>
          <div className={UI_THEME.icon}>
            <BadgeCheck size={16} />
          </div>

          <div>
            <p className={UI_THEME.label}>
              Estado
            </p>

            <span
              className={`text-xs font-bold px-2 py-1 rounded-full ${statusColor}`}
            >
              {client.status}
            </span>
          </div>
        </div>

      </div>

    </div>
  )
}