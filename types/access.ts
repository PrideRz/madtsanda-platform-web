export const ROLE_LEVEL = {
  student: 1,
  teacher: 2,
  administrator: 3,
  admin: 3,
  super_user: 4,
} as const;

export type Role = keyof typeof ROLE_LEVEL;
