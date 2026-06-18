import { CartSheet } from '@/pages /private/orders/components/crud/cartSheet';
import { Logout } from '@/pages /public/logout';
import { useUserStore } from '@/stores/useUserStore';

export default function Header() {
  const { user } = useUserStore((state) => state); 
  const isClient = user?.role === "Client"

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-border z-30 md:ml-60">
      <div className="h-full px-4 md:px-8 flex items-center justify-between">
        <div>
          {isClient && ( 
            <CartSheet />
          )}
        </div>
        <Logout />
      </div>
    </header>
  );
}

