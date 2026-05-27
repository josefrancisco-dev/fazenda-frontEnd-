import { FilterBar } from "./components/filter";
import { TabsClients } from "./components/tabs";

export const metadata = {
  title: 'Visão Geral - Fazenda Girassol',
  description: 'Dashboard principal com KPIs e atividades recentes',
};

export function Orders() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pedidos</h1>
        </div>
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
