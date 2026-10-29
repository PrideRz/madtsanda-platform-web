import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Code2,
  Cpu,
  FileText,
  Globe2,
  HardDrive,
  Info,
  Mail,
  RefreshCw,
  Server,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "Lampiran Proposal | MTsN 2 Kota Kediri",
  description:
    "Lampiran spesifikasi teknis pembuatan website, VPS hosting, dan langganan domain MTsN 2 Kota Kediri.",
};

const websiteFeatures = [
  "Website responsif untuk desktop, tablet, dan ponsel",
  "Halaman profil madrasah, visi misi, sejarah, sambutan, dan tenaga pendidik",
  "Modul berita, pengumuman, galeri, agenda, dan dokumentasi kegiatan",
  "Informasi PPDB, PPID, program madrasah, organisasi, riset, dan perpustakaan",
  "Panel admin untuk mengelola konten dan media tanpa mengubah kode program",
  "Optimasi SEO dasar, sitemap, metadata, keamanan akses, dan integrasi SSL",
];

const deliverables = [
  "Analisis kebutuhan dan penyusunan struktur halaman",
  "Desain antarmuka yang mengikuti identitas visual MTsN 2 Kota Kediri",
  "Pengembangan, pengisian konten awal, dan migrasi data yang disepakati",
  "Konfigurasi domain, deployment ke VPS, dan serah terima akses",
  "Panduan singkat pengelolaan konten untuk operator madrasah",
];

const vpsSpecs = [
  { label: "Paket", value: "KVM 2", icon: Server },
  { label: "CPU", value: "2 core", icon: Cpu },
  { label: "Memori", value: "8 GB", icon: HardDrive },
  { label: "Disk space", value: "100 GB", icon: HardDrive },
  { label: "Bandwidth", value: "8 TB", icon: Wifi },
  { label: "Mulai berlaku", value: "21 Oktober 2026", icon: CalendarDays },
];

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 sm:gap-6">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 sm:size-12 sm:text-base">
        {number}
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function LampiranProposalPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-zinc-950 dark:bg-zinc-950 dark:text-white print:bg-white print:text-black">
      <section className="relative overflow-hidden border-b border-zinc-200 bg-[#1e3a5f] text-white dark:border-zinc-800 print:border-b-2 print:border-zinc-900">
        <div className="absolute -right-24 -top-32 size-80 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 size-96 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 sm:pt-36 lg:px-8 lg:pb-20">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-100">
              <FileText className="size-3.5" aria-hidden="true" />
              Lampiran proposal
            </div>
            <PrintButton />
          </div>
          <div className="mt-10 max-w-4xl">
            <p className="text-sm font-semibold text-emerald-200 sm:text-base">
              MTsN 2 Kota Kediri
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">
              Spesifikasi teknis dan ruang lingkup layanan
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              Dokumen ini menjadi acuan untuk pekerjaan pembuatan website baru,
              penyediaan VPS hosting, dan langganan domain resmi madrasah.
            </p>
          </div>
          <div className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
            {[
              ["01", "Pembuatan website", "Platform informasi madrasah"],
              ["02", "VPS hosting", "KVM 2 dengan resource terukur"],
              ["03", "Domain", "mtsn2kk.sch.id"],
            ].map(([number, title, detail]) => (
              <a
                key={number}
                href={`#bagian-${number}`}
                className="group rounded-2xl border border-white/15 bg-white/10 p-4 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/50"
              >
                <span className="font-mono text-xs text-emerald-200">{number}</span>
                <span className="mt-2 block font-bold">{title}</span>
                <span className="mt-1 block text-sm text-blue-100">{detail}</span>
                <ArrowRight className="mt-4 size-4 text-emerald-300 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 lg:px-8 lg:py-20">
        <div className="space-y-12 sm:space-y-16">
          <section id="bagian-01" className="scroll-mt-28">
            <SectionHeading
              number="01"
              eyebrow="Jasa pembuatan website baru"
              title="Website resmi yang mudah dikelola"
              description="Pembuatan website dilakukan dari analisis kebutuhan sampai serah terima. Struktur konten disiapkan untuk mendukung komunikasi publik, layanan informasi, dan dokumentasi kegiatan madrasah."
            />

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <Code2 className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-black">Spesifikasi website</h3>
                </div>
                <ul className="mt-6 space-y-3">
                  {websiteFeatures.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                    <ShieldCheck className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-black">Hasil pekerjaan</h3>
                </div>
                <ul className="mt-6 space-y-3">
                  {deliverables.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section id="bagian-02" className="scroll-mt-28 border-t border-zinc-200 pt-12 dark:border-zinc-800 sm:pt-16">
            <SectionHeading
              number="02"
              eyebrow="Langganan hosting"
              title="VPS untuk menjalankan aplikasi website"
              description="Website ditempatkan pada VPS dengan resource berikut. Konfigurasi aplikasi dan deployment dilakukan setelah akses server tersedia."
            />
            <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3">
                {vpsSpecs.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-4 border-b border-zinc-200 p-5 last:border-b-0 dark:border-zinc-800 sm:nth-[odd]:border-r lg:nth-[3n+1]:border-r lg:nth-[3n+2]:border-r">
                    <Icon className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{label}</p>
                      <p className="mt-1 font-bold text-zinc-950 dark:text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 border-t border-zinc-200 bg-zinc-50 p-5 text-sm leading-6 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-400">
                <Info className="mt-1 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                <p>Paket dan resource mengikuti informasi paket KVM 2 pada saat penyusunan lampiran. Perubahan paket dapat dilakukan sesuai kebutuhan trafik dan kapasitas aplikasi.</p>
              </div>
            </div>
          </section>

          <section id="bagian-03" className="scroll-mt-28 border-t border-zinc-200 pt-12 dark:border-zinc-800 sm:pt-16">
            <SectionHeading
              number="03"
              eyebrow="Langganan domain"
              title="Identitas digital madrasah"
              description="Domain menjadi alamat resmi yang digunakan masyarakat untuk mengakses website dan layanan informasi MTsN 2 Kota Kediri."
            />
            <div className="mt-8 rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm dark:border-emerald-900/60 dark:bg-zinc-900/60 sm:p-8">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Nama domain</p>
                  <p className="mt-3 break-all text-3xl font-black tracking-tight text-[#1e3a5f] dark:text-white sm:text-4xl">mtsn2kk.sch.id</p>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">Ekstensi pendidikan Indonesia untuk identitas resmi MTsN 2 Kota Kediri.</p>
                </div>
                <Globe2 className="size-10 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              </div>
              <div className="mt-8 grid gap-4 border-t border-zinc-200 pt-6 dark:border-zinc-800 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Nameserver</p>
                  <p className="mt-2 font-mono text-sm leading-7 text-zinc-800 dark:text-zinc-200">athena.dns-parking.com<br />apollo.dns-parking.com</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Periode layanan</p>
                  <p className="mt-2 font-semibold text-zinc-800 dark:text-zinc-200">1 tahun per siklus pendaftaran</p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Perpanjangan dilakukan sebelum masa berlaku berakhir.</p>
                </div>
              </div>
              <div className="mt-6 flex gap-3 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
                <RefreshCw className="mt-1 size-4 shrink-0" aria-hidden="true" />
                <p>Perpanjangan otomatis pada registrar dapat diaktifkan oleh pemilik akun. Status ini perlu dikonfirmasi saat proses administrasi domain.</p>
              </div>
            </div>
          </section>

          <section className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <div className="rounded-3xl bg-[#1e3a5f] p-6 text-white sm:p-8">
              <div className="flex gap-4">
                <Mail className="mt-1 size-5 shrink-0 text-emerald-300" aria-hidden="true" />
                <div>
                  <h2 className="text-lg font-black">Catatan pelaksanaan</h2>
                  <p className="mt-3 text-sm leading-7 text-blue-100">
                    Detail jadwal, harga, metode pembayaran, materi konten, dan batas revisi mengikuti proposal utama serta kesepakatan kerja. Spesifikasi pada lampiran ini dapat disesuaikan melalui berita acara perubahan apabila kebutuhan madrasah berkembang.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start print:hidden">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Ringkasan</p>
            <h2 className="mt-2 text-xl font-black">Tiga komponen pengadaan</h2>
            <div className="mt-6 space-y-5">
              {[
                ["01", "Website", "Pembuatan platform informasi dan panel admin"],
                ["02", "VPS KVM 2", "2 core · 8 GB · 100 GB · 8 TB"],
                ["03", "mtsn2kk.sch.id", "Domain pendidikan untuk identitas madrasah"],
              ].map(([number, title, detail]) => (
                <a key={number} href={`#bagian-${number}`} className="group flex gap-3 rounded-xl p-2 -mx-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30">
                  <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">{number}</span>
                  <span>
                    <span className="block font-bold">{title}</span>
                    <span className="mt-1 block text-sm leading-5 text-zinc-600 dark:text-zinc-400">{detail}</span>
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-6 border-t border-zinc-200 pt-5 text-sm leading-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              <p>Dokumen pendukung proposal</p>
              <p className="mt-1 font-semibold text-zinc-800 dark:text-zinc-200">MTsN 2 Kota Kediri</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
