  import { useUserStore } from "@/stores/useUserStore";
  import { TabsClients } from "./components/tabs";
import { PERMISSION } from "@/constants/constants";
import { SheetCreateCategory } from "./components/crud/create";

  export const metadata = {
    title: 'Visão Geral - Fazenda Girassol',
    description: 'Dashboard principal com KPIs e atividades recentes',
  };

  export function Categories() {
   const { user } = useUserStore();
   const userRole = user?.role  === PERMISSION.Admin;
  
    return (
      <div className="p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Categotias</h1>
          </div>

          {userRole && (
          <SheetCreateCategory />
           )}
        </div>

        {/* Activities */}
        <div className="">
          <TabsClients />
        </div>
      </div>
    );
  }
