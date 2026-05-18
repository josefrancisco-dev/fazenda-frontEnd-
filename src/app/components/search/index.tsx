import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { Search} from 'lucide-react'
import { Controller, useForm } from "react-hook-form";


interface SearchFormValues {
    q :  string
}

export function SearchComponent() {
  const { value, setValue } = useSearchQuery("q");

  const form = useForm<SearchFormValues>({
    defaultValues: {
      q: value,
    },
  });

  const onSubmit = (data: SearchFormValues) => {
    setValue(data.q);
  };

    return (
    <div >
        <form 
         className="flex items-center justify-center gap-2"
         onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
                name="q"
                control={form.control}
                render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                <Input
                    {...field}
                    id="q"
                    aria-invalid={fieldState.invalid}
                    placeholder="Pesquisar"
                    autoComplete="off"
                />
                {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                )}
                </Field> 
                )}
            />
            <Button variant="outline">
                <Search size={16} />
                Pesquisar
            </Button>
        </form>
     </div>
    )
}