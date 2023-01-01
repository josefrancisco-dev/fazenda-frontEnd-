
import { useUserStore } from "@/stores/useUserStore";
import { DashboardAdmin } from "./components/admin";

export function Dashboard() {

  const { user } = useUserStore((state) => state);

  return (
    <>
     {/* {user?.role.name === PERMISSION.Admin ? (
        <DashboardAdmin />
      ) : (
        <DashboardClient />
      )} */}

        
        <DashboardAdmin />
  
       
    </>
  );
}
