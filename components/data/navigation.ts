import { programMadrasahNavItems } from "./program-madrasah";
import type { NavigationSection } from "@/types/navigation";

const aboutUs = [
  {
    label: "Sambutan kepala madrasah",
    description: "Pesan dan sapaan hangat Kepala Madrasah.",
    href: "/about/sambutan",
  },
  {
    label: "Sejarah",
    description: "Asal-usul dan rekam jejak madrasah.",
    href: "/about/sejarah",
  },
  {
    label: "Budaya",
    description: "Nilai Islami dan karakter lingkungan kami.",
    href: "/about/budaya",
  },
  {
    label: "Visi & Misi",
    description: "Target utama dan arah strategis kami.",
    href: "/about/visi-misi",
  },
  {
    label: "Galeri Madtsanda",
    description: "Dokumentasi visual gedung, lingkungan, dan aktivitas murid.",
    href: "/about/galeri",
  }
];

const organizations = [
  {
    label: "MPK dan OSIM",
    description: "Wadah organisasi murid untuk melatih kepemimpinan dan aspirasi.",
    href: "/organizations/mpk-osim",
  },
  {
    label: "Ekstrakurikuler",
    description: "Berbagai kegiatan minat dan bakat untuk mengembangkan potensi murid.",
    href: "/organizations/extracurricular",
  },
  {
    label: "Fivesa",
    description: "Komunitas/organisasi khusus madrasah untuk ajang kreativitas.",
    href: "/organizations/fivesa",
  }
];

export const services = [
  {
    label: "Madtsanda News",
    description: "Tempat melihat berita dan artikel Madtsanda.",
    href: "/news",
  },
  {
    label: "Research Repository",
    description: "Arsip digital karya ilmiah dan riset.",
    href: "/research",
  },
  {
    label: "Madtsanda Connect",
    description: "Portal integrasi sistem akademik digital.",
    href: "/login",
  },
  {
    label: "Modern Library",
    description: "Layanan perpustakaan digital dan fisik.",
    href: "/library",
  },
  {
    label: "Rapot Digital Madrasah",
    description: "Sistem penilaian murid madrasah resmi Kemenag.",
    href: "/rapot",
  }
];

const ziPpid = [
  {
    label: "Eviden",
    description: "Eviden pembangunan ZI menuju WBK dan layanan bersih.",
    href: "/zona-integritas",
  },
  {
    label: "Pengaduan",
    description: "Akses kanal pengaduan dan pelaporan layanan.",
    href: "/zona-integritas#pengaduan",
    children: [
      {
        label: "Pengaduan WBS Daring",
        description: "Kanal pengaduan whistleblowing system daring.",
        href: "/zona-integritas/pengaduan-wbs-daring",
      },
      {
        label: "Form Pengaduan",
        description: "Formulir pengaduan layanan madrasah.",
        href: "/zona-integritas/form-pengaduan",
      },
      {
        label: "SK Span Lapor",
        description: "Dokumen keputusan layanan SPAN Lapor.",
        href: "/zona-integritas/sk-span-lapor",
      },
      {
        label: "Kontak Aduan Laporan Kemenag Kota Kediri",
        description: "Kontak pengaduan laporan Kemenag Kota Kediri.",
        href: "/zona-integritas/kontak-aduan-kemenag-kota-kediri",
      },
      {
        label: "Lapor.go.id",
        description: "Kanal pengaduan publik nasional.",
        href: "/zona-integritas/lapor-go-id",
      },
    ],
  },
  {
    label: "Survey",
    description: "Akses informasi dan hasil survei layanan.",
    href: "/zona-integritas#survey",
    children: [
      {
        label: "Survey Layanan Publik",
        description: "Survei pengalaman dan kualitas layanan publik.",
        href: "https://smart.mtsn2kotakediri.web.id/survey.php",
      },
      {
        label: "Indeks Survey Layanan",
        description: "Indeks hasil survei layanan madrasah.",
        href: "https://smart.mtsn2kotakediri.web.id/lapsurvei.php",
      },
    ],
  },
  {
    label: "PPID",
    description: "Profil, struktur, visi misi, dan tugas layanan informasi publik.",
    href: "/ppid",
    children: [
      {
        label: "Profil PPID",
        description: "Profil Pejabat Pengelola Informasi dan Dokumentasi.",
        href: "/ppid/profil-ppid",
      },
      {
        label: "Struktur PPID",
        description: "Struktur pengelolaan layanan informasi publik.",
        href: "/ppid/struktur-ppid",
      },
      {
        label: "Visi Misi Moto PPID",
        description: "Arah, misi, dan moto layanan PPID.",
        href: "/ppid/visi-misi-moto-ppid",
      },
      {
        label: "Tujuan dan Fungsi PPID",
        description: "Tujuan dan fungsi pengelolaan informasi publik.",
        href: "/ppid/tujuan-fungsi-ppid",
      },
      {
        label: "SK PPID",
        description: "Surat keputusan pengelolaan layanan PPID.",
        href: "/ppid/sk-ppid",
      },
    ],
  },
];

export const navigationData: NavigationSection[] = [
  {
    label: "Program Madrasah",
    description: "Kurikulum, kesiswaan, humas, dan sarana prasarana.",
    items: programMadrasahNavItems,
  },
  {
    label: "Tentang Kami",
    description: "Sejarah, visi, dan misi Madrasah Tsanawiyah.",
    items: aboutUs,
  },
  {
    label: "Layanan",
    description: "Research Repository, Madtsanda Connect, Modern Library.",
    items: services,
  },
  {
    label: "Zona Integritas",
    description: "Zona Integritas dan layanan informasi publik madrasah.",
    items: ziPpid,
  },
  {
    label: "Organisasi",
    description: "MPK dan OSIM, Ekstrakurikuler.",
    items: organizations,
  },
];


export const footerLinks = [
  { label: "Profil", href: "/about" },
  { label: "Kurikulum", href: "/program-madrasah/kurikulum" },
  { label: "Kesiswaan", href: "/program-madrasah/kesiswaan" },
  { label: "PPDB", href: "/ppdb" },
  { label: "Fasilitas", href: "/facilities" },
  { label: "Research", href: "/research" },
  { label: "Zona Integritas", href: "/zona-integritas" },
];
