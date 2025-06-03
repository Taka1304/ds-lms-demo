import Maintenance from "@/features/maintenance";
import { get } from "@vercel/edge-config";
import { redirect } from "next/navigation";

const MaintenancePage = async () => {
  const isInMaintenanceMode = await get("maintenance_enabled");
  if (!isInMaintenanceMode) {
    return redirect("/");
  }
  const startedTime = (await get("startedTime")) as string | undefined;
  const estimatedEndTime = (await get("estimatedEndTime")) as string | undefined;

  return <Maintenance startedTime={startedTime} estimatedEndTime={estimatedEndTime} />;
};

export default MaintenancePage;
