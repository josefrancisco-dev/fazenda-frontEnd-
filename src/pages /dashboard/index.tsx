
// import KPICard from '@/components/kpi-card';
// import SalesChart from '@/components/sales-chart';
// import ActivityFeed from '@/components/activity-feed';
// import WeatherWidget from '@/components/weather-widget';

import { mockKPIs } from "../../lib/mockData";
import KPICard from "./cards";

export const metadata = {
  title: 'Visão Geral - Fazenda Girassol',
  description: 'Dashboard principal com KPIs e atividades recentes',
};

export function Dashboard() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Visão Geral</h1>
        <p className="text-muted-foreground mt-2">Bem-vindo ao dashboard da Fazenda Girassol</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockKPIs.map((kpi) => (
          <KPICard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts */}
        {/* <div className="lg:col-span-2">
          <SalesChart data={mockMonthlySales} />
        </div> */}

        {/* Weather Widget */}
        {/* <div>
          <WeatherWidget />
        </div> */}
      </div>

      {/* Activities */}
      {/* <div>
        <ActivityFeed activities={mockActivities} />
      </div> */}
    </div>
  );
}
