import { Role } from "@/types/access";

export function hasAccess(userRole: Role, requiredRole: Role) {
  if (userRole === "super_user") return true;
  if (requiredRole === "student") return true;
  return userRole === requiredRole;
}
