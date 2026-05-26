import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TableProducts } from "../table"
import { useGetAllCategory } from "@/quereis/useCategories"
import { CategoryGrid } from "../card"

export function TabsClients() {

  const {data} = useGetAllCategory()

  return (
   <Tabs defaultValue="Visualizar por Grade">
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

      <TabsContent value="Visualizar por Lista" className="mt-4 cursor-pointer">
        <TableProducts 
         data  = {data ?? []}
        />
      </TabsContent>

      <TabsContent value="Visualizar por Grade" className="mt-4 cursor-pointer">
        <CategoryGrid
          data  = {data ?? []}
        />
      </TabsContent>
    </Tabs>
  )
}
