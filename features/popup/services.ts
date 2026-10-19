"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { httpClient } from "@/lib/http/client";
import logger from "@/lib/logger";
import { errorFormat } from "@/lib/error";
import type {
  PopupCreateDTO,
  PopupItem,
  PopupStatusDTO,
} from "@/types/dto/popup";

export async function getActivePopupsService(): Promise<PopupItem[]> {
  try {
    const result = await httpClient<PopupItem[]>("/popup/active", {
      method: "GET",
      cache: "no-store",
    });

    return result.ok ? result.data : [];
  } catch (error: unknown) {
    logger.error(errorFormat(error));
    return [];
  }
}

export async function getAllPopupsService(): Promise<PopupItem[]> {
  try {
    const result = await httpClient<PopupItem[]>("/popup", {
      method: "GET",
      cache: "no-store",
    });

    return result.ok ? result.data : [];
  } catch (error: unknown) {
    logger.error(errorFormat(error));
    return [];
  }
}

export async function createPopupService(
  data: PopupCreateDTO,
): Promise<{ success: boolean; message: string; data: PopupItem | null }> {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("buttonLabel", data.buttonLabel || "");
    formData.append("buttonUrl", data.buttonUrl || "");
    formData.append("isActive", String(data.isActive));
    formData.append("sortOrder", String(data.sortOrder));

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    const result = await httpClient<PopupItem>("/popup", {
      method: "POST",
      body: formData,
    });

    if (!result.ok) {
      return {
        success: false,
        message: result.error || "Popup gagal disimpan.",
        data: null,
      };
    }

    revalidateTag("popups", "default");
    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/popup");

    return {
      success: true,
      message: result.message || "Popup berhasil disimpan.",
      data: result.data,
    };
  } catch (error: unknown) {
    logger.error(errorFormat(error));
    return {
      success: false,
      message: "Popup gagal disimpan.",
      data: null,
    };
  }
}

export async function updatePopupStatusService(
  id: string,
  data: PopupStatusDTO,
): Promise<boolean> {
  try {
    const result = await httpClient<PopupItem>(`/popup/${id}/status`, {
      method: "PATCH",
      body: data,
    });

    if (!result.ok) return false;

    revalidateTag("popups", "default");
    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/popup");
    return true;
  } catch (error: unknown) {
    logger.error(errorFormat(error));
    return false;
  }
}

export async function deletePopupService(id: string): Promise<boolean> {
  try {
    const result = await httpClient<PopupItem>(`/popup/${id}`, {
      method: "DELETE",
    });

    if (!result.ok) return false;

    revalidateTag("popups", "default");
    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/popup");
    return true;
  } catch (error: unknown) {
    logger.error(errorFormat(error));
    return false;
  }
}
