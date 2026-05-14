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
import type { Shopping } from "@/types/typesApi";
import { Button } from "@/components/ui/button";
import { SheetUpdateSuplier } from "./update";
import { Read } from "./read";

type Props = {
  action: ActionOption;
  shopping: Shopping;
  controls: {
    open: boolean;
    close: VoidFunction;
  };
};

export function ShoopingSheetModal({ action, shopping, controls }: Props) {

  const isUpdate = action === ActionOption.UPDATE;
  const isView = action === ActionOption.VIEW;

  return (
    <Sheet open={controls.open} onOpenChange={controls.close}>
      <SheetContent
        className={cn("sm:max-w-3xl ", isView && "sm:max-w-xl")}
      >
        <SheetHeader>
          <SheetTitle>
            {isUpdate ? "Editar Compra" : "Detalhes da Compra"}
          </SheetTitle>
          <SheetDescription>
            {isUpdate
              ? "Altere os dados do Compra e clique em guardar."
              : "Visualize os detalhes da Compra."
            }
          </SheetDescription>
        </SheetHeader>
        <div className="">
          {isUpdate && <SheetUpdateSuplier shopping={shopping} onClose={controls.close} />}
          {isView && <Read shopping={shopping} />}
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
