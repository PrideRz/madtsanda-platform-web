import { UserDTO } from "@/types/dto/user";
import { getUserProfile, getUsersProfile } from "@/features/dashboard/profile/services";
import { redirect } from "next/navigation";
import { AccountManager } from "@/features/dashboard/profile/components/account-manager";

export default async function UserProfileTablePage() {
  const currentUser = await getUserProfile();
  if (
    !currentUser ||
    (currentUser.data.role !== "administrator" && currentUser.data.role !== "super_user")
  ) {
    redirect("/dashboard");
  }

  const usersResponse = await getUsersProfile();

  // Redirect if there's no user data or if the API call fails
  if (!usersResponse || !usersResponse.data) {
    return (
      <div className="flex flex-col items-center justify-center p-4 min-h-screen">
        <p className="text-zinc-500 dark:text-zinc-400">
          No user data available or failed to fetch users.
        </p>
      </div>
    );
  }

  const users: UserDTO[] = usersResponse.data;

  return <div className="p-4"><AccountManager initialUsers={users} /></div>;
}
