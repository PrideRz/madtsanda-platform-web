import { redirect } from "next/navigation";
import { getUserProfile } from "@/features/dashboard/profile/services";
import { PasswordResetForm } from "@/features/dashboard/profile/components/password-reset";

export default async function AcademicPasswordPage() {
  const user = await getUserProfile();
  if (!user) redirect("/login");
  if (user.data.role !== "administrator" && user.data.role !== "super_user") redirect("/dashboard");
  return <div className="p-4"><PasswordResetForm /></div>;
}
