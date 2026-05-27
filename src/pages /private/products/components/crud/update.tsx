import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import {updateProductSchema, type updateProductTDO } from "@/schemas/product"
import {  useUpdateProduct } from "@/quereis/useProduct"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDropzone } from "@/app/components/dropzone"
import type { Product } from "@/types/typesApi"
import { useGetAllCategory } from "@/quereis/useCategories"


export function SheetUpdateProduct({product, onClose} :  {product :  Product, onClose : VoidFunction}) {
  
  const { data: categories } =  useGetAllCategory()
  const {mutateAsync, isPending} = useUpdateProduct()

  const form =  useForm({
    resolver : zodResolver(updateProductSchema),
     defaultValues :  {
        name:  product.name,
        categoryId: product.category.id,
        price :  product.price,
        unit :  product.unit,  
     }
  })

  const onSubmit = (data : updateProductTDO) => {
    mutateAsync({id : product.id , data})
    .then(() => {
      form.reset()
      onClose()
    })
    .catch((err) => console.log(err));

  } 

  return (
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <form className="space-y-4" id = "form-rhf-demo"  onSubmit={form.handleSubmit(onSubmit)}>    
           
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">
                     Nome 
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nome"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

              <Controller
                  name="categoryId"
                  control={form.control}

                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="categoryId">
                        Categoria
                      </FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id="categoryId"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>

                        <SelectContent>

                          {categories?.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id}
                            >
                              {category.name}
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
                name="unit"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="unit">
                      Unidade  
                    </FieldLabel>
                    <Input
                      {...field}
                      id="unit"
                      aria-invalid={fieldState.invalid}
                      placeholder="unit"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                  name="price"
                  control={form.control}
                  render={({ field: { onChange, value, ...rest }, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="price">Preço</FieldLabel>
                      <Input
                        {...rest}
                        id="price"
                        type="number"        
                        min={0}
                        step={0.01}
                        value={value as number}                             
                        onChange={(e) => onChange(e.target.valueAsNumber)}  
                        aria-invalid={fieldState.invalid}
                        placeholder="Preço"
                        autoComplete="off"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

              <Controller
                name="image"
                control={form.control}
                render={({ field: { onChange }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Imagem</FieldLabel>
                    <FileDropzone
                      onFilesChange={(files) => onChange(files[0])} 
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

          <Button
          //  type="submit" 
          //  form = "form-rhf-demo"
          className="w-full"
           >
             {isPending ? <Spinner />: "Cadastrar" }
           </Button>
          </form>
        </div>
  )
}
