import { HomeHeader } from "@/features/dashboard/home/components/home-header";
import { HomeProfile } from "@/features/dashboard/home/components/home-profile";
import { HomeQuickLink } from "@/features/dashboard/home/components/home-quick-link";
import { getUserProfile } from "@/features/dashboard/profile/services";
import { getStudentByToken } from "@/features/dashboard/student/services";
import { getTeacherByToken } from "@/features/dashboard/teacher/services";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getUserProfile();
  if (!user) {
    redirect("/login");
  }

  const [student, teacher] = await Promise.all([
    user.data.role === "student" ? getStudentByToken() : Promise.resolve(null),
    user.data.role === "teacher" ? getTeacherByToken() : Promise.resolve(null),
  ]);
  return (
    <div>
      <div className="px-4">
        <HomeHeader />
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <HomeQuickLink user={user.data} />
          <div className="space-y-6">
            <HomeProfile
              user={user.data}
              teacher={teacher?.data}
              student={student?.data}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
