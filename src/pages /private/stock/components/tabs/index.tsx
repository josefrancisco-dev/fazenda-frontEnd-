import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TableStock } from "../table"
import { StockGrid } from "../card"
import { useGetAllStock } from "@/quereis/useStock"

export function TabsClients() {
  
  const {data} = useGetAllStock()

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
        <TableStock 
          data = {data ??  []}
        />
      </TabsContent>

      <TabsContent value="Visualizar por Grade" className="mt-4 cursor-pointer">
        <StockGrid/>
      </TabsContent>
    </Tabs>
  )
}
