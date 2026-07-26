import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TableOrders } from "../table"
import { OrdersGrid } from "../card"
import { useGetAllOrders } from "@/quereis/useOrders"
import { useSearchQuery } from "@/hooks/useSearchQuery"
import { useDebounce } from "@/hooks/useDeBounce"
import { useSearchParams } from "react-router-dom"
import type { OrderStatus } from "@/constants/orders"

export function TabsClients() {
  const {value} = useSearchQuery("q")
  const debouncedSearch = useDebounce(value, 400)   
 
  const [searchParams] = useSearchParams()
  const status = (searchParams.get("status") ?? undefined) as OrderStatus | undefined
  const from = searchParams.get("from") ?? undefined
  const to = searchParams.get("to") ?? undefined

   const {data} = useGetAllOrders({
    ...(debouncedSearch && { q: debouncedSearch }),
     ...(status && { status }),
    ...(from && { from }),
    ...(to && { to }),
  })

  return (
   <Tabs defaultValue="Visualizar por Lista">
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

      <TabsContent value="Visualizar por Lista" className="mt-4 cursor-pointer">
        <TableOrders 
         data = {data ?? []}
        />
      </TabsContent>

      <TabsContent value="Visualizar por Grade" className="mt-4 cursor-pointer">
        <OrdersGrid
         data = {data ?? []}
        />
      </TabsContent>
    </Tabs>
  )
}
