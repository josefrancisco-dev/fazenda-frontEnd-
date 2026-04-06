import Header from "@/components/header ";
import Sidebar from "@/components/sidebar ";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Header />
      <Sidebar />
     {/* <main className="flex-1 md:ml-64 p-6 overflow-auto"></main> */}
      <main className="flex-1 p-6 overflow-auto pt-20">
        <Outlet />
      </main>
    </div>
  );
}