import type { OrderStatus } from "@/constants/orders";

export const orderStatusLabel: Record<OrderStatus, string> = {
  Pendente: "Pendente",
  Confirmado: "Confirmado",
  Em_processamento: "Em_Processamento",
  Enviado: "Enviado",
  Entregue: "Entregue",
}