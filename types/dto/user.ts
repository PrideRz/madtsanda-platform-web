import z from "zod";

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  initials: string;
  role: "admin" | "administrator" | "super_user" | "student" | "teacher";
  active?: boolean;
  lastJournalAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponseDTO {
  data: UserDTO;
}

export interface UserListResponseDTO {
  data: UserDTO[];
}

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Username wajib diisi"),
  password: z.string().min(6, "Password minimal harus 6 karakter"),
});
