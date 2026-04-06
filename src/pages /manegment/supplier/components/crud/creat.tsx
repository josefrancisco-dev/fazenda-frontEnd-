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
import { useCreateSupplier } from "@/quereis/supplier"
import { supplierSchema, type supplierSchemaTDO } from "@/schemas/supplier"

export function SheetCreateSupplier() {
  
  const {mutateAsync, isPending} = useCreateSupplier()

  const form =  useForm({
    resolver : zodResolver(supplierSchema),
     defaultValues :  {
        name:  "",
        role:  "",
        status:  "Customer",
        // date: "",
        company:  "",
        email: "",
        phone:  "",
        nif: "",
     }
  })

  const onSubmit = (data : supplierSchemaTDO) => {
    mutateAsync(data)
    .then(() => {
      form.reset()
    })
    .catch((err) => console.log(err));

    console.log("enviar dados :  ", data)
  } 

  return (
    <Sheet>
      <SheetTrigger asChild>
         <Button >Adicionar Fornecedor</Button> 
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar Fornecedor</SheetTitle>
          <SheetDescription>
            Preecha os dados do fornecedor e clica em salvar 
          </SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <form className="space-y-4" id = "form-rhf-demo"  onSubmit={form.handleSubmit(onSubmit)}>    
            <Controller
              name="company"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="company">
                     Nome 
                  </FieldLabel>
                  <Input
                    {...field}
                    id="company"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nome da empresa"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="nif"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="nif">
                     NIF 
                  </FieldLabel>
                  <Input
                    {...field}
                    id="nif"
                    aria-invalid={fieldState.invalid}
                    placeholder="NIF"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

             <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">
                     Emial 
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

              <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">
                     Representante 
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Representante"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

      
            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="frole">
                     Cargo 
                  </FieldLabel>
                  <Input
                    {...field}
                    id="role"
                    aria-invalid={fieldState.invalid}
                    placeholder="Cargo"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />


            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">
                     Telefone 
                  </FieldLabel>
                  <Input
                    {...field}
                    id="phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="Telefone"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="status">
                     Estado 
                  </FieldLabel>
                  <Input
                    {...field}
                    id="status"
                    aria-invalid={fieldState.invalid}
                    placeholder="Estado"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="avatar"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="avatar">
                     Logotipo da empresa 
                  </FieldLabel>
                  <Input
                    {...field}
                    id="avatar"
                    type="file"
                    aria-invalid={fieldState.invalid}
                    placeholder="Foto"
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
