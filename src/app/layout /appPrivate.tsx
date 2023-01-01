// import { Outlet, Navigate } from "react-router-dom";
// import Header from "../components/header ";
// import Sidebar from "../components/sidebar ";
// import { tokenStorageServices } from "@/storage/token-storage";
// import React from "react";
// import { useValidateQuery } from "@/quereis/useAuth";
// import { useUserStore } from "@/stores/useUserStore";
// import { LoadingPage } from "@/pages /public/load-page";

// export function AppPrivate() {

//   // const token = tokenStorageServices.get();
//   // console.log("login token :  ", token)

//   // 🔐 se não tiver token, redireciona para login
//   // if (!token) {
//   //   return <Navigate to="/" replace />
//   // }

//   const [isCollapsed, setIsCollapsed] = React.useState(true);
  
//   const { data, isSuccess, isError , isLoading} = useValidateQuery();

//   const token = tokenStorageServices.get();
//   const { clearUser, setUser, user } = useUserStore((state) => state)

//   console.log("Nome do usuário  :  ", user?.name)

//   const toggleSidebar = () => {
//     setIsCollapsed((prev) => !prev);
//   };

//   React.useEffect(() => {
//     if (isSuccess && data) {
//       setUser(data);
//     }

//     if (isLoading) {
//       return <LoadingPage message="carregamento..." />;
//     }

//     if (isError || !token) {
//       clearUser();
//     }
//   }, [isSuccess, isError, token, data, setUser, clearUser]);

//   if (isError || !token) {
//     //setAuthenticatedUser(null);

//     clearUser()
//     return <Navigate to="/sign-in" />;
//   }

//   if (!user) {

//     return <p>Acesso não autorizado</p>;
//   }

//   return (
//     <div className="flex min-h-screen bg-slate-100">
//       <Header />
//       <Sidebar />

//       <main className="flex-1 p-6 overflow-auto pt-20">
//         <Outlet />
//       </main>
//     </div>
//   )
// }


// app/layout/appPrivate.tsx
import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/header ";
import Sidebar from "../components/sidebar ";
import { tokenStorageServices } from "@/storage/token-storage";
import React from "react";
import { useValidateQuery } from "@/quereis/useAuth";
import { useUserStore } from "@/stores/useUserStore";
import { LoadingPage } from "@/pages /public/load-page";

export function AppPrivate() {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  
  const { data: userData, isSuccess, isError, isLoading } = useValidateQuery();
  const token = tokenStorageServices.get();
  const { clearUser, setUser, user } = useUserStore((state) => state);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  // Salva o usuário na store quando recebe os dados
  React.useEffect(() => {
    if (isSuccess && userData) {
      setUser(userData);
    }
  }, [isSuccess, userData, setUser]);

  // Limpa o usuário em caso de erro
  React.useEffect(() => {
    if (isError || !token) {
      console.log("🧹 Limpando usuário da store");
      clearUser();
    }
  }, [isError, token, clearUser]);

  if (isLoading) {
    return <LoadingPage message="carregamento..." />;
  }

  if (isError || !token) {
    clearUser();
    return <Navigate to="/" replace />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Acesso não autorizado</p>
      </div>
    );
  }


  return (
    <div className="flex min-h-screen bg-slate-100">
      <Header />
      <Sidebar  />
      <main className="flex-1 p-6 overflow-auto pt-20">
        <Outlet />
      </main>
    </div>
  );
}