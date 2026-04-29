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
import { SheetUpdateClient} from "./update";
import { ActionOption } from "@/types/enums";
import type { Client } from "@/types/typesApi";
import { Read } from "./read";
import { Button } from "@/components/ui/button";

type Props = {
  action: ActionOption;
  client: Client;
  controls: {
    open: boolean;
    close: VoidFunction;
  };
};

export function ClientSheetModal({ action, client, controls }: Props) {

  const isUpdate = action === ActionOption.UPDATE;
  const isView = action === ActionOption.VIEW;

  return (
    <Sheet open={controls.open} onOpenChange={controls.close}>
      <SheetContent
        className={cn("sm:max-w-3xl ", isView && "sm:max-w-xl")}
      >
        <SheetHeader>
          <SheetTitle>
            {isUpdate ? "Editar Client" : "Detalhes do Client"}
          </SheetTitle>
          <SheetDescription>
            {isUpdate
              ? "Altere os dados do client e clique em guardar."
              : "Visualize os detalhes do client."
            }
          </SheetDescription>
        </SheetHeader>
        <div className="">
          {isUpdate && <SheetUpdateClient client={client} onClose={controls.close} />}
          {isView && <Read client={client} />}
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
