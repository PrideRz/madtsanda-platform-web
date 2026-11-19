"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createAcademicClass, createSchedule, createSubject, type AcademicClass, type Subject, type TeacherChoice } from "@/features/dashboard/academic/services";

function ClassQr({ schoolClass }: { schoolClass: AcademicClass }) {
  const [image, setImage] = useState("");
  useEffect(() => {
    if (!schoolClass.qrToken) return;
    QRCode.toDataURL(`mtsn2kk://journal/class/${schoolClass.id}?token=${schoolClass.qrToken}`, { margin: 1, width: 220 })
      .then(setImage)
      .catch(() => setImage(""));
  }, [schoolClass.id, schoolClass.qrToken]);
  if (!image) return <p className="text-xs text-muted-foreground">QR belum tersedia.</p>;
  return <img src={image} alt={`QR jurnal kelas ${schoolClass.name}`} width={220} height={220} className="rounded border bg-white p-2" />;
}

export function ClassManager({ initialClasses, initialSubjects, teachers }: { initialClasses: AcademicClass[]; initialSubjects: Subject[]; teachers: TeacherChoice[] }) {
  const [classes, setClasses] = useState(initialClasses);
  const [subjects, setSubjects] = useState(initialSubjects);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [schedule, setSchedule] = useState({ classId: initialClasses[0]?.id ?? "", subjectId: initialSubjects[0]?.id ?? "", teacherUserId: teachers[0]?.id ?? "", dayOfWeek: "1", startPeriod: "1", endPeriod: "1", schoolYear: "2026/2027" });
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function addClass(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      try {
        const response = await createAcademicClass({ name: name.trim(), grade: grade.trim() });
        if (!response?.data) throw new Error("Kelas gagal disimpan");
        setClasses((current) => [...current, response.data]);
        setName("");
        setGrade("");
        toast.success("Kelas dan QR berhasil dibuat.");
        router.refresh();
      } catch {
        toast.error("Kelas gagal dibuat. Pastikan nama kelas belum digunakan.");
      }
    });
  }

  function addSubject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => { try { const response = await createSubject({ name: subjectName.trim(), code: subjectCode.trim() || undefined }); if (!response?.data) throw new Error("failed"); setSubjects((current) => [...current, response.data]); setSubjectName(""); setSubjectCode(""); toast.success("Mata pelajaran ditambahkan."); } catch { toast.error("Mata pelajaran gagal ditambahkan."); } });
  }

  function addSchedule(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => { try { await createSchedule({ classId: schedule.classId, subjectId: schedule.subjectId, teacherUserId: schedule.teacherUserId, dayOfWeek: Number(schedule.dayOfWeek), startPeriod: Number(schedule.startPeriod), endPeriod: Number(schedule.endPeriod), schoolYear: schedule.schoolYear }); toast.success("Jadwal berhasil dibuat."); } catch { toast.error("Jadwal gagal dibuat."); } });
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle>Tambah Kelas dan QR Jurnal</CardTitle></CardHeader>
        <CardContent>
          <form className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]" onSubmit={addClass}>
            <div><label htmlFor="class-name" className="text-sm">Nama kelas</label><Input id="class-name" name="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="VII-A" /></div>
            <div><label htmlFor="class-grade" className="text-sm">Tingkat</label><Input id="class-grade" name="grade" required value={grade} onChange={(event) => setGrade(event.target.value)} placeholder="VII" /></div>
            <Button type="submit" className="self-end min-h-10" disabled={pending}>Buat kelas</Button>
          </form>
        </CardContent>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><CardHeader><CardTitle>Daftar Mata Pelajaran</CardTitle></CardHeader><CardContent><form className="grid gap-3 sm:grid-cols-2" onSubmit={addSubject}><div><label htmlFor="subject-name" className="text-sm">Nama</label><Input id="subject-name" required value={subjectName} onChange={(event) => setSubjectName(event.target.value)} /></div><div><label htmlFor="subject-code" className="text-sm">Kode (opsional)</label><Input id="subject-code" value={subjectCode} onChange={(event) => setSubjectCode(event.target.value)} /></div><Button type="submit" className="sm:col-span-2" disabled={pending}>Tambah mapel</Button></form><ul className="mt-4 space-y-1 text-sm">{subjects.map((item) => <li key={item.id} className="rounded border p-2">{item.name}{item.code ? ` (${item.code})` : ""}</li>)}</ul></CardContent></Card>
        <Card><CardHeader><CardTitle>Assign Jadwal</CardTitle></CardHeader><CardContent><form className="grid gap-3" onSubmit={addSchedule}><div><label htmlFor="schedule-class" className="text-sm">Kelas</label><select id="schedule-class" className="min-h-10 w-full rounded border bg-background px-2" value={schedule.classId} onChange={(event) => setSchedule((current) => ({ ...current, classId: event.target.value }))}>{classes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div><div><label htmlFor="schedule-subject" className="text-sm">Mapel</label><select id="schedule-subject" className="min-h-10 w-full rounded border bg-background px-2" value={schedule.subjectId} onChange={(event) => setSchedule((current) => ({ ...current, subjectId: event.target.value }))}>{subjects.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div><div><label htmlFor="schedule-teacher" className="text-sm">Guru</label><select id="schedule-teacher" className="min-h-10 w-full rounded border bg-background px-2" value={schedule.teacherUserId} onChange={(event) => setSchedule((current) => ({ ...current, teacherUserId: event.target.value }))}>{teachers.map((item) => <option key={item.id} value={item.id}>{item.username}</option>)}</select></div><div className="grid grid-cols-3 gap-2"><div><label htmlFor="schedule-day" className="text-sm">Hari</label><Input id="schedule-day" type="number" min={1} max={7} value={schedule.dayOfWeek} onChange={(event) => setSchedule((current) => ({ ...current, dayOfWeek: event.target.value }))} /></div><div><label htmlFor="schedule-start" className="text-sm">Mulai</label><Input id="schedule-start" type="number" min={1} value={schedule.startPeriod} onChange={(event) => setSchedule((current) => ({ ...current, startPeriod: event.target.value }))} /></div><div><label htmlFor="schedule-end" className="text-sm">Selesai</label><Input id="schedule-end" type="number" min={1} value={schedule.endPeriod} onChange={(event) => setSchedule((current) => ({ ...current, endPeriod: event.target.value }))} /></div></div><div><label htmlFor="schedule-year" className="text-sm">Tahun ajaran</label><Input id="schedule-year" value={schedule.schoolYear} onChange={(event) => setSchedule((current) => ({ ...current, schoolYear: event.target.value }))} /></div><Button type="submit" disabled={pending}>Simpan jadwal</Button></form></CardContent></Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {classes.map((schoolClass) => (
          <Card key={schoolClass.id}>
            <CardHeader><CardTitle>{schoolClass.name}</CardTitle><p className="text-sm text-muted-foreground">Tingkat {schoolClass.grade}</p></CardHeader>
            <CardContent className="space-y-3"><ClassQr schoolClass={schoolClass} /><p className="text-xs text-muted-foreground">Guru memindai QR ini sebelum mengisi jurnal. QR tidak memuat data siswa.</p></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
