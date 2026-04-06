import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TableProducts } from "../table"
import { OrdersGrid } from "../card"
import { useGetAllOrders } from "@/quereis/orders"

export function TabsClients() {
 
  const {data} = useGetAllOrders()

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
        <TableProducts 
         data = {data ?? []}
        />
      </TabsContent>

      <TabsContent value="Visualizar por Grade" className="mt-4 cursor-pointer">
        <OrdersGrid/>
      </TabsContent>
    </Tabs>
  )
}
