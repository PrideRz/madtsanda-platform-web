"use server";

import { cache } from "react";
import { request } from "@/lib/request";
import logger from "@/lib/logger";
import { errorFormat } from "@/lib/error";
import { UserListResponseDTO, UserResponseDTO, UserDTO } from "@/types/dto/user";

/**
 * Mengambil profil user yang sedang login dengan memoization per siklus render SSR.
 * Mencegah request HTTP ganda ke backend /auth/me saat dipanggil di layout dan page.
 */
export const getUserProfile = cache(async (): Promise<UserResponseDTO | null> => {
  try {
    const response = await request<UserResponseDTO>(`/auth/me`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error: unknown) {
    logger.error(errorFormat(error));
    return null;
  }
});

/**
 * Mengambil seluruh daftar pengguna (hanya dapat diakses oleh admin / super_user).
 */
export async function getAllUsers(): Promise<UserListResponseDTO | null> {
  try {
    const response = await request<UserListResponseDTO>(`/user`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error: unknown) {
    logger.error(errorFormat(error));
    return null;
  }
}

// Alias kompatibilitas
export const getUsersProfile = getAllUsers;

export async function createManagedUser(payload: { username: string; role: UserDTO["role"] }) {
  return request<{ data: { user: UserDTO } }>("/user", {
    method: "POST",
    body: payload,
  });
}

export async function updateManagedUser(
  id: string,
  payload: { username?: string; email?: string; role?: UserDTO["role"]; active?: boolean },
) {
  return request<UserResponseDTO>(`/user/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

export async function resetManagedUserPassword(id: string, password: string) {
  return request<{ data: { message: string; user: UserDTO } }>(`/user/${id}/password`, {
    method: "PATCH",
    body: { password },
  });
}

export async function lookupManagedUser(username: string) {
  return request<{ data: { id: string; username: string; role: UserDTO["role"]; active: boolean } }>(`/user/lookup?username=${encodeURIComponent(username)}`, {
    method: "GET",
  });
}

export async function deleteManagedUser(id: string) {
  return request<{ data: { message: string } }>(`/user?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
