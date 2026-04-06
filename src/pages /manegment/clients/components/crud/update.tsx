import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"
import {updateClientSchema,  type updateClientTDO } from "@/schemas/client"
import {Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {  useUpdateClient } from "@/quereis/client"
import { Spinner } from "@/components/ui/spinner"
import { FileDropzone } from "@/components/dropzone"
import type { Client } from "@/types/typesApi"




export function SheetUpdateClient({client, onClose} :  {client :  Client, onClose :  VoidFunction }) {
  
  const {mutateAsync, isPending} = useUpdateClient()

  const form =  useForm({
    resolver : zodResolver(updateClientSchema),
     defaultValues :  {
        name:  client.name,
        role:  client.role,
        status:  client.status,
        // date: "",
        company:  client.company,
        email: client.email,
        phone:  client.phone,
        nif: client.nif,
     }
  })

  const onSubmit = (data : updateClientTDO) => {
    mutateAsync({id : client.id , data})
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
            type="submit" 
            form = "form-rhf-demo"
            className="w-full"
            >
              {isPending ? <Spinner />: "Cadastrar" }
           </Button>
          </form>
        </div>

  )
}
