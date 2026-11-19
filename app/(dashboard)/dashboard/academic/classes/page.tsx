import { redirect } from "next/navigation";
import { getUserProfile } from "@/features/dashboard/profile/services";
import { getAcademicClasses, getSubjects, getTeachers } from "@/features/dashboard/academic/services";
import { ClassManager } from "@/features/dashboard/academic/components/class-manager";

export default async function AcademicClassesPage() {
  const user = await getUserProfile();
  if (!user) redirect("/login");
  if (user.data.role !== "administrator" && user.data.role !== "super_user") redirect("/dashboard");
  const [classes, subjects, teachers] = await Promise.all([getAcademicClasses(), getSubjects(), getTeachers()]);
  return <div className="p-4"><ClassManager initialClasses={classes} initialSubjects={subjects} teachers={teachers} /></div>;
}
