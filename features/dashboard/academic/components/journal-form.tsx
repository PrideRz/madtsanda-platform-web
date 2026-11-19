"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createJournal, type AcademicClass, type Subject } from "@/features/dashboard/academic/services";
import { QrScanner } from "@/features/dashboard/academic/components/qr-scanner";

export function JournalForm({ classes, subjects }: { classes: AcademicClass[]; subjects: Subject[] }) {
  const [classId, setClassId] = useState(classes[0]?.id ?? "");
  const [subjectId, setSubjectId] = useState(subjects[0]?.id ?? "");
  const [qrToken, setQrToken] = useState("");
  const [journalDate, setJournalDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [startPeriod, setStartPeriod] = useState("1");
  const [endPeriod, setEndPeriod] = useState("1");
  const [content, setContent] = useState("");
  const [pending, startTransition] = useTransition();

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      try {
        await createJournal({ classId, subjectId, journalDate, startPeriod: Number(startPeriod), endPeriod: Number(endPeriod), qrToken: qrToken.trim(), content: content.trim() });
        setContent("");
        toast.success("Jurnal tersimpan. Jam berurutan pada kelas yang sama akan digabung.");
      } catch {
        toast.error("Jurnal gagal disimpan. Pastikan QR kelas dan jadwal benar.");
      }
    });
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader><CardTitle>Isi Jurnal Pembelajaran</CardTitle><p className="text-sm text-muted-foreground">Pindai QR kelas melalui aplikasi pemindai, lalu masukkan token hasil pemindaian di bawah.</p></CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={submit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label htmlFor="journal-class" className="text-sm">Kelas</label><select id="journal-class" name="classId" className="min-h-10 w-full rounded-md border bg-background px-3" required value={classId} onChange={(event) => setClassId(event.target.value)}>{classes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div>
            <div><label htmlFor="journal-subject" className="text-sm">Mata pelajaran</label><select id="journal-subject" name="subjectId" className="min-h-10 w-full rounded-md border bg-background px-3" required value={subjectId} onChange={(event) => setSubjectId(event.target.value)}>{subjects.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div>
          </div>
          <QrScanner onDetected={({ classId: detectedClassId, token }) => { setClassId(detectedClassId); setQrToken(token); toast.success("QR kelas terbaca."); }} />
          <div><label htmlFor="journal-qr" className="text-sm">Token QR kelas</label><Input id="journal-qr" name="qrToken" required value={qrToken} onChange={(event) => setQrToken(event.target.value)} placeholder="Token dari hasil pemindaian QR" /></div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div><label htmlFor="journal-date" className="text-sm">Tanggal</label><Input id="journal-date" name="journalDate" type="date" required value={journalDate} onChange={(event) => setJournalDate(event.target.value)} /></div>
            <div><label htmlFor="journal-start" className="text-sm">Jam mulai</label><Input id="journal-start" name="startPeriod" type="number" min={1} required value={startPeriod} onChange={(event) => setStartPeriod(event.target.value)} /></div>
            <div><label htmlFor="journal-end" className="text-sm">Jam selesai</label><Input id="journal-end" name="endPeriod" type="number" min={1} required value={endPeriod} onChange={(event) => setEndPeriod(event.target.value)} /></div>
          </div>
          <div><label htmlFor="journal-content" className="text-sm">Catatan pembelajaran</label><Textarea id="journal-content" name="content" required value={content} onChange={(event) => setContent(event.target.value)} placeholder="Materi, metode, dan catatan kelas" /></div>
          <Button type="submit" disabled={pending}>{pending ? "Menyimpan..." : "Simpan jurnal"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
