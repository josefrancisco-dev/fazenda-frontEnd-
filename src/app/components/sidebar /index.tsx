// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, BarChart3, Package, ShoppingCart, Truck, Boxes, Users, User, Leaf, ClipboardList } from 'lucide-react';
// import type { Role } from '@/types/typesApi';
// import { useUserStore } from '@/stores/useUserStore';

// type NavItem = {
//   path: string;
//   label: string;
//   icon: React.ElementType;
//   allowed?: Role[]; 
// }

// const navItems: NavItem[] = [
//   { path: '/dashboard', label: 'Visão Geral',  icon: BarChart3 , allowed: ['Admin', 'Client']},
//   { path: '/clients',   label: 'Clientes',     icon: User,        allowed: ['Admin'] },
//   { path: '/categories',   label: 'Categorias', icon: ClipboardList,        allowed: ['Admin'] },
//   { path: '/supplier',  label: 'Fornecedores', icon: Users,       allowed: ['Admin', 'Supplier'] },
//   { path: '/products',  label: 'Produtos',     icon: Package, allowed: ['Admin', 'Client'] },
//   { path: '/orders',    label: 'Pedidos',      icon: ShoppingCart, allowed: ['Admin', 'Client'] },
//   { path: '/shopping',  label: 'Compras',      icon: Truck,       allowed: ['Admin', 'Supplier'] },
//   { path: '/stock',     label: 'Estoque',      icon: Boxes,       allowed: ['Admin'] },
// ];

// export default function Sidebar() {
//  const { user } = useUserStore();
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);
//   const userRole = user?.role ?? null;

//   const filteredNavItems = navItems.filter(item => {
//     if (!item.allowed) return true;
//     return userRole && item.allowed.includes(userRole);
//   });

//   if (!user) {
//     return null;
//   }

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed top-4 left-4 z-40 md:hidden bg-slate-800 text-slate-100 p-2 rounded-lg"
//       >
//         {isOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       {isOpen && (
//         <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />
//       )}

//       <aside className={[
//         'fixed left-0 top-0 h-screen w-64 bg-slate-800 text-slate-100',
//         'shadow-lg transition-transform duration-300 z-[35] md:translate-x-0',
//         isOpen ? 'translate-x-0' : '-translate-x-full',
//       ].join(' ')}>

//         <div className="p-6 border-b border-slate-700">
//           <div className="flex items-center gap-3">
//             <div className="p-2 rounded-lg bg-yellow-600">
//               <Leaf className="w-6 h-6 text-white" />
//             </div>
//             <h1 className="text-xl font-bold">Girassol</h1>
//           </div>
//         </div>

//         <nav className="p-4 space-y-1">
//           {filteredNavItems.map(({ path, label, icon: Icon }) => {
//             const isActive = location.pathname === path;
//             return (
//               <Link
//                 key={path}
//                 to={path}
//                 onClick={() => setIsOpen(false)}
//                 className={[
//                   'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm',
//                   isActive
//                     ? 'bg-yellow-600 text-white'
//                     : 'text-slate-300 hover:bg-slate-700 hover:text-slate-100',
//                 ].join(' ')}
//               >
//                 <Icon size={20} />
//                 <span>{label}</span>
//               </Link>
//             );
//           })}
//         </nav>
//       </aside>

//       <div className="md:ml-64" />
//     </>
//   );
// }

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, BarChart3, Package, ShoppingCart,
  Truck, Boxes, Users, ClipboardList,
ShoppingBag
} from 'lucide-react';
import type { Role } from '@/types/typesApi';
import { useUserStore } from '@/stores/useUserStore';
import logo from '@/assets/logo-girassol.png';

type NavItem = {
  path: string;
  label: string;
  icon: React.ElementType;
  allowed?: Role[];
  badge?: number;
  group: 'principal' | 'loja';
};

const navItems: NavItem[] = [
  { path: '/dashboard',  label: 'Visão Geral',  icon: BarChart3,     allowed: ['Admin', 'Client'],   group: 'principal' },
  { path: '/clients',    label: 'Clientes',     icon: Users,          allowed: ['Admin'],              group: 'principal' },
  { path: '/categories', label: 'Categorias',   icon: ClipboardList, allowed: ['Admin'],              group: 'principal' },
  { path: '/supplier',   label: 'Fornecedores', icon: Truck,         allowed: ['Admin', 'Commercial_Manager'],  group: 'principal' },
  { path: '/products',   label: 'Produtos',     icon: Package,       allowed: ['Admin', 'Client'],    group: 'loja' },
  { path: '/orders',     label: 'Pedidos',      icon: ShoppingCart,  allowed: ['Admin', 'Client'],    group: 'loja' },
  { path: '/shopping',   label: 'Compras',      icon: ShoppingBag,   allowed: ['Admin', 'Commercial_Manager'],  group: 'loja' },
  { path: '/stock',      label: 'Estoque',      icon: Boxes,         allowed: ['Admin'],              group: 'loja' },
];

export default function Sidebar() {
  const { user } = useUserStore();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const userRole = user?.role ?? null;

  const filtered = navItems.filter(item => {
    if (!item.allowed) return true;
    return userRole && item.allowed.includes(userRole);
  });

  const principal = filtered.filter(i => i.group === 'principal');
  const loja      = filtered.filter(i => i.group === 'loja');



  if (!user) return null;

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 rounded-lg"
        style={{ background: '#163d28', color: '#fff' }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          'fixed left-0 top-0 h-screen w-60 flex flex-col overflow-hidden',
          'shadow-xl transition-transform duration-300 z-[35] md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        style={{ background: '#163d28', fontFamily: "'Nunito', sans-serif" }}
      >
        {/* Círculo decorativo — totalmente contido no aside graças ao overflow-hidden */}
        <div
          className="pointer-events-none absolute"
          style={{
            top: -50,
            right: -50,
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: '#1f5236',
            opacity: 0.55,
          }}
        />

        <div
          className="relative z-10 flex items-end justify-center px-5 py-0.5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <img
            src={logo}
            alt="Fazenda Girassol"
            className="object-contain"
            style={{ height: 56, width: 'auto', maxWidth: '100%' }}
          />
        </div>

        <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-4">
          <NavGroup
            label="Principal"
            items={principal}
            location={location}
            onClose={() => setIsOpen(false)}
          />

          {loja.length > 0 && (
            <>
              <div
                style={{
                  height: 1,
                  background: 'rgba(255,255,255,0.07)',
                  margin: '8px 4px',
                }}
              />
              <NavGroup
                label="Loja"
                items={loja}
                location={location}
                onClose={() => setIsOpen(false)}
              />
            </>
          )}
        </nav>

      </aside>

      <div className="md:ml-60" />
    </>
  );
}


function NavGroup({
  label,
  items,
  location,
  onClose,
}: {
  label: string;
  items: NavItem[];
  location: ReturnType<typeof useLocation>;
  onClose: () => void;
}) {
  return (
    <>
      <p
        className="px-3 pb-2 pt-1 font-bold uppercase tracking-widest"
        style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}
      >
        {label}
      </p>

      {items.map(({ path, label, icon: Icon, badge }) => {
        const isActive = location.pathname === path;
        return (
          <Link
            key={path}
            to={path}
            onClick={onClose}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all font-semibold mb-0.5"
            style={{
              fontSize: 13.5,
              color: isActive ? '#163d28' : 'rgba(255,255,255,0.6)',
              background: isActive ? '#c5d93e' : 'transparent',
              boxShadow: isActive
                ? '0 4px 14px rgba(197,217,58,0.25)'
                : 'none',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
              }
            }}
          >
            <Icon size={18} />
            <span className="flex-1">{label}</span>
            {badge !== undefined && (
              <span
                className="rounded-full font-bold"
                style={{
                  fontSize: 10,
                  padding: '2px 7px',
                  background: isActive
                    ? 'rgba(22,61,40,0.2)'
                    : 'rgba(197,217,58,0.15)',
                  color: isActive ? '#163d28' : '#c5d93a',
                }}
              >
                {badge}
              </span>
            )}
          </Link>
        );
      })}
    </>
  );
}