import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { stockSchema, type StockTDO, type CreateStockRequest } from "@/schemas/stock"
import { useCreateStock } from "@/quereis/useStock"
import { useGetAllProduct } from "@/quereis/useProduct"
import type { Stock } from "@/types/typesApi"



export function SheetUpdateStock({stock, onClose} :  {stock :  Stock, onClose :  VoidFunction })  {
  const { mutateAsync, isPending } = useCreateStock()
  const { data: products, isLoading: productsLoading } = useGetAllProduct() 

  const form = useForm<StockTDO>({
    resolver: zodResolver(stockSchema),
    defaultValues: {
      quantity: stock.quantity,
      productId: String(stock.productId),
    }
  })

  const onSubmit = async (data: StockTDO) => {
    const selectedProduct = products?.find(p => p.id === data.productId)
    
    if (!selectedProduct) {
      console.error("Produto não encontrado")
      return
    }

    const value_Total = selectedProduct.price * data.quantity

    const stockData: CreateStockRequest = {
      quantity: data.quantity,
      productId: data.productId,
      value_Total: value_Total
    }

    await mutateAsync(stockData)
    form.reset()
    onClose()
  }

  return (
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <form className="space-y-4" id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            
            {/* Seleção de Produto */}
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
                          {/* {product.name} - {product.unit} - {product.price.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })} */}
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
                  <FieldLabel htmlFor="quantity">Quantidade Inicial</FieldLabel>
                  <Input
                    {...rest}
                    id="quantity"
                    type="number"
                    min={0}
                    step={1}
                    value={value}
                    onChange={(e) => onChange(e.target.valueAsNumber)}
                    aria-invalid={!!fieldState.error}
                    placeholder="0"
                    autoComplete="off"
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {form.watch("productId") && form.watch("quantity") > 0 && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-sm font-medium">Resumo:</p>
                <p className="text-sm text-muted-foreground">
                  Produto: {products?.find(p => p.id === form.watch("productId"))?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Preço unitário: {(products?.find(p => p.id === form.watch("productId"))?.price || 0).toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                </p>
                <p className="text-sm font-semibold mt-2">
                  Valor Total do Estoque: {((products?.find(p => p.id === form.watch("productId"))?.price || 0) * form.watch("quantity")).toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                </p>
              </div>
            )}

            <Button 
              // type="submit" 
              // form="form-rhf-demo"
              disabled={isPending || !form.watch("productId") || form.watch("quantity") <= 0}
            >
              {isPending ? <Spinner /> : "Cadastrar Estoque"}
            </Button>
          </form>
        </div>
  )
}