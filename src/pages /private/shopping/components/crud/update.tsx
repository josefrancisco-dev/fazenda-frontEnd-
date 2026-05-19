import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import {updateShoppingSchema,  type updateShoppingTDO } from "@/schemas/shopping"
import { useUpdateShopping } from "@/quereis/useShopping"
import { Plus, Trash2 } from "lucide-react"
import { useGetAllSupplier } from "@/quereis/useSupplier"
import type { Shopping } from "@/types/typesApi"


export function SheetUpdateSuplier({shopping, onClose }: {shopping :  Shopping, onClose :  VoidFunction}) {

  const { mutateAsync, isPending } = useUpdateShopping()
  const { data: suppliers } = useGetAllSupplier()

  const form = useForm<updateShoppingTDO>({
    resolver: zodResolver(updateShoppingSchema),
    defaultValues: {
      status: shopping.status,
      items: shopping.items,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  const items = useWatch({ control: form.control, name: "items" }) 

  const total = items?.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.price || 0), 0
  )

  const onSubmit = (data: updateShoppingTDO) => {
    mutateAsync({id : shopping.id, data})
      .then(() => {
       form.reset() 
       onClose()
      })
      .catch((err) => console.log(err))
  }

  return (
        <div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-y-auto">
          <form
            className="space-y-4"
            id="form-rhf-demo"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Fornecedor */}
            <Controller
              name="supplierId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="supplier">Fornecedor</FieldLabel>
                  <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!suppliers || suppliers.length === 0} 
                      >
                        <SelectTrigger id="supplier" aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder={
                            !suppliers || suppliers.length === 0
                              ? "Nenhum fornecedor cadastrado" 
                              : "Selecione um fornecedor"
                          } />
                        </SelectTrigger>
                        <SelectContent>
                          {suppliers?.map((supplier) => (
                            <SelectItem key={supplier.id} value={supplier.id}>
                              {supplier.company}
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

            {/* Itens */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <FieldLabel>Itens</FieldLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ name: "", quantity: 1, price: 0 })}
                >
                  <Plus size={14} className="mr-1" />
                  Adicionar item
                </Button>
              </div>

              {/* Cabeçalho */}
              <div className="grid grid-cols-[1fr_70px_90px_32px] gap-2 text-xs text-slate-400 px-1">
                <span>Nome</span>
                <span>Qtd</span>
                <span>Preço (AO)</span>
                <span />
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-[1fr_70px_90px_32px] gap-2 items-start"
                >
                  <Controller
                    name={`items.${index}.name`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...field}
                          placeholder="Nome"
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name={`items.${index}.quantity`}
                    control={form.control}
                    render={({ field: { onChange, value, ...rest }, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...rest}
                          type="number"
                          min={1}
                          value={value}
                          onChange={(e) => onChange(e.target.valueAsNumber)}
                          aria-invalid={fieldState.invalid}
                        />
                      </Field>
                    )}
                  />

                  <Controller
                    name={`items.${index}.price`}
                    control={form.control}
                    render={({ field: { onChange, value, ...rest }, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...rest}
                          type="number"
                          min={0}
                          step={0.01}
                          value={value}
                          onChange={(e) => onChange(e.target.valueAsNumber)}
                          aria-invalid={fieldState.invalid}
                        />
                      </Field>
                    )}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-400 hover:text-red-600 size-8 mt-0.5"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 border border-slate-200">
              <span className="text-sm text-slate-500">Total da compra</span>
              <span className="font-semibold text-slate-800">
              AO {(total ?? 0).toFixed(2).replace('.', ',')}
              </span>
            </div>

          <Button 
          type="submit" 
          form="form-rhf-demo"
          className="w-full"
          >
            {isPending ? <Spinner /> : "Cadastrar"}
          </Button>
          </form>
        </div>
  )
}