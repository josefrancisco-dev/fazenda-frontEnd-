export type OrderStatus = 'Entregue' | 'Pendente' | 'Cancelado' | 'Em Trânsito';
export type StockLevel = 'Alto' | 'Médio' | 'Baixo';

export interface KPI {
  label: string;
  value: string;
  change: number;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  stockLevel: StockLevel;
}

export interface Order {
  id: string;
  number: string;
  date: string;
  customer: string;
  total: number;
  status: OrderStatus;
  items: number;
}

export interface Purchase {
  id: string;
  number: string;
  date: string;
  vendor: string;
  total: number;
  status: OrderStatus;
  items: number;
}

export interface Activity {
  id: string;
  type: 'order' | 'purchase' | 'stock' | 'system';
  message: string;
  timestamp: string;
  icon: string;
}

export interface MonthlySales {
  month: string;
  sales: number;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}
