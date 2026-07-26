import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TableSuppliers } from "../table"
import { ClientsGrid } from "../card"
import { useGetAllSupplier } from "@/quereis/useSupplier"
import { useSearchQuery } from "@/hooks/useSearchQuery"
import { useDebounce } from "@/hooks/useDeBounce"
import { useMemo } from "react"
import { parse, parseISO } from "date-fns"
import { useSearchParams } from "react-router-dom"
import type { ClientStatus } from "@/types/typesApi"

export function TabsClients() {

  const {value} = useSearchQuery("q")
  const debouncedSearch = useDebounce(value, 400)


  const [searchParams] = useSearchParams()
     const status = (searchParams.get("status") ?? undefined) as ClientStatus | undefined
     const phone = searchParams.get("phone") ?? undefined
     const nif = searchParams.get("nif") ?? undefined
     const from = searchParams.get("from") ?? undefined
     const to = searchParams.get("to") ?? undefined
  
    const {data} = useGetAllSupplier({
      ...(debouncedSearch && { q: debouncedSearch }),
      ...(status && { status }),
      ...(phone && { phone }),
      ...(nif && { nif }),
    })
  
    const filteredData = useMemo(() => {
      if (!data) return []
      if (!from && !to) return data
  
      const fromDate = from ? parseISO(from) : undefined
      const toDate = to ? parseISO(to) : undefined
  
      return data.filter((client) => {
        const clientDate = parse(client.date, "dd/MM/yyyy", new Date())
        if (fromDate && clientDate < fromDate) return false
        if (toDate && clientDate > toDate) return false
        return true
      })
    }, [data, from, to])
  
 
  // const {data} = useGetAllSupplier(
  //   debouncedSearch ?  {q : debouncedSearch } :  undefined
  // )

  return (
   <Tabs defaultValue="Visualizar por Lista">
      {/* Botões de navegação */}
      <TabsList variant="line">
        <TabsTrigger 
         value="Visualizar por Lista"
         className="cursor-pointer"
        >
        Visualizar por Lista
        </TabsTrigger>
        <TabsTrigger
         value="Visualizar por Grade"
         className="cursor-pointer"
         >
         Visualizar por Grade
        </TabsTrigger>
      </TabsList>

      {/* Conteúdo de cada tab */}
      <TabsContent value="Visualizar por Lista" className="mt-4 cursor-pointer">
        <TableSuppliers 
         data={filteredData ?? []}
        />
      </TabsContent>

      <TabsContent value="Visualizar por Grade" className="mt-4 cursor-pointer">
        <ClientsGrid
         data = {filteredData ?? []}
        />
      </TabsContent>
    </Tabs>
  )
}
