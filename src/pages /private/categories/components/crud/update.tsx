import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import type { Category} from "@/types/typesApi"
import { Textarea } from "@/components/ui/textarea"
import { updateCategorySchema, type UpdateCategoryDTO } from "@/schemas/category"
import { useUpdateCategory } from "@/quereis/useCategories"


export function SheetUpdateProduct({category, onClose} :  {category :  Category, onClose : VoidFunction}) {
  
  const {mutateAsync, isPending} = useUpdateCategory()

  const form =  useForm({
    resolver : zodResolver(updateCategorySchema),
     defaultValues :  {
        name: category.name,
        description : category.description ??  " "
     }
  })

  const onSubmit = (data : UpdateCategoryDTO) => {
    mutateAsync({id : category.id , data})
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
            name="description"
            control={form.control}

            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>

                <FieldLabel htmlFor="description">
                  Descrição
                </FieldLabel>

                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  id="description"
                  placeholder="Descrição da categoria"
                  className="resize-none"
                  rows={4}
                />

                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                  />
                )}

              </Field>
            )}
          />


          <Button className="w-full" >
             {isPending ? <Spinner />: "Cadastrar" }
           </Button>
          </form>
        </div>
  )
}
