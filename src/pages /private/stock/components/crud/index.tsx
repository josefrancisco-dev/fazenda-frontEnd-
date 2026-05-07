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

import { ActionOption } from "@/types/enums";
import type {Stock } from "@/types/typesApi";
// import { Read } from "./read";
import { Button } from "@/components/ui/button";
import { SheetUpdateStock } from "./update";

type Props = {
  action: ActionOption;
  stock: Stock;
  controls: {
    open: boolean;
    close: VoidFunction;
  };
};

export function StockSheetModal({ action, stock, controls }: Props) {

  const isUpdate = action === ActionOption.UPDATE;
  const isView = action === ActionOption.VIEW;

  return (
    <Sheet open={controls.open} onOpenChange={controls.close}>
      <SheetContent
        className={cn("sm:max-w-3xl ", isView && "sm:max-w-xl")}
      >
        <SheetHeader>
          <SheetTitle>
            {isUpdate ? "Editar Stock" : "Detalhes do Stock"}
          </SheetTitle>
          <SheetDescription>
            {isUpdate
              ? "Altere os dados do stock e clique em guardar."
              : "Visualize os detalhes do client."
            }
          </SheetDescription>
        </SheetHeader>
        <div className="">
          {isUpdate && <SheetUpdateStock stock={stock} onClose={controls.close} />}
          {/* {isView && <Read client={client} />} */}
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
