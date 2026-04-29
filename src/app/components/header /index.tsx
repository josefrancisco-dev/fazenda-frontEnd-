// import { CartSheet } from '@/pages /orders/components/crud/cartSheet';
import { CartSheet } from '@/pages /private/orders/components/crud/cartSheet';
import { LogOut, Settings} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    alert('Logout realizado com sucesso!');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-border z-30 md:ml-64">
      <div className="h-full px-4 md:px-8 flex items-center justify-between">
        {/* Farm Info */}
        <div >
            <CartSheet />
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary">
              FG
            </div>
            <span className="text-sm font-medium text-foreground hidden sm:inline">Gestor</span>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-border rounded-lg shadow-lg py-2 z-50">
              <Link
                to="/perfil"
                className="flex items-center gap-3 px-4 py-2 hover:bg-muted text-foreground text-sm transition-colors"
              >
                <Settings size={16} />
                Editar Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-3 px-4 py-2 hover:bg-destructive hover:text-destructive-foreground text-foreground text-sm transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
