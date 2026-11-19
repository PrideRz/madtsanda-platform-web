import { redirect } from "next/navigation";
import { getUserProfile } from "@/features/dashboard/profile/services";
import { getAcademicClasses, getSubjects } from "@/features/dashboard/academic/services";
import { JournalForm } from "@/features/dashboard/academic/components/journal-form";

export default async function AcademicJournalPage() {
  const user = await getUserProfile();
  if (!user) redirect("/login");
  if (user.data.role !== "teacher" && user.data.role !== "administrator" && user.data.role !== "super_user") redirect("/dashboard");
  return <div className="p-4"><JournalForm classes={await getAcademicClasses()} subjects={await getSubjects()} /></div>;
}
