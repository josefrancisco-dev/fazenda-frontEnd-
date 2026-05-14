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
// import { SheetUpdateClient} from "./update";
import { ActionOptionView } from "@/types/enums";
import type { Orders } from "@/types/typesApi";
import { Read } from "./read";
import { Button } from "@/components/ui/button";

type Props = {
  action: ActionOptionView;
  orders:  Orders;
  controls: {
    open: boolean;
    close: VoidFunction;
  };
};

export function OrdersSheetModal({ action, orders, controls }: Props) {

  // const isUpdate = action === ActionOption.UPDATE;
  const isView = action ===  ActionOptionView.VIEW;

  return (
    <Sheet open={controls.open} onOpenChange={controls.close}>
      <SheetContent
        className={cn("sm:max-w-3xl ", isView && "sm:max-w-xl")}
      >
        <SheetHeader>
          <SheetTitle>
             Detalhes do Pedido
          </SheetTitle>
          <SheetDescription>
             Visualize os detalhes do Pedido."
          </SheetDescription>
        </SheetHeader>
        <div className="">
          {/* {isUpdate && <SheetUpdateClient client={client} onClose={controls.close} />} */}
          {isView && <Read orders={orders} />}
        </div>
    
        <SheetFooter>
            {/* {isUpdate &&
            <Button
            type="submit" 
            form = "form-rhf-demo">
                {isPending ? <Spinner />: "Cadastrar" }
            </Button>
            } */}
         
          <SheetClose asChild>
            <Button variant="outline">Sair</Button>
          </SheetClose>
        </SheetFooter>      
      </SheetContent>
    </Sheet>
  );
}
