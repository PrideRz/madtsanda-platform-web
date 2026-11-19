import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserProfile } from "@/features/dashboard/profile/services";

export default async function AcademicReportPage() {
  const user = await getUserProfile();
  if (!user) redirect("/login");
  if (user.data.role === "admin") redirect("/dashboard");
  return <div className="p-4"><Card><CardHeader><CardTitle>Raport LHB</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-muted-foreground"><p>Struktur nilai akan mengikuti workbook Excel yang diunggah, termasuk kolom P1–P5 dan PH/R yang tersedia pada template sekolah.</p><p>Impor nilai, tampilan raport, unduh, dan cetak akan diaktifkan setelah pemetaan kolom nilai serta periode penilaian ditetapkan di backend.</p></CardContent></Card></div>;
}
