import { PERMISSION } from "@/constants/permitions";
import { useUserStore } from "@/stores/useUserStore";
import { DashboardAdmin } from "./components/admin";
import { DashboardClient } from "./components/client";

export function Dashboard() {

  const { user } = useUserStore((state) => state);

  console.log("Permissão : ", user?.role.name === PERMISSION.Admin)

  return (
    <>
     {user?.role.name === PERMISSION.Admin ? (
        <DashboardAdmin />
      ) : (
        <DashboardClient />
      )}
    </>
  );
}
