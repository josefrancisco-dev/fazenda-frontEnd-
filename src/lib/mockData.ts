import type { KPI, Product, Order, Purchase, Activity, MonthlySales } from './types';

export const mockKPIs: KPI[] = [
  { label: 'Receita Total', value: 'R$ 45.230', change: 12.5, icon: 'TrendingUp' },
  { label: 'Total de Pedidos', value: '128', change: 8.2, icon: 'ShoppingCart' },
  { label: 'Compras', value: '35', change: -3.1, icon: 'Package' },
  { label: 'Estoque Baixo', value: '12', change: 15.3, icon: 'AlertCircle' },
];

export const mockProducts: Product[] = [
  { id: '1', name: 'Milho Orgânico', category: 'Grãos', quantity: 450, unit: 'kg', price: 3.50, stockLevel: 'Alto' },
  { id: '2', name: 'Feijão Carioca', category: 'Grãos', quantity: 120, unit: 'kg', price: 5.20, stockLevel: 'Médio' },
  { id: '3', name: 'Tomate Cherry', category: 'Frutas', quantity: 35, unit: 'crates', price: 8.75, stockLevel: 'Baixo' },
  { id: '4', name: 'Alface Crespa', category: 'Verduras', quantity: 280, unit: 'unidades', price: 2.15, stockLevel: 'Alto' },
  { id: '5', name: 'Cenoura Roxa', category: 'Verduras', quantity: 95, unit: 'kg', price: 4.30, stockLevel: 'Médio' },
  { id: '6', name: 'Abóbora Cabotiá', category: 'Verduras', quantity: 45, unit: 'unidades', price: 6.80, stockLevel: 'Médio' },
  { id: '7', name: 'Ovo Orgânico', category: 'Proteína', quantity: 28, unit: 'dúzias', price: 7.50, stockLevel: 'Baixo' },
  { id: '8', name: 'Mel Silvestre', category: 'Processado', quantity: 85, unit: 'L', price: 25.00, stockLevel: 'Alto' },
];

export const mockOrders: Order[] = [
  { id: '1', number: 'PED-001245', date: '2024-03-17', customer: 'Supermercado Central', total: 2450.50, status: 'Entregue', items: 15 },
  { id: '2', number: 'PED-001244', date: '2024-03-16', customer: 'Feira do Bairro', total: 1890.00, status: 'Em Trânsito', items: 12 },
  { id: '3', number: 'PED-001243', date: '2024-03-16', customer: 'Restaurante Sabor', total: 3120.75, status: 'Pendente', items: 18 },
  { id: '4', number: 'PED-001242', date: '2024-03-15', customer: 'Loja Orgânica Verde', total: 1560.25, status: 'Entregue', items: 9 },
  { id: '5', number: 'PED-001241', date: '2024-03-15', customer: 'Cooperativa Local', total: 4220.00, status: 'Cancelado', items: 22 },
];

export const mockPurchases: Purchase[] = [
  { id: '1', number: 'COM-000451', date: '2024-03-17', vendor: 'Sementes Premium Ltda', total: 1250.00, status: 'Entregue', items: 8 },
  { id: '2', number: 'COM-000450', date: '2024-03-16', vendor: 'Fertilizantes & Cia', total: 3890.50, status: 'Pendente', items: 5 },
  { id: '3', number: 'COM-000449', date: '2024-03-14', vendor: 'Equipamentos Agrícolas', total: 2100.00, status: 'Em Trânsito', items: 3 },
  { id: '4', number: 'COM-000448', date: '2024-03-12', vendor: 'Sementes Premium Ltda', total: 890.75, status: 'Entregue', items: 6 },
  { id: '5', number: 'COM-000447', date: '2024-03-10', vendor: 'Defensivos Naturais SA', total: 1560.00, status: 'Entregue', items: 4 },
];

export const mockActivities: Activity[] = [
  { id: '1', type: 'order', message: 'Novo pedido recebido de Supermercado Central', timestamp: '2024-03-17 14:32', icon: 'ShoppingCart' },
  { id: '2', type: 'stock', message: 'Estoque de Tomate Cherry abaixo do limite', timestamp: '2024-03-17 12:15', icon: 'AlertCircle' },
  { id: '3', type: 'purchase', message: 'Compra COM-000450 confirmada com fornecedor', timestamp: '2024-03-16 09:45', icon: 'Package' },
  { id: '4', type: 'order', message: 'Pedido PED-001244 entregue com sucesso', timestamp: '2024-03-16 16:20', icon: 'CheckCircle' },
  { id: '5', type: 'system', message: 'Relatório semanal gerado e salvo', timestamp: '2024-03-15 23:00', icon: 'FileText' },
  { id: '6', type: 'stock', message: 'Estoque de Mel atualizado: 85L', timestamp: '2024-03-15 10:30', icon: 'Package' },
];

export const mockMonthlySales: MonthlySales[] = [
  { month: 'Jan', sales: 28500 },
  { month: 'Fev', sales: 32100 },
  { month: 'Mar', sales: 38900 },
  { month: 'Abr', sales: 35200 },
  { month: 'Mai', sales: 42800 },
  { month: 'Jun', sales: 45230 },
];
