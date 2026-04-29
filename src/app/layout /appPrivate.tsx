import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/header ";
import Sidebar from "../components/sidebar ";
import { tokenStorageServices } from "@/storage/token-storage";

export function AppPrivate() {


  const token = tokenStorageServices.get();
  console.log("login token :  ", token)

  // 🔐 se não tiver token, redireciona para login
  if (!token) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Header />
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto pt-20">
        <Outlet />
      </main>
    </div>
  )
}