import z from "zod";

const MAX_POPUP_IMAGE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_POPUP_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const PopupCreateSchema = z.object({
  title: z.string().trim().min(1, "Judul popup wajib diisi."),
  description: z.string().trim().max(500, "Teks maksimal 500 karakter.").optional(),
  image: z
    .unknown()
    .nullable()
    .refine((files) => {
      if (!files) return true;
      const file = files instanceof File ? files : (files as FileList)?.[0];
      return !file || file.size <= MAX_POPUP_IMAGE_SIZE;
    }, "Ukuran gambar maksimal 10MB.")
    .refine((files) => {
      if (!files) return true;
      const file = files instanceof File ? files : (files as FileList)?.[0];
      return !file || ACCEPTED_POPUP_IMAGE_TYPES.includes(file.type);
    }, "Gunakan format JPG, JPEG, PNG, atau WEBP."),
  buttonLabel: z.string().trim().max(80, "Label tombol maksimal 80 karakter.").optional(),
  buttonUrl: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || value.startsWith("/") || /^https?:\/\//.test(value),
      "URL harus diawali / atau http:// atau https://.",
    )
    .optional(),
  isActive: z.boolean(),
  sortOrder: z.number().int().min(0, "Urutan minimal 0."),
});

export interface PopupItem {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  imageKey: string | null;
  buttonLabel: string | null;
  buttonUrl: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface PopupCreateDTO {
  title: string;
  description?: string;
  image?: File | null;
  buttonLabel?: string;
  buttonUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface PopupStatusDTO {
  isActive: boolean;
}

export interface PopupListResponseDTO {
  data: PopupItem[];
}

export interface PopupItemResponseDTO {
  data: PopupItem;
}
