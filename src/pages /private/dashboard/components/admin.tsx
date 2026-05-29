// import { mockKPIs } from "@/lib/mockData";
// import KPICard from "./cards";
// import { SalesChart } from "./chart";
// import WeatherWidget from "./weatherWidget";
// import { TableDashboard } from "./table";
// import { useGetMe } from "@/quereis/useAuth";

// export const metadata = {
//   title: 'Visão Geral - Fazenda Girassol',
//   description: 'Dashboard principal da Fazenda Girassol',
// };

// export function DashboardAdmin() {

//   const { data: response } = useGetMe();
     
//   const data = response as any;
//   const userName = data?.client?.name || "Usuário";

//   return (
//     <div className="p-4 md:p-8 space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">Visão Geral</h1>
//         <p className="text-muted-foreground mt-2"> {userName} Bem-vindo ao seu dashboard</p>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {mockKPIs.map((kpi) => (
//           <KPICard key={kpi.label} kpi={kpi} />
//         ))}
//       </div>

//       {/* Main Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
//           <div className="lg:col-span-2 flex">
//             <SalesChart className="flex-1" />
//           </div>
//           <div className="lg:col-span-1 flex">
//             <WeatherWidget className="flex-1" />
//           </div>
//       </div>

//       {/* Activities */}
//       <div className="">
//          <TableDashboard /> 
//       </div>
//     </div>
//   );
// }

import KPICard from "./cards"
import { SalesChart } from "./chart"
import WeatherWidget from "./weatherWidget"
import { TableDashboard } from "./table"
import { useGetMe } from "@/quereis/useAuth"
import { useDashboardOverview } from "@/quereis/useDashboard"

export function DashboardAdmin() {
  const { data: response } = useGetMe()
  const { data: overview, isLoading } = useDashboardOverview()

  const data     = response as any
  const userName = data?.client?.name || "Usuário"

  const kpis = [
    {
      label:  "Receita Total",
      value:  `AO ${overview?.receita_total.toLocaleString("pt-PT") ?? 0}`,
      change: 12.5,
      icon:   "TrendingUp",
    },
    {
      label:  "Total de Pedidos",
      value:  String(overview?.total_pedidos ?? 0),
      change: 8.2,
      icon:   "ShoppingCart",
    },
    {
      label:  "Compras",
      value:  String(overview?.total_compras ?? 0),
      change: -3.1,
      icon:   "Package",
    },
    {
      label:  "Estoque Baixo",
      value:  String(overview?.estoque_baixo ?? 0),
      change: 15.3,
      icon:   "AlertCircle",
    },
  ]

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Visão Geral</h1>
        <p className="text-muted-foreground mt-2">{userName} Bem-vindo ao seu dashboard</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 animate-pulse h-32" />
            ))
          : kpis.map((kpi) => <KPICard key={kpi.label} kpi={kpi} />)
        }
      </div>

      {/* Chart + Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex">
          <SalesChart className="flex-1" />
        </div>
        <div className="lg:col-span-1 flex">
          <WeatherWidget className="flex-1" />
        </div>
      </div>

      {/* Activities */}
      <div>
        <TableDashboard />
      </div>
    </div>
  )
}