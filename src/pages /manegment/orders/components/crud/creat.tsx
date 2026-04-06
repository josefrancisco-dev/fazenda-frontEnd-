import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { orderResponseSchema, type orderResponseTDO } from "@/schemas/orders"
import { useCreateOrders } from "@/quereis/orders"
import { useGetAllClient } from "@/quereis/client"

export function SheetCreateOrders() {
  const { mutateAsync, isPending } = useCreateOrders()
  const { data: suppliers } = useGetAllClient()

  const form = useForm<orderResponseTDO>({
    resolver: zodResolver(orderResponseSchema),
    defaultValues: {
        status :  "In Process"
    },
  })


  const onSubmit = (data: orderResponseTDO) => {
    mutateAsync(data)
      .then(() => form.reset())
      .catch((err) => console.log(err))
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Adicionar Compra</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar Compra</SheetTitle>
          <SheetDescription>
            Preencha os dados da compra e clique em salvar
          </SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-y-auto">
          <form
            className="space-y-4"
            id="form-rhf-demo"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Fornecedor */}
            <Controller
              name="client"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="client">Cliente</FieldLabel>
                  <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!suppliers || suppliers.length === 0} 
                      >
                        <SelectTrigger id="client" aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder={
                            !suppliers || suppliers.length === 0
                              ? "Nenhum cliente cadastrado" 
                              : "Selecione um cliente"
                          } />
                        </SelectTrigger>
                        <SelectContent>
                          {suppliers?.map((supplier) => (
                            <SelectItem key={supplier.id} value={supplier.name}>
                              {supplier.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="itens"
              control={form.control}
              render={({ field: { onChange, value, ...rest }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="itens">
                     Itens 
                  </FieldLabel>
                  <Input
                    {... rest}
                    id="itens"
                    type="number"
                     value={value as number}                             
                    onChange={(e) => onChange(e.target.valueAsNumber)}  
                    aria-invalid={fieldState.invalid}
                    placeholder="itens"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
              />

          </form>
        </div>

        <SheetFooter>
          <Button type="submit" form="form-rhf-demo">
            {isPending ? <Spinner /> : "Cadastrar"}
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Sair</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}