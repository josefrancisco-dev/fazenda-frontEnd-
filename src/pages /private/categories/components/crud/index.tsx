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
import type {Category} from "@/types/typesApi";
import { Button } from "@/components/ui/button";
import { SheetUpdateProduct } from "./update";
import { Read } from "./read";


type Props = {
  action: ActionOption;
  category: Category;
  controls: {
    open: boolean;
    close: VoidFunction;
  };
};

export function CategorySheetModal({ action, category, controls }: Props) {

  const isUpdate = action === ActionOption.UPDATE;
  const isView = action === ActionOption.VIEW;

  return (
    <Sheet open={controls.open} onOpenChange={controls.close}>
      <SheetContent
        className={cn("sm:max-w-3xl ", isView && "sm:max-w-xl")}
      >
        <SheetHeader>
          <SheetTitle>
            {isUpdate ? "Editar Categoria" : "Detalhes da Categoria"}
          </SheetTitle>
          <SheetDescription>
            {isUpdate
              ? "Altere os dados da Categoria e clique em guardar."
              : "Visualize os detalhes do Categoria."
            }
          </SheetDescription>
        </SheetHeader>
        <div className="">
          {isUpdate && <SheetUpdateProduct category={category} onClose={controls.close} />}
          {isView && <Read category={category} />}
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
