import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TableClients } from "../table"
import { ClientsGrid } from "../card"
import { useGetAllClient } from "@/quereis/client"


export function TabsClients() {

  const {data} = useGetAllClient()
  
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
        <TableClients
         data={data ?? []}
        />
      </TabsContent>

      <TabsContent value="Visualizar por Grade" className="mt-4 cursor-pointer">
        <ClientsGrid data={data ?? []}/>
      </TabsContent>
    </Tabs>
  )
}
