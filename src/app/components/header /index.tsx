import { CartSheet } from '@/pages /private/orders/components/crud/cartSheet';
import { useLogoutMutation } from '@/quereis/useAuth';
import { useUserStore } from '@/stores/useUserStore';
import { LogOut, Settings, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync, isPending } = useLogoutMutation();
  const { user } = useUserStore((state) => state); 

  const userName = user?.name || "Usuário";
  const isClient = user?.role === "Client"

  const logout = async () => {
    mutateAsync().catch((error) => {
      console.error("Logout failed:", error);
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-border z-30 md:ml-64">
      <div className="h-full px-4 md:px-8 flex items-center justify-between">
        <div>
          {isClient && ( 
            <CartSheet />
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-foreground hidden sm:inline">
              {userName}
            </span>
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-border rounded-lg shadow-lg py-2 z-50">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2 hover:bg-muted text-foreground text-sm transition-colors"
              >
                <Settings size={16} />
                Editar Perfil
              </Link>
              <button
                onClick={logout}
                disabled={isPending}
                className="w-full text-left flex items-center gap-3 px-4 py-2 hover:bg-destructive hover:text-destructive-foreground text-foreground text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <LogOut size={16} />
                )}
                {isPending ? "Saindo..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}