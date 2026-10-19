import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Info, ShieldCheck } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { ppidSections } from "@/components/data/public-information";

export const metadata: Metadata = {
  title: "PPID | MTsN 2 Kota Kediri",
  description:
    "Profil PPID MTsN 2 Kota Kediri, struktur layanan, visi misi moto, serta tugas dan fungsi pengelolaan informasi publik.",
};

export default function PpidPage() {
  return (
    <div className="min-h-screen bg-white pt-24 text-zinc-950 dark:bg-zinc-950 dark:text-white md:pt-28">
      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6 lg:pb-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Badge className="bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/25">
              <Info className="size-3.5" />
              PPID Madtsanda
            </Badge>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              Layanan informasi publik
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">
              Pejabat Pengelola Informasi dan Dokumentasi menjadi kanal
              pelayanan informasi publik madrasah. Halaman ini merangkum profil,
              struktur, visi misi moto, serta tugas dan fungsi PPID.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
                <Link href="#profil-ppid">
                  Lihat informasi
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/zona-integritas">Zona Integritas</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {["Tanggap", "Cepat", "Akurat", "Terbuka"].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <ShieldCheck className="mb-4 size-6 text-emerald-600 dark:text-emerald-300" />
                <p className="text-lg font-black">{item}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Prinsip layanan informasi publik Madtsanda.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="informasi-ppid"
        className="border-t border-zinc-200 bg-zinc-50 py-14 dark:border-zinc-800 dark:bg-zinc-900/40 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-500">
              Informasi PPID
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              4 bagian utama layanan informasi
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {ppidSections.map((section, index) => (
              <article
                key={section.title}
                id={section.id}
                className="scroll-mt-32 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:p-8"
              >
                <p className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-300">
                  0{index + 1}
                </p>
                <h3 className="mt-3 text-2xl font-black text-zinc-950 dark:text-white">
                  {section.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {section.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-300" />
                      <span className="text-zinc-700 dark:text-zinc-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
