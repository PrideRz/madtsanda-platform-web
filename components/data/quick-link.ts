import { Role } from "@/types/access";
import {
  News28Color,
  Poll24Color,
  Person24Color,
  Library24Color,
  ContentView24Color,
  DocumentEdit16Color,
  Settings24Color,
  CheckmarkCircle24Color,
  Image24Color,
} from "@fluentui/react-icons";

interface QuickLink {
  title: string;
  description: string;
  url: string;
  className: string;
  roles: Role[];
  icon: React.ComponentType<{ className?: string }>;
}

export const quickLink: QuickLink[] = [
  {
    title: "Profil",
    description: "Lihat dan edit informasi pribadi",
    className: "",
    roles: ["student", "teacher", "administrator", "admin", "super_user"],
    icon: Person24Color,
    url: "/dashboard/profile",
  },
  {
    title: "Berita Terbaru",
    description: "Kumpulan berita terbaru madtsanda",
    className: "",
    icon: News28Color,
    roles: ["student", "teacher", "administrator", "admin", "super_user"],
    url: "/news",
  },
  {
    title: "Manajemen Berita",
    description: "Kendali penuh atas berita",
    className: "",
    icon: ContentView24Color,
    roles: ["admin", "super_user"],
    url: "/dashboard/news/table",
  },
  {
    title: "Arsip Penelitian Ilmiah",
    description: "Repositori penelitian MTsN 2 Kota Kediri",
    className: "",
    icon: Library24Color,
    roles: ["student", "admin", "super_user"],
    url: "/dashboard/research",
  },
  {
    title: "Unggah Penelitian Ilmiah",
    description: "Unggah penelitian kamu",
    roles: ["student", "super_user"],
    className: "",
    icon: Poll24Color,
    url: "/dashboard/research/create",
  },
  {
    title: "Manajemen Penelitian Murid",
    description: "Pusat kendali penelitian murid",
    roles: ["admin", "super_user"],
    className: "",
    icon: DocumentEdit16Color,
    url: "/dashboard/research/accept",
  },
  {
    title: "Manajemen Digital Library",
    description: "Kelola katalog buku dan status ketersediaan",
    roles: ["admin", "super_user"],
    className: "",
    icon: Library24Color,
    url: "/dashboard/library/table",
  },
  {
    title: "Kelola Popup",
    description: "Atur popup pada website",
    roles: ["admin", "super_user"],
    className: "",
    icon: Image24Color,
    url: "/dashboard/popup",
  },
  {
    title: "Kelola Akun",
    description: "Buat dan atur akun pengguna",
    roles: ["administrator", "super_user"],
    className: "",
    icon: Settings24Color,
    url: "/dashboard/profile/table",
  },
  {
    title: "Kelas, Mapel & QR",
    description: "Atur kelas dan kebutuhan jurnal",
    roles: ["administrator", "super_user"],
    className: "",
    icon: CheckmarkCircle24Color,
    url: "/dashboard/academic/classes",
  },
  {
    title: "Jadwal Pelajaran",
    description: "Lihat jadwal kelas",
    roles: ["student", "teacher", "administrator", "super_user"],
    className: "",
    icon: CheckmarkCircle24Color,
    url: "/dashboard/academic/schedule",
  },
  {
    title: "Jurnal Pembelajaran",
    description: "Isi jurnal melalui pemindaian QR kelas",
    roles: ["teacher", "administrator", "super_user"],
    className: "",
    icon: DocumentEdit16Color,
    url: "/dashboard/academic/journal",
  },
  {
    title: "Tugas & Pengumuman",
    description: "Lihat atau atur agenda kelas",
    roles: ["student", "teacher", "super_user"],
    className: "",
    icon: News28Color,
    url: "/dashboard/academic/announcements",
  },
  {
    title: "Raport LHB",
    description: "Akses raport sesuai kelas dan peran",
    roles: ["student", "teacher", "administrator", "super_user"],
    className: "",
    icon: Library24Color,
    url: "/dashboard/academic/report",
  },
];
