"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Badge, Button, Card, CardContent, CardHeader, Input, Label, Switch, Textarea } from "@/components/ui";
import { deletePopupService, createPopupService, updatePopupStatusService } from "@/features/popup/services";
import { PopupCreateSchema } from "@/types/dto/popup";
import type { PopupItem } from "@/types/dto/popup";

type PopupFormValues = z.infer<typeof PopupCreateSchema>;

export function PopupManager({ initialItems }: { initialItems: PopupItem[] }) {
  const [pending, startTransition] = useTransition();
  const form = useForm<PopupFormValues>({
    resolver: zodResolver(PopupCreateSchema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
      buttonLabel: "",
      buttonUrl: "",
      isActive: true,
      sortOrder: 0,
    },
  });

  const onSubmit = (values: PopupFormValues) => {
    startTransition(async () => {
      const file = values.image instanceof File
        ? values.image
        : values.image instanceof FileList
          ? values.image[0]
          : null;
      const result = await createPopupService({
        title: values.title,
        description: values.description,
        image: file,
        buttonLabel: values.buttonLabel,
        buttonUrl: values.buttonUrl,
        isActive: values.isActive,
        sortOrder: values.sortOrder,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      form.reset();
      window.location.reload();
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Kelola Popup</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Atur slideshow popup yang tampil di halaman awal dan dashboard.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <ImagePlus className="size-5 text-emerald-600" />
            Tambah popup
          </h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="popup-title">Judul</Label>
              <Input id="popup-title" {...form.register("title")} placeholder="Contoh: Pendaftaran peserta didik baru" />
              {form.formState.errors.title && (
                <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="popup-sort-order">Urutan tampil</Label>
              <Input
                id="popup-sort-order"
                type="number"
                {...form.register("sortOrder", { valueAsNumber: true })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="popup-description">Teks popup</Label>
              <Textarea id="popup-description" {...form.register("description")} placeholder="Tulis informasi singkat untuk pengunjung." />
              {form.formState.errors.description && (
                <p className="text-xs text-destructive">{form.formState.errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="popup-image">Gambar</Label>
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      htmlFor="popup-image"
                      className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border p-8 text-center transition-colors hover:bg-muted/50"
                    >
                      <Upload className="size-6 text-muted-foreground" />
                      <span className="text-sm font-medium">Pilih gambar popup</span>
                      <span className="text-xs text-muted-foreground">JPG, PNG, WEBP, maksimal 10MB</span>
                      <input
                        id="popup-image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="sr-only"
                        onChange={(event) => field.onChange(event.target.files)}
                      />
                    </label>
                    {fieldState.error && (
                      <p className="text-xs text-destructive">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="popup-button-label">Label tombol</Label>
              <Input id="popup-button-label" {...form.register("buttonLabel")} placeholder="Lihat selengkapnya" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="popup-button-url">URL tombol</Label>
              <Input id="popup-button-url" {...form.register("buttonUrl")} placeholder="/ppdb atau https://..." />
              {form.formState.errors.buttonUrl && (
                <p className="text-xs text-destructive">{form.formState.errors.buttonUrl.message}</p>
              )}
            </div>

            <div className="flex items-center gap-3 md:col-span-2">
              <Controller
                name="isActive"
                control={form.control}
                render={({ field }) => (
                  <Switch
                    id="popup-active"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="popup-active">Tampilkan popup setelah disimpan</Label>
            </div>

            <Button type="submit" disabled={pending} className="md:col-span-2">
              {pending ? "Menyimpan..." : "Simpan popup"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Popup tersimpan</h2>
        </CardHeader>
        <CardContent className="space-y-3">
          {initialItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada popup.</p>
          ) : (
            initialItems.map((item) => (
              <PopupManagerItem key={item.id} item={item} />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function PopupManagerItem({ item }: { item: PopupItem }) {
  const [pending, startTransition] = useTransition();

  const handleStatus = () => {
    startTransition(async () => {
      const success = await updatePopupStatusService(item.id, {
        isActive: !item.isActive,
      });
      if (success) {
        toast.success("Status popup diperbarui.");
        window.location.reload();
      } else {
        toast.error("Status popup gagal diperbarui.");
      }
    });
  };

  const handleDelete = () => {
    if (!window.confirm(`Hapus popup "${item.title}"?`)) return;
    startTransition(async () => {
      const success = await deletePopupService(item.id);
      if (success) {
        toast.success("Popup dihapus.");
        window.location.reload();
      } else {
        toast.error("Popup gagal dihapus.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-md border border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt=""
              width={48}
              height={48}
              unoptimized
              className="size-full object-cover"
            />
          ) : (
            <ImagePlus className="size-5 text-muted-foreground" />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold">{item.title}</p>
          <p className="text-xs text-muted-foreground">Urutan {item.sortOrder}</p>
        </div>
        <Badge variant={item.isActive ? "default" : "outline"}>
          {item.isActive ? "Aktif" : "Nonaktif"}
        </Badge>
      </div>
      <div className="flex shrink-0 gap-2">
        <Button type="button" variant="outline" size="sm" disabled={pending} onClick={handleStatus}>
          {item.isActive ? "Nonaktifkan" : "Aktifkan"}
        </Button>
        <Button type="button" variant="destructive" size="icon" disabled={pending} onClick={handleDelete} aria-label={`Hapus ${item.title}`}>
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
