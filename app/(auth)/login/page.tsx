import { redirect } from "next/navigation";
import { LoginLayout } from "@/features/auth/components/layout";
import { LoginForm } from "@/features/auth/components/login-form";
import { getUserProfile } from "@/features/dashboard/profile/services";

export default async function Login() {
  const user = await getUserProfile();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
}
