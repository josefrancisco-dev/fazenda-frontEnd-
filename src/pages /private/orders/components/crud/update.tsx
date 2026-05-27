import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { orderStatusSchema } from "@/schemas/orders"
import { useUpdateOrder } from "@/quereis/useOrders"
import type z from "zod"
import { statusConfig } from "@/constants/statusConfig"

type OrderStatus = z.infer<typeof orderStatusSchema>

interface Props {
  orderId: string
  currentStatus: OrderStatus
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function StatusDialog({ 
  orderId,
  currentStatus,
  open,
  onClose,
  onSuccess
 }: Props) {
  const [selected, setSelected] = useState<OrderStatus>(currentStatus)
  const { mutateAsync: updateOrder, isPending } = useUpdateOrder()

  const handleConfirm = async () => {
    const payload = { id: orderId, data: { status: selected } }
    await updateOrder(payload)
    onClose()
    onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Alterar estado do pedido</DialogTitle>
          <DialogDescription>
            Selecciona o novo estado para este pedido.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-2">
          {(orderStatusSchema.options as OrderStatus[]).map((status) => {
            const config = statusConfig[status]
            const isSelected = selected === status

            return (
              <button
                key={status}
                onClick={() => setSelected(status)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all
                  ${isSelected
                    ? "border-amber-400 bg-amber-50"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${config.dotClass}`} />
                <span className={isSelected ? "text-amber-700" : "text-slate-700"}>
                  {config.label}
                </span>
                {isSelected && (
                  <span className="ml-auto text-amber-500 text-xs">✓</span>
                )}
              </button>
            )
          })}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            onClick={handleConfirm}
            disabled={isPending || selected === currentStatus}
            className="bg-amber-400 hover:bg-amber-500 text-white"
          >
            {isPending ? "A guardar..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}