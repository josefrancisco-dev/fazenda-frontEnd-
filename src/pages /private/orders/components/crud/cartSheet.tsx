import { useState } from 'react'
import { ShoppingCart, ShoppingBag, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { useCart } from '@/hooks/useCart'
import { useCreateOrders } from '@/quereis/useOrders'

export function CartSheet() {
  const [open, setOpen] = useState(false)
  const { items, deleteItem, total, count } = useCart()
  const { mutateAsync, isPending } = useCreateOrders()

  const handleCheckout = async () => {
    await mutateAsync()
    setOpen(false)
  }

  return (
    <>
      {/* Ícone com badge */}
      <div className="relative cursor-pointer" onClick={() => setOpen(true)}>
        <ShoppingCart className="text-orange-500" />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
      </div>

      {/* Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="flex flex-col w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-orange-500" />
              Carrinho
              {count > 0 && (
                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {count} itens
                </span>
              )}
            </SheetTitle>
          </SheetHeader>

          {/* Itens */}
          <div className="flex-1 overflow-auto py-4 space-y-3 px-2">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
                <ShoppingCart size={48} className="opacity-30" />
                <p className="text-sm">O carrinho está vazio</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50"
                >
                  <span className="text-2xl">
                     {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                    ) : (
                      <span></span>
                    )}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800 text-sm">{item.name}</p>
                    <p className="text-xs text-slate-400">
                      AO {item.price.toFixed(2).replace('.', ',')} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-slate-800 text-sm">
                    AO {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 text-red-400 hover:text-red-600 hover:bg-red-50"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <SheetFooter className="flex-col gap-3 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between w-full">
                <span className="text-slate-500 text-sm">Total</span>
                <span className="font-bold text-lg text-slate-800">
                  AO {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <Button
                onClick={handleCheckout}
                disabled={isPending}
                className="w-full"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Processando...
                  </>
                ) : (
                  'Concluir Compra'
                )}
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}