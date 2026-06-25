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
import { clientSchema, type clientSchemaTDO } from "@/schemas/client"
import {Controller, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { useCreateClient } from "@/quereis/useClient"
import { Spinner } from "@/components/ui/spinner"
import { FileDropzone } from "@/app/components/dropzone"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SheetCreateClient() {
  
  const {mutateAsync, isPending} = useCreateClient()

  const form =  useForm({
    resolver : zodResolver(clientSchema),
     defaultValues :  {
        name:  "",
        role:  "Client",
        status:  "Active",
        // date: "",
        email: "",
        phone:  "",
        nif: "",
     }
  })

  const isCorporativo = useWatch({ control: form.control, name: "isCorporative" }) === "Corporativo"

  const onSubmit = (data : clientSchemaTDO) => {
    mutateAsync(data)
    .then(() => {
      form.reset()
    })
    .catch((err) => console.log(err));
  } 

  return (
    <Sheet>
      <SheetTrigger asChild>
         <Button >Adicionar Cliente</Button> 
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar Cliente</SheetTitle>
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
            

            {isCorporativo && (
              <Controller
                name="nif"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="nif">NIF</FieldLabel>
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
            )}
       
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
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">
                     Senha  
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Senha"
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
              <FieldLabel htmlFor="role">Função</FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="role" aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Client">Cliente</SelectItem>
                  <SelectItem value="Admin">Administrador</SelectItem>
                  <SelectItem value="Commercial_Manager">Gestor Comercial</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
          /> 
 
            <Controller
            name="isCorporative"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="isCorporative">Tipo de utilizador</FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger
                    id="categoryId"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Selecione o Tipo de utilizador" />
                  </SelectTrigger>

                  <SelectContent>
                      <SelectItem value="Singular">Singular </SelectItem>
                      <SelectItem value="Corporativo">Comporativo</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
