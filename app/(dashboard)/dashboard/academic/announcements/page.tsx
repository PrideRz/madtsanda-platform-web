import { redirect } from "next/navigation";
import { getUserProfile } from "@/features/dashboard/profile/services";
import { getAcademicClasses, getAnnouncements } from "@/features/dashboard/academic/services";
import { AnnouncementManager } from "@/features/dashboard/academic/components/announcement-manager";

export default async function AcademicAnnouncementsPage() {
  const user = await getUserProfile();
  if (!user) redirect("/login");
  if (user.data.role === "admin") redirect("/dashboard");
  const canCreate = user.data.role === "teacher" || user.data.role === "super_user";
  return <div className="p-4"><AnnouncementManager classes={await getAcademicClasses()} initialItems={await getAnnouncements()} canCreate={canCreate} /></div>;
}
