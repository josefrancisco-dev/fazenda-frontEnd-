import { UI_THEME } from "@/constants/thme"
import type { Supplier } from "@/types/typesApi"
import {
  Building,
  Mail,
  Phone,
  CreditCard,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react"

type Props = {
  supplier: Supplier
}

export function Read({ supplier }: Props) {

  const statusColor = {
    Active: UI_THEME.success,
    Lead: UI_THEME.info,
    Customer: UI_THEME.warning,
  }[supplier.status] ?? UI_THEME.neutral

  return (
    <div className="px-4 py-2 space-y-4">

      {/* Header */}

      <div
        className={`
          flex
          items-center
          gap-4
          p-4
          ${UI_THEME.softCard}
        `}
      >

        <div
          className={`
            ${UI_THEME.avatar}
            relative
            overflow-hidden
          `}
        >
          {supplier.avatar ? (
            <img
              src={supplier.avatar}
              alt={supplier.name}
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
              "
            />
          ) : (
            supplier.company.charAt(0).toUpperCase()
          )}
        </div>

        <div>
          <p className={UI_THEME.label}>
            Fornecedor
          </p>

          <p className={UI_THEME.title}>
            {supplier.company}
          </p>

          <p className="text-xs text-slate-500">
            {supplier.name}
          </p>
        </div>

      </div>

      {/* Email + Telefone */}

      <div className="grid grid-cols-2 gap-3">

        <div
          className={`
            flex
            items-center
            gap-3
            p-4
            ${UI_THEME.card}
          `}
        >
          <div className={UI_THEME.icon}>
            <Mail size={16} />
          </div>

          <div className="min-w-0">
            <p className={UI_THEME.label}>
              Email
            </p>

            <p
              className={`
                ${UI_THEME.title}
                truncate
              `}
            >
              {supplier.email}
            </p>
          </div>
        </div>

        <div
          className={`
            flex
            items-center
            gap-3
            p-4
            ${UI_THEME.card}
          `}
        >
          <div className={UI_THEME.icon}>
            <Phone size={16} />
          </div>

          <div>
            <p className={UI_THEME.label}>
              Telefone
            </p>

            <p className={UI_THEME.title}>
              {supplier.phone}
            </p>
          </div>
        </div>

      </div>

      {/* NIF + Empresa */}

      <div className="grid grid-cols-2 gap-3">

        <div
          className={`
            flex
            items-center
            gap-3
            p-4
            ${UI_THEME.card}
          `}
        >
          <div className={UI_THEME.icon}>
            <CreditCard size={16} />
          </div>

          <div>
            <p className={UI_THEME.label}>
              NIF
            </p>

            <p className={UI_THEME.title}>
              {supplier.nif}
            </p>
          </div>
        </div>

        <div
          className={`
            flex
            items-center
            gap-3
            p-4
            ${UI_THEME.card}
          `}
        >
          <div className={UI_THEME.icon}>
            <Building size={16} />
          </div>

          <div className="min-w-0">
            <p className={UI_THEME.label}>
              Empresa
            </p>

            <p
              className={`
                ${UI_THEME.title}
                truncate
              `}
            >
              {supplier.company}
            </p>
          </div>
        </div>

      </div>

      {/* Função + Estado */}

      <div className="grid grid-cols-2 gap-3">

        <div
          className={`
            flex
            items-center
            gap-3
            p-4
            ${UI_THEME.card}
          `}
        >
          <div className={UI_THEME.icon}>
            <ShieldCheck size={16} />
          </div>

          <div>
            <p className={UI_THEME.label}>
              Função
            </p>

            <p className={UI_THEME.title}>
              {supplier.role}
            </p>
          </div>
        </div>

        <div
          className={`
            flex
            items-center
            gap-3
            p-4
            ${UI_THEME.card}
          `}
        >
          <div className={UI_THEME.icon}>
            <BadgeCheck size={16} />
          </div>

          <div>
            <p className={UI_THEME.label}>
              Estado
            </p>

            <span
              className={`
                text-xs
                font-bold
                px-3
                py-1
                rounded-full
                ${statusColor}
              `}
            >
              {supplier.status}
            </span>
          </div>
        </div>

      </div>

    </div>
  )
}


