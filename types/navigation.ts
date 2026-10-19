export interface NavigationItem {
  label: string;
  description: string;
  href: string;
  isExternal?: boolean;
  children?: NavigationItem[];
}

export interface NavigationSection {
  label: string;
  description: string;
  items: NavigationItem[];
}
