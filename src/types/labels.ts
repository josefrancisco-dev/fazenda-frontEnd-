import type { OrderStatus } from "@/constants/orders";

export const orderStatusLabel: Record<OrderStatus, string> = {
  PENDENTE: "Pendente",
  CONFIRMADO: "Confirmado",
  EM_PROCESSAMENTO: "Em Processamento",
  ENVIADO: "Enviado",
  ENTREGUE: "Entregue",
}