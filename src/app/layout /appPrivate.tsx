
import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/header ";
import Sidebar from "../components/sidebar ";
import { tokenStorageServices } from "@/storage/token-storage";
import React from "react";
import { useValidateQuery } from "@/quereis/useAuth";
import { useUserStore } from "@/stores/useUserStore";
import { LoadingPage } from "@/pages /public/load-page";

export function AppPrivate() {
  
  const { data: userData, isSuccess, isError, isLoading } = useValidateQuery();
  const token = tokenStorageServices.get();
  const { clearUser, setUser, user } = useUserStore((state) => state);

  React.useEffect(() => {
    if (isSuccess && userData) {
      setUser(userData);
    }
  }, [isSuccess, userData, setUser]);

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