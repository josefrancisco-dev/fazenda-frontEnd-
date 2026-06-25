import { useLogoutMutation } from "@/quereis/useAuth";
import { useUserStore } from "@/stores/useUserStore";
import { Loader2, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Logout() {
      const [isOpen, setIsOpen] = useState(false);
      const { mutateAsync, isPending } = useLogoutMutation();
      const { user } = useUserStore((state) => state); 
    
      const userName = user?.name || "Usuário";
     
      const logout = async () => {
        mutateAsync().catch((error) => {
          console.error("Logout failed:", error);
        });
      };

    return (
        <>
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
        </>
    )
}

// export function Logout() {

//     const { user } = useUserStore((state) => state);
//     const [isOpen, setIsOpen] = useState(false); 
//     const { mutateAsync, isPending } = useLogoutMutation();

//      const logout = async () => {
//         mutateAsync().catch((error) => {
//           console.error("Logout failed:", error);
//         });
//       };


//     const initials = user?.name
//     ? user.name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
//     : 'U';

//     return (
//         <div
//           className="relative z-10 p-4"
//           style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
//         >
//           <div
//             className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer transition-colors"
//             style={{ background: 'rgba(255,255,255,0.05)' }}
//             onMouseEnter={e =>
//               (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')
//             }
//             onMouseLeave={e =>
//               (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')
//             }
//           >
//             <div
//               className="flex items-center justify-center rounded-full font-extrabold flex-shrink-0"
//               style={{
//                 width: 34,
//                 height: 34,
//                 fontSize: 13,
//                 background: 'linear-gradient(135deg, #c5d93a, #8aa818)',
//                 color: '#163d28',
//               }}
//             >
//             {initials}
//             </div>
//             <div className="flex-1 overflow-hidden">
//               <p
//                 className="font-bold text-white truncate"
//                 style={{ fontSize: 13 }}
//               >
//                 {user?.name}
//               </p>
//               <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
//                 {user?.role}
//               </p>
//             </div>
//             <button
//              onClick={() => setIsOpen(!isOpen)}
//             >
//             <MoreVertical 
//                 size={15} color="rgba(255,255,255,0.3)" 
//             />
//             </button>
          
//           </div>

//           {isOpen && (
//             <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-border rounded-lg shadow-lg py-2 z-50">
//               <Link
//                 to="/profile"
//                 className="flex items-center gap-3 px-4 py-2 hover:bg-muted text-foreground text-sm transition-colors"
//               >
//                 <Settings size={16} />
//                 Editar Perfil
//               </Link>
//               <button
//                 onClick={logout}
//                 disabled={isPending}
//                 className="w-full text-left flex items-center gap-3 px-4 py-2 hover:bg-destructive hover:text-destructive-foreground text-foreground text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isPending ? (
//                   <Loader2 size={16} className="animate-spin" />
//                 ) : (
//                   <LogOut size={16} />
//                 )}
//                 {isPending ? "Saindo..." : "Logout"}
//               </button>
//             </div>
//           )}
//         </div> 
//     )
// }