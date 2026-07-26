import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { Search, X} from 'lucide-react'
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

 
  const handleClear = () => {
    form.setValue("q", "");
    setValue("");
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
                <div className="relative">
                  <Input
                      {...field}
                      id="q"
                      aria-invalid={fieldState.invalid}
                      placeholder="Pesquisar"
                      autoComplete="off"
                      className="pr-8"
                  />
                  {field.value && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:text-foreground hover:bg-muted"
                      aria-label="Limpar pesquisa"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
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