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
import type {Product } from "@/types/typesApi";
import { Button } from "@/components/ui/button";
import { SheetUpdateProduct } from "./update";
import { Read } from "./read";


type Props = {
  action: ActionOption;
  product: Product;
  controls: {
    open: boolean;
    close: VoidFunction;
  };
};

export function ProductSheetModal({ action, product, controls }: Props) {

  const isUpdate = action === ActionOption.UPDATE;
  const isView = action === ActionOption.VIEW;

  return (
    <Sheet open={controls.open} onOpenChange={controls.close}>
      <SheetContent
        className={cn("sm:max-w-3xl ", isView && "sm:max-w-xl")}
      >
        <SheetHeader>
          <SheetTitle>
            {isUpdate ? "Editar Produto" : "Detalhes do Produto"}
          </SheetTitle>
          <SheetDescription>
            {isUpdate
              ? "Altere os dados do Produto e clique em guardar."
              : "Visualize os detalhes do Produto."
            }
          </SheetDescription>
        </SheetHeader>
        <div className="">
          {isUpdate && <SheetUpdateProduct product={product} onClose={controls.close} />}
          {isView && <Read product={product} />}
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
