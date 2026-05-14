import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { useCreateSupplier } from "@/quereis/useSupplier"
import { supplierSchema, type supplierSchemaTDO } from "@/schemas/supplier"
import type { Supplier } from "@/types/typesApi"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SheetUpdateSupllier({supplier, onClose} : {supplier :  Supplier, onClose :  VoidFunction }) {
  
  const {mutateAsync, isPending} = useCreateSupplier()

  const form =  useForm({
    resolver : zodResolver(supplierSchema),
     defaultValues :  {
        name:  supplier.name,
        role:  supplier.role,
        status:  supplier.status,
        // date: "",
        company:  supplier.company,
        email:  supplier.email,
        phone:  supplier.phone,
        nif: supplier.nif,
     }
  })

  const onSubmit = (data : supplierSchemaTDO) => {
    mutateAsync(data)
    .then(() => {
      form.reset()
      onClose()
    })
    .catch((err) => console.log(err));

    console.log("enviar dados :  ", data)
  } 

  return (
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
                  <FieldLabel htmlFor="status">Estado</FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="status" aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Selecione um estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Activo</SelectItem>
                      <SelectItem value="Customer">Cliente</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
            
          <Button
          //  type="submit" 
          // form = ""
          className="w-full"
          >
             {isPending ? <Spinner />: "Cadastrar" }
           </Button>
          </form>
        </div>
  )
}
