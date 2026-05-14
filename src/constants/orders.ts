export const OrderStatus = {
  PENDENTE: "PENDENTE",
  CONFIRMADO: "CONFIRMADO",
  EM_PROCESSAMENTO: "EM_PROCESSAMENTO",
  ENVIADO: "ENVIADO",
  ENTREGUE: "ENTREGUE",
} as const

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus]