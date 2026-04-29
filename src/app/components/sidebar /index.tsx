import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart3, Package, ShoppingCart, Truck, Boxes, Users, User, Leaf } from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';

const navItems = [
  { path: '/dashboard', label: 'Visão Geral',  icon: BarChart3,},
  { path: '/clients',   label: 'Clientes',     icon: User,},
  { path: '/supplier',  label: 'Fornecedores', icon: Users, },
  { path: '/products',  label: 'Produtos',     icon: Package,},
  { path: '/orders',    label: 'Pedidos',      icon: ShoppingCart, },
  { path: '/shopping',  label: 'Compras',      icon: Truck,  allowed: ['Admin']},
  { path: '/stock',     label: 'Estoque',      icon: Boxes,  },
  // { path: '/stock',     label: 'Estoque',      icon: Boxes,    allowed: ['Admin'] },

];

export default function Sidebar() {

  const { clearUser, setUser, user } = useUserStore((state) => state);

  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const teste = user?.name ?? "";
  console.log("teste nome: ", teste)

  const accessLevel = user?.role.accessLevel.code ?? "";

  console.log("Nivel de acesso : ", accessLevel || "Não existe um nível de acesso encontrado !")

  const filteredNavItems = navItems.filter(item =>
    !item.allowed || item.allowed.includes(accessLevel)
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden bg-slate-800 text-slate-100 p-2 rounded-lg"
        aria-label="Abrir menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          'fixed left-0 top-0 h-screen w-64 bg-slate-800 text-slate-100',
          'shadow-lg transition-transform duration-300 z-[35] md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        {/* Brand */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg text-primary-foreground bg-yellow-600">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold">Girassol</h1>
          </div>
        </div>

        {/* Navigation */}
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

      {/* Desktop spacer */}
      <div className="md:ml-64" />
    </>
  );
}