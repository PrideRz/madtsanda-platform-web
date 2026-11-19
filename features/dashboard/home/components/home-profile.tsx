import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  IdCard,
  Mail,
  MoreVertical,
  ShieldCheck,
} from "lucide-react";

import { HomeProfileProps } from "@/types/components";

export function HomeProfile({ user, student, teacher }: HomeProfileProps) {
  const profileUrl = student?.profileUrl || teacher?.profileUrl;
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold">Profil Pengguna</h3>
        <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
      </div>

      <div className="text-center">
        <div className="relative inline-block mb-4">
          <Avatar className="w-30 h-30">
            <AvatarImage src={profileUrl} alt={user.username} />
            <AvatarFallback className="text-lg">{user.initials}</AvatarFallback>
          </Avatar>
        </div>
        <h4 className="font-bold text-lg">{user.username}</h4>
        <Badge className="capitalize">
          {user.role === "super_user" ? "Master" : user.role}
        </Badge>
      </div>

      <div className="max-w-2xl mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 flex items-center p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
            <div className="size-10 rounded-xl flex items-center justify-center shadow-sm mr-4 bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <Mail className="size-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                Email Address
              </p>
              <p className="text-sm font-semibold text-emerald-950 dark:text-emerald-100">
                {user.email}
              </p>
            </div>
          </div>

          {student && (
            <div className="md:col-span-2 flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800/50">
              <div className="flex items-center">
                <div className="size-10 rounded-xl flex items-center justify-center shadow-sm mr-4 bg-amber-500/15 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
                  <ShieldCheck className="size-5" />
                </div>
                <span className="text-sm font-bold text-amber-950 dark:text-amber-200">
                  Status Murid
                </span>
              </div>
              <span className="px-3 py-1 bg-amber-600 text-white text-[10px] font-bold rounded-full uppercase">
                {student?.status}
              </span>
            </div>
          )}

          {student && (
            <div className="md:col-span-2 flex items-center p-4 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800/50 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
              <div className="size-10 rounded-xl flex items-center justify-center shadow-sm mr-4 bg-purple-500/15 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
                <IdCard className="size-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-purple-700 dark:text-purple-400 font-bold">
                  NISN
                </p>
                <p className="text-sm font-semibold text-purple-950 dark:text-purple-100">
                  {student?.nisn}
                </p>
              </div>
            </div>
          )}

          {student && (
            <div className="md:col-span-2 flex items-center p-4 bg-cyan-50 dark:bg-cyan-950/40 rounded-2xl border border-cyan-200 dark:border-cyan-800/50 hover:border-cyan-300 dark:hover:border-cyan-700 transition-colors">
              <div className="size-10 rounded-xl flex items-center justify-center shadow-sm mr-4 bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
                <IdCard className="size-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-bold">
                  NIS
                </p>
                <p className="text-sm font-semibold text-cyan-950 dark:text-cyan-100">
                  {student?.nis}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
