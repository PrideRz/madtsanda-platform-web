import { Role } from "@/types/access";

export function hasAccess(userRole: Role, requiredRole: Role) {
  if (userRole === "super_user") return true;
  if (requiredRole === "student") return true;
  if (requiredRole === "teacher") {
    return ["teacher", "administrator", "admin"].includes(userRole);
  }
  return userRole === requiredRole;
}
