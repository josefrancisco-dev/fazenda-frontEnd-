import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TableStock } from "../table"
import { useGetAllStock } from "@/quereis/useStock"
import { useDebounce } from "@/hooks/useDeBounce"
import { useSearchQuery } from "@/hooks/useSearchQuery"
import { useGetAllOrders } from "@/quereis/useOrders"
import { TableStockOutput } from "../table/index copy"

export function TabsClients() {
  const {value} = useSearchQuery("q")
  const debouncedSearch = useDebounce(value, 400)
  
  const {data} = useGetAllStock(
    debouncedSearch ?  {q :  debouncedSearch} :  undefined
  )

  const {data :  orders} = useGetAllOrders(
      debouncedSearch ? {q : debouncedSearch} :  undefined
    )

  return (
   <Tabs defaultValue="Entrada">
      <TabsList variant="line">
        <TabsTrigger 
         value="Entrada"
         className="cursor-pointer"
        >
        Entrada
        </TabsTrigger>
        <TabsTrigger
         value="Saída"
         className="cursor-pointer"
         >
        Saída
        </TabsTrigger>
      </TabsList>

      <TabsContent value="Entrada" className="mt-4 cursor-pointer">
        <TableStock 
          data = {data ??  []}
        />
      </TabsContent>

      <TabsContent value="Saída" className="mt-4 cursor-pointer">
        <TableStockOutput
         order = {orders ?? []}
        />
      </TabsContent>
    </Tabs>
  )
}
