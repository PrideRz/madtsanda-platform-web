import { redirect } from "next/navigation";
import { PopupManager } from "@/features/popup/components";
import { getAllPopupsService } from "@/features/popup/services";
import { getUserProfile } from "@/features/dashboard/profile/services";

export default async function PopupPage() {
  const user = await getUserProfile();

  if (!user) {
    redirect("/login");
  }

  if (user.data.role !== "admin" && user.data.role !== "super_user") {
    redirect("/dashboard");
  }

  return <PopupManager initialItems={await getAllPopupsService()} />;
}
