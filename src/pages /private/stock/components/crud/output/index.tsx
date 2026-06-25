import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ActionOptionView } from "@/types/enums";
import type { Orders } from "@/types/typesApi";
import { Button } from "@/components/ui/button";
import { Read } from "./read";

type Props = {
  action: ActionOptionView;
  orders:  Orders;
  controls: {
    open: boolean;
    close: VoidFunction;
  };
};

export function OrdersSheetModal({ action, orders, controls }: Props) {
  const isView = action ===  ActionOptionView.VIEW;

  return (
    <Sheet open={controls.open} onOpenChange={controls.close}>
      <SheetContent
        className={cn("sm:max-w-3xl ", isView && "sm:max-w-xl")}
      >
        <SheetHeader>
          <SheetTitle>
             Detalhes de saída de estoque
          </SheetTitle>
          <SheetDescription>
             Visualize os detalhes de saída de estoque.
          </SheetDescription>
        </SheetHeader>
        <div className="">
          {isView && <Read orders={orders} />}
        </div>
    
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Sair</Button>
          </SheetClose>
        </SheetFooter>      
      </SheetContent>
    </Sheet>
  );
}
