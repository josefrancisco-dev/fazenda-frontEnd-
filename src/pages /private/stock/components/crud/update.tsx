import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {updateStockSchema, type updateStockTDO } from "@/schemas/stock"
import { useUpdateStock } from "@/quereis/useStock"
import { useGetAllProducts } from "@/quereis/useProduct"
import type { Stock } from "@/types/typesApi"

export function SheetUpdateStock({ stock, onClose }: { stock: Stock, onClose: VoidFunction }) {
  const { mutateAsync, isPending } = useUpdateStock()
  const { data: products, isLoading: productsLoading } = useGetAllProducts()

  const form = useForm<updateStockTDO>({
    resolver: zodResolver(updateStockSchema), 
    defaultValues: {
      quantity: stock.quantity,
      productId: String(stock.productId), 
    }
  })

  const watchedProductId = form.watch("productId")
  const watchedQuantity = form.watch("quantity")

  const selectedProduct = products?.find(p => p.id === (watchedProductId ?? String(stock.productId)))

  const onSubmit = async (data: updateStockTDO) => {
  const selectedProduct = products?.find(p => p.id === data.productId)

  if (!selectedProduct) return

  await mutateAsync({
    id: String(stock.id),  
    data: {
      quantity: data.quantity!,
      productId: data.productId!,
      value_Total: selectedProduct.price * data.quantity!,
    }
  })

  form.reset()
  onClose()
}

  return (
    <div className="grid flex-1 auto-rows-min gap-6 px-4">
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>

        <Controller
          name="productId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel htmlFor="productId">Produto</FieldLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={productsLoading}
              >
                <SelectTrigger id="productId" aria-invalid={!!fieldState.error}>
                  <SelectValue placeholder="Selecione um produto" />
                </SelectTrigger>
                <SelectContent>
                  {products?.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="quantity"
          control={form.control}
          render={({ field: { onChange, value, ...rest }, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel htmlFor="quantity">Quantidade</FieldLabel>
              <Input
                {...rest}
                id="quantity"
                type="number"
                min={0}
                step={1}
                value={value ?? ""}
                onChange={(e) => onChange(e.target.valueAsNumber)}
                aria-invalid={!!fieldState.error}
                placeholder="0"
                autoComplete="off"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {(watchedProductId || (watchedQuantity && watchedQuantity > 0)) && (
          <div className="mt-4 p-3 bg-muted rounded-md space-y-1">
            <p className="text-sm font-medium">Resumo:</p>
            {selectedProduct && (
              <>
                <p className="text-sm text-muted-foreground">
                  Produto: {selectedProduct.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Preço unitário:{" "}
                  {selectedProduct.price.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                </p>
              </>
            )}
            {watchedQuantity && watchedQuantity > 0 && selectedProduct && (
              <p className="text-sm font-semibold mt-2">
                Valor Total:{" "}
                {(selectedProduct.price * watchedQuantity).toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
              </p>
            )}
          </div>
        )}

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? <Spinner /> : "Atualizar Estoque"}
        </Button>

      </form>
    </div>
  )
}