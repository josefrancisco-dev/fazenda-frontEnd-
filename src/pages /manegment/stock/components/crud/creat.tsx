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
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { stockSchema, type StockTDO, type CreateStockRequest } from "@/schemas/stock"
import { useCreateStock } from "@/quereis/stock"
import { useGetAllProduct } from "@/quereis/product"

export function SheetCreateStock() {
  const { mutateAsync, isPending } = useCreateStock()
  const { data: products, isLoading: productsLoading } = useGetAllProduct() 

  const form = useForm<StockTDO>({
    resolver: zodResolver(stockSchema),
    defaultValues: {
      quantity: 0,
      productId: "",
    }
  })

  const onSubmit = async (data: StockTDO) => {
    // Buscar o produto selecionado para obter o preço
    const selectedProduct = products?.find(p => p.id === data.productId)
    
    if (!selectedProduct) {
      console.error("Produto não encontrado")
      return
    }

    // Calcular o value_Total (quantidade * preço do produto)
    const value_Total = selectedProduct.price * data.quantity

    // Preparar os dados para a API com o tipo correto
    const stockData: CreateStockRequest = {
      quantity: data.quantity,
      productId: data.productId,
      value_Total: value_Total
    }

    // Enviar para a API
    await mutateAsync(stockData)
    form.reset()
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Adicionar Estoque</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar Estoque</SheetTitle>
          <SheetDescription>
            Selecione o produto e informe a quantidade inicial em estoque
          </SheetDescription>
        </SheetHeader>

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

            {/* Quantidade */}
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
                    value={value || 0}
                    onChange={(e) => onChange(e.target.valueAsNumber)}
                    aria-invalid={!!fieldState.error}
                    placeholder="0"
                    autoComplete="off"
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Informação adicional */}
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
          </form>
        </div>

        <SheetFooter>
          <Button 
            type="submit" 
            form="form-rhf-demo"
            disabled={isPending || !form.watch("productId") || form.watch("quantity") <= 0}
          >
            {isPending ? <Spinner /> : "Cadastrar Estoque"}
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Sair</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}