import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserProfile } from "@/features/dashboard/profile/services";
import { getAcademicClasses, getSchedules, getSubjects } from "@/features/dashboard/academic/services";

export default async function AcademicSchedulePage() {
  const user = await getUserProfile();
  if (!user) redirect("/login");
  if (user.data.role === "admin") redirect("/dashboard");
  const [classes, subjects, schedules] = await Promise.all([getAcademicClasses(), getSubjects(), getSchedules()]);
  const names = new Map(classes.map((item) => [item.id, item.name]));
  const subjectNames = new Map(subjects.map((item) => [item.id, item.name]));
  return <div className="p-4"><Card><CardHeader><CardTitle>Jadwal Pelajaran</CardTitle></CardHeader><CardContent><div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Jadwal pelajaran"><table className="w-full text-sm"><caption className="sr-only">Jadwal pelajaran</caption><thead><tr className="border-b text-left"><th scope="col" className="p-2">Hari</th><th scope="col" className="p-2">Kelas</th><th scope="col" className="p-2">Mata pelajaran</th><th scope="col" className="p-2">Jam</th><th scope="col" className="p-2">Tahun ajaran</th></tr></thead><tbody>{schedules.map((item) => <tr key={item.id} className="border-b"><td className="p-2">{item.dayOfWeek}</td><td className="p-2">{names.get(item.classId) ?? item.classId}</td><td className="p-2">{subjectNames.get(item.subjectId) ?? item.subjectId}</td><td className="p-2">{item.startPeriod}–{item.endPeriod}</td><td className="p-2">{item.schoolYear}</td></tr>)}</tbody></table>{schedules.length === 0 && <p className="p-4 text-sm text-muted-foreground">Belum ada jadwal.</p>}</div></CardContent></Card></div>;
}
