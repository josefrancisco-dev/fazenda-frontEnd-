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

import {
  Controller,
  useForm,
} from "react-hook-form"

import { zodResolver }
from "@hookform/resolvers/zod"

import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

import { Spinner }
from "@/components/ui/spinner"

import {
  useCreateCategory,
} from "@/quereis/useCategories"

import {
  categorySchema,
  type CreateCategoryDTO
} from "@/schemas/category"
import { Textarea } from "@/components/ui/textarea"

export function SheetCreateCategory() {

  const {
    mutateAsync,
    isPending,
  } = useCreateCategory()

  const form = useForm<CreateCategoryDTO>({
    resolver: zodResolver(categorySchema),

    defaultValues: {
      name: "",
      description: "",
    }
  })

  const onSubmit = async (
    data: CreateCategoryDTO
  ) => {

    await mutateAsync(data)

    form.reset()
  }

  return (
    <Sheet>

      <SheetTrigger asChild>
        <Button>
          Adicionar Categoria
        </Button>
      </SheetTrigger>

      <SheetContent>

        <SheetHeader>
          <SheetTitle>
            Criar Categoria
          </SheetTitle>

          <SheetDescription>
            Adicione uma nova categoria
          </SheetDescription>
        </SheetHeader>

        <form
          id="create-category-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 px-4 py-6"
        >

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
                  placeholder="Categoria"
                />

                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                  />
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

        </form>

        <SheetFooter>

          <Button
            type="submit"
            form="create-category-form"
          >
            {isPending
              ? <Spinner />
              : "Salvar"}
          </Button>

          <SheetClose asChild>
            <Button variant="outline">
              Fechar
            </Button>
          </SheetClose>

        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}