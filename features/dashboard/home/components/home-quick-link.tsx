"use client";

import { quickLink } from "@/components/data/quick-link";
import { Role } from "@/types/access";
import Link from "next/link";

import { HomeQuickLinkProps } from "@/types/components";

export function HomeQuickLink({ user }: HomeQuickLinkProps) {
  const userRole: Role = user.role;

  const filteredQuickLink = quickLink
    .filter((item) => userRole === "super_user" || item.roles.includes(userRole));

  return (
    <div className="lg:col-span-2 border-2 p-4 rounded-xl bg-card border-dashed">
      <div className="mb-4 px-6 pt-4">
        <h1 className="text-xl font-semibold">Aplikasi</h1>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filteredQuickLink.map((i, index) => {
          return (
            <Link href={i.url} key={index}>
              <div className="px-4 py-3 flex gap-4 flex-row border-none shadow-none items-center rounded-xl hover:bg-muted/50 transition-colors min-h-20">
                <i.icon className="size-10 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-semibold text-base leading-snug">{i.title}</h4>
                  <span className="opacity-60 text-xs leading-normal">{i.description}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
