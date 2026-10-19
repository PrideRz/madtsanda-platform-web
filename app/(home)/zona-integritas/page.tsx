import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ExternalLink, FileCheck2, ShieldCheck } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { ziEvidenceAreas } from "@/components/data/public-information";

export const metadata: Metadata = {
  title: "Zona Integritas | MTsN 2 Kota Kediri",
  description:
    "Halaman Zona Integritas MTsN 2 Kota Kediri berisi area eviden pembangunan ZI dan tautan dokumen pendukung.",
};

export default function ZonaIntegritasPage() {
  return (
    <div className="min-h-screen bg-white pt-24 text-zinc-950 dark:bg-zinc-950 dark:text-white md:pt-28">
      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6 lg:pb-20">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <Badge className="bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/25">
              <ShieldCheck className="size-3.5" />
              Zona Integritas
            </Badge>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              Zona Integritas Madtsanda
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">
              Pusat akses eviden pembangunan Zona Integritas MTsN 2 Kota Kediri.
              Halaman ini merangkum 6 area perubahan dan mengarahkan pengunjung
              ke folder dokumen pendukung yang dikelola madrasah.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
                <a href={ziEvidenceAreas[0].driveUrl} target="_blank" rel="noreferrer">
                  Buka eviden
                  <ExternalLink className="size-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/ppid">
                  Layanan PPID
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-500/20 dark:bg-emerald-500/10 md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">
              Fokus Layanan
            </p>
            <h2 className="mt-3 text-3xl font-black">
              Bersih, akuntabel, dan melayani
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
              Struktur halaman dibuat internal agar informasi utama tetap dapat
              dibaca di website, sementara dokumen detail tetap tersimpan di
              Google Drive melalui tautan resmi per area.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 py-14 dark:border-zinc-800 dark:bg-zinc-900/40 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-500">
                Area Eviden
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">
                6 area pembangunan ZI
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Setiap kartu membuka folder Google Drive sesuai area eviden.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {ziEvidenceAreas.map((area) => (
              <a
                key={area.number}
                href={area.driveUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-64 flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-emerald-500/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <FileCheck2 className="size-6" />
                  </div>
                  <span className="font-mono text-sm font-bold text-zinc-400">
                    {area.number}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-black text-zinc-950 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-300">
                  {area.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {area.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-300">
                  Buka folder eviden
                  <ExternalLink className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white py-14 dark:border-zinc-800 dark:bg-zinc-950 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:px-6 lg:grid-cols-2">
          <div id="pengaduan" className="scroll-mt-32 rounded-lg border border-zinc-200 p-6 dark:border-zinc-800 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-500">
              Pengaduan
            </p>
            <h2 className="mt-2 text-3xl font-black">Kanal pengaduan</h2>
            <div className="mt-6 space-y-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              <p id="pengaduan-wbs-daring" className="scroll-mt-32">
                Pengaduan WBS Daring
              </p>
              <p id="form-pengaduan" className="scroll-mt-32">
                Form Pengaduan
              </p>
              <p id="sk-span-lapor" className="scroll-mt-32">
                SK Span Lapor
              </p>
              <p id="kontak-aduan-kemenag" className="scroll-mt-32">
                Kontak Aduan Laporan Kemenag Kota Kediri
              </p>
              <a
                href="https://www.lapor.go.id/"
                target="_blank"
                rel="noreferrer"
                className="block font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-300"
              >
                Lapor.go.id
              </a>
            </div>
          </div>

          <div id="survey" className="scroll-mt-32 rounded-lg border border-zinc-200 p-6 dark:border-zinc-800 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-500">
              Survey
            </p>
            <h2 className="mt-2 text-3xl font-black">Survey layanan</h2>
            <div className="mt-6 space-y-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              <p id="survey-layanan-publik" className="scroll-mt-32">
                Survey Layanan Publik
              </p>
              <p id="indeks-survey-layanan" className="scroll-mt-32">
                Indeks Survey Layanan
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
