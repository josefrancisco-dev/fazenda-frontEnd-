import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TableShopping } from "../table"
import { ShoppingGrid } from "../card"
import { useGetAllShopping } from "@/quereis/useShopping"
import { useSearchQuery } from "@/hooks/useSearchQuery"
import { useDebounce } from "@/hooks/useDeBounce"

export function TabsClients() {

  const {value} = useSearchQuery("q")
  const debouncedSearch = useDebounce(value, 400)
 
  const {data}  = useGetAllShopping(
    debouncedSearch ?  {q :  debouncedSearch} : undefined
  )
  
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
        <TableShopping 
         data = {data ??  []}
        />
      </TabsContent>

      <TabsContent value="Visualizar por Grade" className="mt-4 cursor-pointer">
        <ShoppingGrid
         data = {data ??  []}
        />
      </TabsContent>
    </Tabs>
  )
}
