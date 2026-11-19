import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserProfile } from "@/features/dashboard/profile/services";
import { getAcademicClasses, getAnnouncements, getJournals, getSchedules } from "@/features/dashboard/academic/services";

export default async function AcademicPage() {
  const user = await getUserProfile();
  if (!user) redirect("/login");
  if (user.data.role === "admin") redirect("/dashboard");
  const [classes, schedules, announcements, journals] = await Promise.all([
    getAcademicClasses(),
    getSchedules(),
    getAnnouncements(),
    user.data.role === "teacher" || user.data.role === "administrator" || user.data.role === "super_user" ? getJournals() : Promise.resolve([]),
  ]);
  return <div className="space-y-4 p-4"><div><h1 className="text-2xl font-bold">Akademik</h1><p className="text-sm text-muted-foreground">Ringkasan kelas, jadwal, jurnal, dan pengumuman sesuai hak akses akun.</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Card><CardHeader><CardTitle className="text-base">Kelas</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{classes.length}</CardContent></Card><Card><CardHeader><CardTitle className="text-base">Jadwal</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{schedules.length}</CardContent></Card><Card><CardHeader><CardTitle className="text-base">Pengumuman</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{announcements.length}</CardContent></Card><Card><CardHeader><CardTitle className="text-base">Jurnal</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{journals.length}</CardContent></Card></div><Card><CardHeader><CardTitle>Aturan akses</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">QR kelas dibuat Administrator/Master. Guru memindai QR saat mengisi jurnal; jam berurutan pada kelas dan mata pelajaran yang sama digabung. Pengumuman yang dibuat Guru ditampilkan kepada siswa berdasarkan kelas.</CardContent></Card></div>;
}
