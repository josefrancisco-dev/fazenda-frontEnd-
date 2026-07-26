// import {  Filter} from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { ExportDropdownClients } from '../export/export'
// import { SearchComponent } from '@/app/components/search'

// interface FilterBarProps {
//   searchPlaceholder?: string
//   onSearch?: (value: string) => void
//   onFilter?: () => void
//   onExport?: () => void
// }

// export function FilterBar({
//   onFilter,
// }: FilterBarProps) {
//   return (
//     <div className="flex items-center justify-between gap-3 w-full">
//       {/* Search */}
//        <SearchComponent/>

//       <div className='space-x-2'>
//         <Button variant="outline" onClick={onFilter} className="gap-2">
//             <Filter size={16} />
//             Filtrar
//         </Button>

//       <ExportDropdownClients/>
//       </div>
//     </div>
//   )
// }


import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { DateRange } from "react-day-picker";

import { ExportDropdownClients } from "../export/export";
import { SearchComponent } from "@/app/components/search";
import { StatusFilter, type StatusOption } from "@/pages /private/orders/components/filter/status";
import { DateFilter } from "./dataRange";



const DEFAULT_STATUS_OPTIONS: StatusOption[] = [
  { label: "Customer", value: "Customer", color: "#3b82f6" },
  { label: "Lead", value: "Lead", color: "#eab308" },
  { label: "Active", value: "Active", color: "#22c55e" },
];

function useFilterParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParam = useCallback(
    (updates: Record<string, string | null>) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === "" || value === "all") {
              params.delete(key);
            } else {
              params.set(key, value);
            }
          });
          return params;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const clearAll = useCallback(
    (keepKeys: string[] = []) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          [...params.keys()].forEach((key) => {
            if (!keepKeys.includes(key)) params.delete(key);
          });
          return params;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return { searchParams, setParam, clearAll };
}



interface FilterBarProps {
  statusOptions?: StatusOption[];
}

export function FilterBar({ statusOptions = DEFAULT_STATUS_OPTIONS }: FilterBarProps) {
  const [open, setOpen] = useState(false);
  const { searchParams, setParam, clearAll } = useFilterParams();

  const currentStatus = searchParams.get("status") ?? "all";
  const currentPhone = searchParams.get("phone") ?? "";
  const currentNif = searchParams.get("nif") ?? "";
  const currentFrom = searchParams.get("from");
  const currentTo = searchParams.get("to");

  const [phoneValue, setPhoneValue] = useState(currentPhone);
  const [nifValue, setNifValue] = useState(currentNif);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    currentFrom
      ? { from: new Date(currentFrom), to: currentTo ? new Date(currentTo) : undefined }
      : undefined
  );

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    setParam({
      from: range?.from ? range.from.toISOString().slice(0, 10) : null,
      to: range?.to ? range.to.toISOString().slice(0, 10) : null,
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (phoneValue !== currentPhone) setParam({ phone: phoneValue });
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (nifValue !== currentNif) setParam({ nif: nifValue });
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nifValue]);

  const activeCount = useMemo(() => {
    let count = 0;
    if (currentStatus !== "all") count += 1;
    if (currentPhone) count += 1;
    if (currentNif) count += 1;
    if (currentFrom) count += 1;
    return count;
  }, [currentStatus, currentPhone, currentNif, currentFrom]);

  const clearClientFilters = () => {
    setPhoneValue("");
    setNifValue("");
    setDateRange(undefined);
    // mantém "q" (pesquisa geral) e limpa o resto
    clearAll(["q"]);
  };

  return (
    <div className="flex items-center justify-between gap-3 w-full">
      <SearchComponent />

      <div className="flex items-center gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <Button variant="outline" onClick={() => setOpen(true)} className="gap-2">
            <Filter size={16} />
            Filtrar
            {activeCount > 0 && (
              <Badge className="ml-1 h-5 px-1.5 bg-[#c5d93a] text-[#163d28] hover:bg-[#c5d93a]">
                {activeCount}
              </Badge>
            )}
          </Button>

          <SheetContent side="right" className="w-[320px] sm:w-[380px] px-6">
            <SheetHeader className="px-0">
              <SheetTitle>Filtrar clientes</SheetTitle>
            </SheetHeader>

            <div className="mt-6 flex flex-col gap-6 px-0">
              <StatusFilter
                statusOptions={statusOptions}
                value={currentStatus}
                onChange={(value) => setParam({ status: value })}
              />

               <DateFilter
                label="Data de criação"
                value={dateRange}
                onChange={handleDateSelect}
              /> 

              {/* <TextFilter
                label="Telefone"
                placeholder="Pesquisar por telefone..."
                value={phoneValue}
                onChange={setPhoneValue}
              />

              <TextFilter
                label="NIF"
                placeholder="Pesquisar por NIF..."
                value={nifValue}
                onChange={setNifValue}
              />

              <DateFilter
                label="Data de criação"
                value={dateRange}
                onChange={handleDateSelect}
              /> 
              
              */}

              {activeCount > 0 && (
                <Button
                  variant="ghost"
                  onClick={clearClientFilters}
                  className="w-fit text-muted-foreground hover:text-foreground"
                >
                  <X className="mr-1 h-4 w-4" />
                  Limpar filtros
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <ExportDropdownClients />
      </div>
    </div>
  );
}
