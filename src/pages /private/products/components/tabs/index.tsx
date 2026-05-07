import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TableProducts } from "../table"
import { ProductsGrid } from "../card"
import { useGetAllProduct } from "@/quereis/useProduct"

export function TabsClients() {
  
  const {data} = useGetAllProduct()

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

      {/* Conteúdo de cada tab */}
      <TabsContent value="Visualizar por Lista" className="mt-4 cursor-pointer">
        <TableProducts 
         data  = {data ?? []}
        />
      </TabsContent>

      <TabsContent value="Visualizar por Grade" className="mt-4 cursor-pointer">
        <ProductsGrid
          data  = {data ?? []}
        />
      </TabsContent>
    </Tabs>
  )
}
