import type {
  PpidSection,
  PublicInformationPage,
  ZiEvidenceArea,
} from "@/types/public-information";

export const ziEvidenceAreas: ZiEvidenceArea[] = [
  {
    number: "01",
    title: "Manajemen Perubahan",
    description:
      "Penguatan komitmen, agen perubahan, rencana kerja, dan budaya kerja berintegritas.",
    driveUrl:
      "https://drive.google.com/drive/folders/1LeTVtr7FMQPqF6c9ynVoIqCaPY9uj92_",
  },
  {
    number: "02",
    title: "Penataan Tatalaksana",
    description:
      "Pembenahan prosedur layanan, proses kerja, dan pemanfaatan teknologi informasi.",
    driveUrl:
      "https://drive.google.com/drive/folders/1NJS3_scdf_2j1AnoG_NJr-7cWJy4QFSs",
  },
  {
    number: "03",
    title: "Penataan Sistem Manajemen SDM",
    description:
      "Pengelolaan sumber daya manusia yang profesional, disiplin, dan berorientasi kinerja.",
    driveUrl:
      "https://drive.google.com/drive/folders/1G6p0OnbyUXhSxXmvZUrLWhbFjvah3eJh",
  },
  {
    number: "04",
    title: "Penguatan Akuntabilitas",
    description:
      "Perencanaan, pelaporan, dan evaluasi kinerja yang terukur serta dapat dipertanggungjawabkan.",
    driveUrl:
      "https://drive.google.com/drive/folders/1Xt2yJ3X7HtmT80BCtxdI_Ww_6b2TvhQH",
  },
  {
    number: "05",
    title: "Penguatan Pengawasan",
    description:
      "Pengendalian gratifikasi, pengaduan masyarakat, benturan kepentingan, dan pengawasan internal.",
    driveUrl:
      "https://drive.google.com/drive/folders/1WQH70aLNEBsYxc9ubevwuIf5golJxdGH",
  },
  {
    number: "06",
    title: "Peningkatan Kualitas Pelayanan Publik",
    description:
      "Standar layanan, inovasi pelayanan, survei kepuasan, dan tindak lanjut perbaikan layanan.",
    driveUrl:
      "https://drive.google.com/drive/folders/1h4cWOdhl-yL2FT36-NJmFu4w99VbF1AD",
  },
];

export const ppidSections: PpidSection[] = [
  {
    id: "profil-ppid",
    title: "Profil PPID",
    description:
      "PPID Madtsanda menjadi kanal pengelolaan dan pelayanan informasi publik di lingkungan madrasah.",
    items: [
      "Menyediakan akses informasi publik yang terbuka, akurat, dan mudah dipahami.",
      "Mendokumentasikan informasi madrasah agar dapat dilayani sesuai ketentuan keterbukaan informasi publik.",
      "Menjaga informasi yang dikecualikan sesuai aturan dan kepentingan perlindungan data.",
    ],
  },
  {
    id: "struktur-ppid",
    title: "Struktur PPID",
    description:
      "Struktur layanan PPID disusun agar permohonan informasi dapat diterima, diproses, dan dijawab dengan jelas.",
    items: [
      "Atasan PPID mengoordinasikan kebijakan layanan informasi publik.",
      "PPID mengelola permohonan, dokumentasi, daftar informasi, dan koordinasi lintas unit.",
      "Petugas layanan membantu registrasi, komunikasi pemohon, dan administrasi informasi.",
    ],
  },
  {
    id: "visi-misi-moto-ppid",
    title: "Visi Misi Moto PPID",
    description:
      "Layanan informasi diarahkan untuk menjadi cepat, tanggap, akurat, dan bertanggung jawab.",
    items: [
      "Visi: terwujudnya pelayanan informasi yang tanggap, cepat, dan akurat.",
      "Misi: meningkatkan kualitas layanan informasi, kompetensi petugas, sarana layanan, dan koordinasi.",
      "Moto: Tanggap, Cepat, dan Akurat dalam melayani kebutuhan informasi publik.",
    ],
  },
  {
    id: "tujuan-fungsi-ppid",
    title: "Tujuan dan Fungsi PPID",
    description:
      "PPID menjalankan fungsi pengelolaan informasi publik mulai dari pendataan hingga pelayanan permohonan.",
    items: [
      "Menghimpun, mengklasifikasi, dan memutakhirkan informasi publik madrasah.",
      "Menyediakan layanan permohonan informasi serta membantu pemohon mengikuti alur layanan.",
      "Melakukan koordinasi, evaluasi, dan pelaporan layanan informasi publik secara berkala.",
    ],
  },
  {
    id: "sk-ppid",
    title: "SK PPID",
    description:
      "Surat keputusan PPID menjadi dasar penetapan pengelolaan dan pelayanan informasi publik madrasah.",
    items: [
      "Dokumen SK PPID menjadi bagian dari informasi pendukung layanan PPID.",
      "Pembaruan dokumen dilakukan sesuai kebijakan dan kebutuhan layanan informasi publik.",
      "<a href='https://drive.google.com/file/d/1g0k5r6J7x3Z8F9K2L4J5H6N7P8Q9R0S1/view?usp=sharing' target='_blank' rel='noopener noreferrer'>Unduh dokumen SK PPID</a>",
    ],
  },
];

export const complaintPages: PublicInformationPage[] = [
  {
    slug: "pengaduan-wbs-daring",
    title: "Pengaduan WBS Daring",
    category: "Pengaduan",
    description:
      "Kanal pengaduan whistleblowing system daring untuk mendukung pengawasan dan budaya kerja berintegritas.",
    items: [
      "Menerima laporan dugaan pelanggaran secara tertib dan terdokumentasi.",
      "Mendukung penguatan pengawasan dalam pembangunan Zona Integritas.",
      "Informasi tindak lanjut disesuaikan dengan ketentuan layanan pengaduan.",
    ],
  },
  {
    slug: "form-pengaduan",
    title: "Form Pengaduan",
    category: "Pengaduan",
    description:
      "Formulir pengaduan layanan madrasah untuk menyampaikan masukan, keluhan, atau laporan terkait pelayanan.",
    items: [
      "Pemohon dapat menyampaikan identitas, uraian laporan, dan bukti pendukung jika tersedia.",
      "Setiap pengaduan diarahkan agar dapat diverifikasi dan ditindaklanjuti dengan jelas.",
      "Data pelapor dikelola sesuai kebutuhan layanan dan perlindungan informasi.",
    ],
  },
  {
    slug: "sk-span-lapor",
    title: "SK Span Lapor",
    category: "Pengaduan",
    description:
      "Informasi dokumen keputusan terkait layanan SPAN Lapor sebagai bagian dari kanal pengaduan publik.",
    documentUrl: "/files/6.3.b2%20SK%20SPAN%20LAPOR%202026.pdf",
    items: [
      "Menjadi rujukan administrasi pengelolaan pengaduan layanan publik.",
      "Mendukung keterbukaan proses pelaporan dan tindak lanjut aduan.",
      "Dokumen pendukung dapat diperbarui mengikuti kebijakan instansi terkait.",
    ],
  },
  {
    slug: "kontak-aduan-kemenag-kota-kediri",
    title: "Kontak Aduan Laporan Kemenag Kota Kediri",
    category: "Pengaduan",
    description:
      "Informasi kontak aduan laporan Kemenag Kota Kediri untuk kanal koordinasi pengaduan eksternal.",
    items: [
      "Memudahkan masyarakat mengakses kanal pengaduan Kemenag Kota Kediri.",
      "Digunakan untuk laporan yang membutuhkan koordinasi dengan instansi Kemenag.",
      "Informasi kontak dapat menyesuaikan pembaruan resmi dari Kemenag Kota Kediri.",
    ],
  },
  {
    slug: "lapor-go-id",
    title: "Lapor.go.id",
    category: "Pengaduan",
    description:
      "Kanal pengaduan publik nasional melalui layanan LAPOR untuk aspirasi dan pengaduan masyarakat.",
    items: [
      "Terhubung dengan sistem pengelolaan pengaduan pelayanan publik nasional.",
      "Dapat digunakan untuk menyampaikan aspirasi dan pengaduan kepada instansi terkait.",
      "Gunakan tautan resmi untuk mengakses layanan LAPOR.",
    ],
    externalUrl: "https://www.lapor.go.id/",
  },
];

export const surveyPages: PublicInformationPage[] = [
  {
    slug: "survey-layanan-publik",
    title: "Survey Layanan Publik",
    category: "Survey",
    description:
      "Survei layanan publik untuk menghimpun penilaian dan masukan masyarakat terhadap layanan madrasah.",
    items: [
      "Mengukur pengalaman pengguna layanan secara berkala.",
      "Menjadi bahan evaluasi untuk peningkatan kualitas pelayanan publik.",
      "Hasil survei digunakan sebagai dasar perbaikan layanan madrasah.",
    ],
  },
  {
    slug: "indeks-survey-layanan",
    title: "Indeks Survey Layanan",
    category: "Survey",
    description:
      "Indeks survei layanan memuat ringkasan penilaian kualitas layanan publik berdasarkan hasil survei.",
    items: [
      "Menyajikan indikator kualitas pelayanan publik secara ringkas.",
      "Membantu memantau capaian dan area perbaikan layanan.",
      "Indeks dapat diperbarui mengikuti periode pelaksanaan survei.",
    ],
  },
];

export const ppidDetailPages: PublicInformationPage[] = [
  {
    slug: "profil-ppid",
    title: "Profil PPID",
    category: "PPID",
    description:
      "Profil Pejabat Pengelola Informasi dan Dokumentasi MTsN 2 Kota Kediri.",
    items: [
      "Mengelola informasi publik di lingkungan madrasah.",
      "Menyediakan akses informasi yang terbuka, akurat, dan mudah dipahami.",
      "Menjaga tata kelola informasi sesuai ketentuan keterbukaan informasi publik.",
    ],
  },
  {
    slug: "struktur-ppid",
    title: "Struktur PPID",
    category: "PPID",
    description:
      "Struktur pengelolaan layanan informasi publik untuk mendukung alur layanan yang jelas.",
    imageUrl: "/images/zi/STRUKTUR%20PPID.jpg",
    showInformation: false,
    items: [
      "Atasan PPID mengoordinasikan kebijakan layanan informasi publik.",
      "PPID mengelola permohonan, dokumentasi, dan daftar informasi publik.",
      "Petugas layanan membantu administrasi dan komunikasi dengan pemohon informasi.",
    ],
  },
  {
    slug: "visi-misi-moto-ppid",
    title: "Visi Misi Moto PPID",
    category: "PPID",
    description:
      "Arah, misi, dan moto PPID dalam menyediakan layanan informasi publik madrasah.",
    items: [
      "Visi layanan diarahkan pada informasi yang tanggap, cepat, dan akurat.",
      "Misi layanan menekankan kualitas pelayanan, koordinasi, dan kompetensi petugas.",
      "Moto PPID: Tanggap, Cepat, dan Akurat.",
    ],
  },
  {
    slug: "tujuan-fungsi-ppid",
    title: "Tujuan dan Fungsi PPID",
    category: "PPID",
    description:
      "Tujuan dan fungsi PPID dalam pengelolaan informasi publik di lingkungan madrasah.",
    items: [
      "Menghimpun, mengklasifikasi, dan memutakhirkan informasi publik madrasah.",
      "Menyediakan layanan permohonan informasi sesuai alur layanan.",
      "Melakukan koordinasi, evaluasi, dan pelaporan layanan informasi publik.",
    ],
  },
  {
    slug: "sk-ppid",
    title: "SK PPID",
    category: "PPID",
    description:
      "Surat keputusan PPID sebagai dasar penetapan pengelolaan layanan informasi publik.",
    documentUrl: "/files/SK%20Tim%20PPID%202026.pdf",
    items: [
      "Menjadi dasar administrasi pengelolaan PPID madrasah.",
      "Mendukung keterbukaan informasi publik melalui struktur layanan resmi.",
      "Dokumen dapat diperbarui sesuai kebijakan dan kebutuhan layanan informasi.",
    ],
  },
];
