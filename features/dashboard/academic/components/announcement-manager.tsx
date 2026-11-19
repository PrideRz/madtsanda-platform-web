"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createAnnouncement, type AcademicClass, type ClassAnnouncement } from "@/features/dashboard/academic/services";

export function AnnouncementManager({ classes, initialItems, canCreate }: { classes: AcademicClass[]; initialItems: ClassAnnouncement[]; canCreate: boolean }) {
  const [items, setItems] = useState(initialItems);
  const [classId, setClassId] = useState(classes[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [pending, startTransition] = useTransition();

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      try {
        const response = await createAnnouncement({ classId, title: title.trim(), body: body.trim(), dueAt: dueAt || undefined });
        if (!response?.data) throw new Error("failed");
        setItems((current) => [response.data, ...current]);
        setTitle(""); setBody(""); setDueAt("");
        toast.success("Pengumuman kelas diterbitkan.");
      } catch {
        toast.error("Pengumuman gagal diterbitkan.");
      }
    });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      {canCreate && <Card><CardHeader><CardTitle>Buat Pengumuman / Tugas</CardTitle><p className="text-sm text-muted-foreground">Pengumuman dibuat guru untuk kelas yang dipilih dan akan terlihat siswa di kalender kelas.</p></CardHeader><CardContent><form className="grid gap-4" onSubmit={submit}><div><label htmlFor="announcement-class" className="text-sm">Kelas</label><select id="announcement-class" className="min-h-10 w-full rounded-md border bg-background px-3" value={classId} onChange={(event) => setClassId(event.target.value)} required>{classes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div><div><label htmlFor="announcement-title" className="text-sm">Judul</label><Input id="announcement-title" value={title} onChange={(event) => setTitle(event.target.value)} required /></div><div><label htmlFor="announcement-body" className="text-sm">Isi</label><Textarea id="announcement-body" value={body} onChange={(event) => setBody(event.target.value)} required /></div><div><label htmlFor="announcement-due" className="text-sm">Batas waktu (opsional)</label><Input id="announcement-due" type="datetime-local" value={dueAt} onChange={(event) => setDueAt(event.target.value)} /></div><Button type="submit" disabled={pending}>{pending ? "Menerbitkan..." : "Terbitkan"}</Button></form></CardContent></Card>}
      <Card><CardHeader><CardTitle>Pengumuman Kelas</CardTitle></CardHeader><CardContent><div className="space-y-3">{items.length === 0 ? <p className="text-sm text-muted-foreground">Belum ada pengumuman.</p> : items.map((item) => <article key={item.id} className="rounded-lg border p-4"><h2 className="font-semibold">{item.title}</h2><p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{item.body}</p>{item.dueAt && <p className="mt-2 text-xs">Batas: {new Date(item.dueAt).toLocaleString("id-ID")}</p>}</article>)}</div></CardContent></Card>
    </div>
  );
}
