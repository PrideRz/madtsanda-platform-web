"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarBreadcrumb } from "./sidebar-breadcrumb";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/features/auth/actions/logout";

import { SidebarHeaderProps } from "@/types/components";

const roleLabels = {
  admin: "Admin",
  administrator: "Administrator",
  super_user: "Master",
  student: "Siswa",
  teacher: "Guru",
} as const;

export function SidebarHeader({ user, student, teacher }: SidebarHeaderProps) {
  const profileImage = student?.profileUrl || teacher?.profileUrl;

  return (
    <header className="flex border-b h-18 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4" />
        <ThemeToggle />
        <Separator orientation="vertical" className="h-4" />
        <SidebarBreadcrumb />
      </div>

      <div className="flex items-center pr-4 gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 outline-none hover:opacity-80 transition-opacity">
              <div className="hidden md:flex flex-col items-end text-right">
                <span className="text-sm font-semibold leading-none mb-1">
                  {user.username}
                </span>
                <span className="text-[10px] uppercase tracking-wider opacity-50 font-bold">
                  {roleLabels[user.role]}
                </span>
              </div>

              <div className="relative">
                <Avatar className="size-10 border">
                  <AvatarImage
                    src={profileImage}
                    alt={user.username}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-[10px] bg-muted">
                    {user.initials}
                  </AvatarFallback>
                  <AvatarBadge className="bg-green-500" />
                </Avatar>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 mt-2">
            <Button
              className="w-full text-destructive font-semibold"
              variant={"destructive"}
              onClick={async () => await handleLogout()}
            >
              Log out <LogOut className="text-destructive" />
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
