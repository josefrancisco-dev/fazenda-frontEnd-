import { mockKPIs } from "@/lib/mockData";
import KPICard from "./cards";
import { SalesChart } from "./chart";
import WeatherWidget from "./weatherWidget";
import { TableDashboard } from "./table";
import { useGetMe } from "@/quereis/useAuth";
import { useUserStore } from "@/stores/useUserStore";


export const metadata = {
  title: 'Visão Geral - Fazenda Girassol',
  description: 'Dashboard principal da Fazenda Girassol',
};

export function DashboardAdmin() {

  const { data: response } = useGetMe();
  const { user } = useUserStore();
  const accessLevel = user?.role ?? "";  
     
  const data = response as any;
  const userName = data?.client?.name || "Usuário";

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Visão Geral</h1>
        <p className="text-muted-foreground mt-2"> {userName} Bem-vindo ao seu dashboard</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockKPIs.map((kpi) => (
          <KPICard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 flex">
            <SalesChart className="flex-1" />
          </div>
          <div className="lg:col-span-1 flex">
            <WeatherWidget className="flex-1" />
          </div>
      </div>

      {/* Activities */}
      <div className="">
         <TableDashboard /> 
      </div>
    </div>
  );
}
