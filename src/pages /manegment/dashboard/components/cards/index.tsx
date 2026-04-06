import type { KPI } from '@/lib/types';
import { TrendingUp, TrendingDown, ShoppingCart, Package, AlertCircle } from 'lucide-react';

interface KPICardProps {
  kpi: KPI;
}

export default function KPICard({ kpi }: KPICardProps) {
  const isPositive = kpi.change >= 0;

  const getIcon = () => {
    switch (kpi.icon) {
      case 'TrendingUp':  return <TrendingUp   size={28} className="text-blue-500"  />;
      case 'ShoppingCart': return <ShoppingCart size={28} className="text-purple-500"/>;
      case 'Package':  return <Package      size={28} className="text-orange-500"/>;
      case 'AlertCircle': return <AlertCircle  size={28} className="text-yellow-500"/>;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-500 text-sm font-medium mb-2">{kpi.label}</p>
          <p className="text-2xl font-bold text-slate-800">{kpi.value}</p>
        </div>
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm font-medium ${
          isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {Math.abs(kpi.change)}%
        </span>
        <span className="text-slate-400 text-xs">vs mês anterior</span>
      </div>
    </div>
  );
}