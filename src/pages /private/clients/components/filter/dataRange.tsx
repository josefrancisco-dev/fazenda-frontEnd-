import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

interface DateFilterProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  label?: string;
  placeholder?: string;
  numberOfMonths?: number;
}

export function DateFilter({
  value,
  onChange,
  label = "Período",
  placeholder = "Selecionar período",
  numberOfMonths = 1,
}: DateFilterProps) {
  const step = !value?.from
    ? "Selecione a data de início"
    : !value?.to
    ? "Agora selecione a data de fim"
    : null;

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "dd/MM/yyyy")} – {format(value.to, "dd/MM/yyyy")}
                </>
              ) : (
                <>{format(value.from, "dd/MM/yyyy")} – ...</>
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {step && (
            <div className="border-b px-3 py-2 text-center text-xs font-medium text-muted-foreground">
              {step}
            </div>
          )}
          <Calendar
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={numberOfMonths}
            locale={pt}
          />
          {value?.from && (
            <div className="flex items-center justify-between gap-2 border-t px-3 py-2">
              <span className="text-xs text-muted-foreground">
                {value.from && format(value.from, "dd/MM/yyyy")}
                {value.to && ` – ${format(value.to, "dd/MM/yyyy")}`}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => onChange(undefined)}
              >
                Limpar
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

