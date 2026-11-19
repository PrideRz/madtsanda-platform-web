import { Role } from "./access";

export interface SidebarItem {
  id: string;
  minRole: Role;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
  roles?: Role[];
  badge?: string;
  hasSubItems?: boolean;
  subItems?: {
    id: string;
    minRole: Role;
    badge?: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    description?: string;
    route: string;
    roles?: Role[];
  }[];
}
