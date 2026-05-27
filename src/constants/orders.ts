export const OrderStatus = {
  Pendente: "Pendente",
  Confirmado: "Confirmado",
  Em_processamento: "Em_processamento",
  Enviado: "Enviado",
  Entregue: "Entregue",
} as const

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus]