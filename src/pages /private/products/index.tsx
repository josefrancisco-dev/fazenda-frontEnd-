  import { useUserStore } from "@/stores/useUserStore";
import { SheetCreateProduct } from "./components/crud/creat";
  import { FilterBar } from "./components/filter";
  import { TabsClients } from "./components/tabs";
import { PERMISSION } from "@/constants/constants";

  export const metadata = {
    title: 'Visão Geral - Fazenda Girassol',
    description: 'Dashboard principal com KPIs e atividades recentes',
  };

  export function Products() {
   const { user } = useUserStore();
   const userRole = user?.role  === PERMISSION.Admin;
  
    return (
      <div className="p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
          </div>

          {userRole && (
          <SheetCreateProduct />
           )}
        </div>

        <div >
          <FilterBar
            searchPlaceholder="Pesquisar produtos..."
            onSearch={(value) => console.log(value)}
            onFilter={() => console.log('abrir filtros')}
            onExport={() => console.log('exportar')}
          />
        </div>

        {/* Activities */}
        <div className="">
          <TabsClients />
        </div>
      </div>
    );
  }
