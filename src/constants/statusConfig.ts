import type { orderStatusSchema } from "@/schemas/orders";
import type z from "zod";

type OrderStatus = z.infer<typeof orderStatusSchema>

export const statusConfig: Record<OrderStatus, { label: string; dotClass: string;  badgeClass: string;}> = {
  Pendente:         { label: "Pendente",dotClass: "bg-yellow-500",  badgeClass: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100"},
  Confirmado:       { label: "Confirmado",         dotClass: "bg-blue-500" ,  badgeClass: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",  },
  Em_processamento: { label: "Em processamento",   dotClass: "bg-purple-500",  badgeClass: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100",},
  Enviado:          { label: "Enviado",            dotClass: "bg-orange-500" ,   badgeClass: "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100",},
  Entregue:         { label: "Entregue",           dotClass: "bg-green-500" ,     badgeClass: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",},
}
