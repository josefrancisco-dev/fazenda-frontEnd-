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
import {Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { productSchema, type ProductTDO } from "@/schemas/product"
import { useCreateProduct } from "@/quereis/useProduct"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDropzone } from "@/app/components/dropzone"
import { useGetAllCategory } from "@/quereis/useCategories"

export function SheetCreateProduct() {

  const { data: categories } =  useGetAllCategory()
  const {mutateAsync, isPending} = useCreateProduct()


  const form =  useForm({
    resolver : zodResolver(productSchema),
     defaultValues :  {
        name:   "",
        banner:  "",
        emoji:   "",
     }
  })

  const onSubmit = (data : ProductTDO) => {
    mutateAsync(data)
    .then(() => {
      form.reset()
    })
    .catch((err) => {
      if (err?.response?.status === 400) {
        form.setError("name", {
          type: "manual",
          message: err.response.data.message, 
        })
      }
    })
  } 

  return (
    <Sheet>
      <SheetTrigger asChild>
         <Button >Adicionar Produto</Button> 
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar Produto</SheetTitle>
          <SheetDescription>
            Preecha os dados do cliente e clica em salvar 
          </SheetDescription>
        </SheetHeader>

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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger
                        id="unit"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Selecione a unidade" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="g">g</SelectItem>
                          <SelectItem value="l">l</SelectItem>
                          <SelectItem value="dz">dz</SelectItem>
                        </SelectContent>
                    </Select>
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
              name="emoji"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="emoji">
                     Emoji 
                  </FieldLabel>
                  <Input
                    {...field}
                    id="emoji"
                    aria-invalid={fieldState.invalid}
                    placeholder="Emoji"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
                name="banner"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="banner">
                      Banner 
                    </FieldLabel>
                    <Input
                      {...field}
                      id="banner"
                      aria-invalid={fieldState.invalid}
                      placeholder="Banner"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                      onFilesChange={(files) => onChange(files[0])} // 👈 passa o File para o form
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

          </form>
        </div>

        <SheetFooter>
          <Button
           type="submit" 
           form = "form-rhf-demo">
             {isPending ? <Spinner />: "Cadastrar" }
           </Button>
          <SheetClose asChild>
            <Button variant="outline">Sair</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
