import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
     {/* <main className="flex-1 md:ml-64 p-6 overflow-auto"></main> */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}