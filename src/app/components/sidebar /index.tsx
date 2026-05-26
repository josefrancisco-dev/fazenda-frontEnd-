import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart3, Package, ShoppingCart, Truck, Boxes, Users, User, Leaf, ClipboardList } from 'lucide-react';
import type { Role } from '@/types/typesApi';
import { useUserStore } from '@/stores/useUserStore';

type NavItem = {
  path: string;
  label: string;
  icon: React.ElementType;
  allowed?: Role[]; 
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Visão Geral',  icon: BarChart3 , allowed: ['Admin', 'Client']},
  { path: '/clients',   label: 'Clientes',     icon: User,        allowed: ['Admin'] },
  { path: '/categories',   label: 'Categorias', icon: ClipboardList,        allowed: ['Admin'] },
  { path: '/supplier',  label: 'Fornecedores', icon: Users,       allowed: ['Admin', 'Supplier'] },
  { path: '/products',  label: 'Produtos',     icon: Package, allowed: ['Admin', 'Client'] },
  { path: '/orders',    label: 'Pedidos',      icon: ShoppingCart, allowed: ['Admin', 'Client'] },
  { path: '/shopping',  label: 'Compras',      icon: Truck,       allowed: ['Admin', 'Supplier'] },
  { path: '/stock',     label: 'Estoque',      icon: Boxes,       allowed: ['Admin'] },
];

export default function Sidebar() {
 const { user } = useUserStore();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const userRole = user?.role ?? null;

  const filteredNavItems = navItems.filter(item => {
    if (!item.allowed) return true;
    return userRole && item.allowed.includes(userRole);
  });

  if (!user) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden bg-slate-800 text-slate-100 p-2 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside className={[
        'fixed left-0 top-0 h-screen w-64 bg-slate-800 text-slate-100',
        'shadow-lg transition-transform duration-300 z-[35] md:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}>

        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-600">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold">Girassol</h1>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {filteredNavItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={[
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm',
                  isActive
                    ? 'bg-yellow-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-slate-100',
                ].join(' ')}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="md:ml-64" />
    </>
  );
}