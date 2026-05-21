import {
  Star,
  Sparkles,
  ShoppingBag,
  BuildingIcon,
  Globe,
  ShieldCheck,
  MailCheck,
  Smartphone,
  SearchCheck,
  BarChart4,
} from "lucide-react";
import { CgSmartphone } from "react-icons/cg";

export interface Project {
  id: number;
  name: string;
  description: string;
  features: string[];
  preview: string;
  image: string;
  frameworks: Array<{ id: number; name: string }>;
  priority?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Diary Food",
    description:
      "A website used as inspiration for finding various local and international recipes for food and drinks.",
    features: [
      "Manajemen resep melalui dashboard admin",
      "Halaman pengguna untuk eksplorasi dan personalisasi",
      "Membuat resep baru lengkap dengan foto & langkah",
      "Menyimpan resep favorit",
      "Berbagi resep ke publik",
      "Memberi rating dan komentar pada resep",
      "Pencarian resep berbasis AI",
      "Otentikasi Google",
      "Desain responsif untuk semua perangkat",
    ],
    preview: "https://diary-food1222.vercel.app/",
    image: "/images/diaryfood.webp",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Express.js" },
      { id: 4, name: "AI Integration" },
    ],
  },
  {
    id: 2,
    name: "BankDash.",
    description:
      "Website e-wallet yang memudahkan pengguna dalam melakukan transaksi dan mengelola saldo.",
    features: [
      "Dashboard admin untuk manajemen transaksi",
      "Halaman pengguna untuk eksplorasi dan personalisasi",
      "Memantau Credit Cards",
      "Menambahkan saldo",
      "Tampilan responsif dan mudah digunakan",
    ],
    preview: "https://bankdash-indol.vercel.app/",
    image: "/images/bank-dash.png",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Express.js" },
      { id: 4, name: "AI Integration" },
    ],
  },
  {
    id: 3,
    name: "Sewa Mobilin",
    description:
      "Website rental mobil yang memudahkan pengguna dalam mencari mobil yang sesuai dengan kebutuhan.",
    features: [
      "Sistem pencarian mobil berdasarkan kategori dan kebutuhan",
      "Integrasi WhatsApp untuk pemesanan langsung",
      "Desain responsif dan mobile-friendly",
    ],
    preview: "https://sewa-mobilin.vercel.app/",
    image: "/images/sewa-mobilin.webp",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "Next.js" },
    ],
  },
  {
    id: 4,
    name: "Gundul Trans",
    description:
      "Website untuk rental kendaraan bermobil yang memudahkan pengguna dalam mencari mobil yang sesuai dengan kebutuhan.",
    features: [
      "Sistem pencarian mobil berdasarkan kategori dan kebutuhan",
      "Integrasi WhatsApp untuk pemesanan langsung",
      "Desain responsif dan mobile-friendly",
    ],
    preview: "https://gundul-trans.netlify.app/",
    image: "/images/gundul-trans.png",
    frameworks: [
      { id: 1, name: "Flutter" },
      { id: 2, name: "Bloc" },
      { id: 3, name: "Laravel" },
      { id: 4, name: "MySQL" },
    ],
    priority: true,
  },
  {
    id: 5,
    name: "Kopi Padma",
    description:
      "Website Coffee Shop yang menawarkan menu kopi dan makanan untuk kebutuhan santai anda.",
    features: [
      "Menu kopi dan makanan lengkap",
      "Pemesanan menu kopi dan makanan",
      "Reservasi meja dan event",
      "Pembayaran online",
      "Desain responsif",
    ],
    preview: "https://kopipadma.vercel.app/",
    image: "/images/kopi-padma.png",
    frameworks: [
      { id: 1, name: "Flutter" },
      { id: 2, name: "GetX" },
      { id: 3, name: "Firebase" },
    ],
    priority: true,
  },
  {
    id: 6,
    name: "Angkutin",
    description:
      "A smart waste management system designed to optimize waste collection and monitoring through intelligent technology.",
    features: [
      "Manajemen pengangkutan sampah berbasis data",
      "Pelacakan status dan jadwal pengambilan",
      "Tampilan responsif dengan UI modern",
    ],
    preview: "https://angkutin-omega.vercel.app/",
    image: "/images/angkutin.webp",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "React" },
      { id: 3, name: "Laravel as BE" },
      { id: 4, name: "Express.js" },
    ],
  },
  {
    id: 7,
    name: "Nesavent",
    description:
      "Landing page website for an event management platform at Surabaya State University.",
    features: [
      "Sistem registrasi event dan pembelian tiket",
      "Integrasi pembayaran online",
      "Manajemen event, jadwal, dan kapasitas peserta",
      "Landing page dengan UI modern",
    ],
    preview: "https://nesavent.vercel.app/",
    image: "/images/nesavent.webp",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "React" },
      { id: 3, name: "Tailwind CSS" },
    ],
  },
  {
    id: 8,
    name: "Sadari 4Life",
    description:
      "A hypertension screening website that allows users to perform self-assessments through interactive tests for early detection and management.",
    features: [
      "Tes pemeriksaan hipertensi berbasis pertanyaan interaktif",
      "Perhitungan otomatis & tampilan hasil diagnosis",
      "Rekomendasi tindakan dan perawatan awal",
      "Ekspor data ke format CSV",
      "Desain responsif untuk akses mobile dan desktop",
    ],
    preview: "https://sadari4life.vercel.app/",
    image: "/images/sadari.webp",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "React" },
      { id: 3, name: "Express.js" },
      { id: 4, name: "Prisma (ORM)" },
    ],
    priority: true,
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "Rp 500.000 – 1.500.000",
    description: "Tampil profesional online, mulai dari budget yang masuk akal.",
    tagline: "Tampil profesional online, mulai dari budget yang masuk akal.",
    category: "Web Solution",
    badge: "",
    features: [
      "Landing page / website 1–3 halaman",
      "Desain custom (bukan template)",
      "Domain .my.id 1 tahun (gratis)",
      "Hosting 1 tahun (gratis)",
      "Mobile responsive",
      "Basic SEO (meta title & description)",
      "WhatsApp chat button",
      "2x revisi"
    ],
    add_ons: [
      { name: "Dashboard / CMS", price: "+Rp 500.000", description: "Kelola konten sendiri tanpa perlu minta bantuan kami" },
      { name: "Maintenance Basic", price: "Rp 250.000/bulan", description: "Update teks & gambar maks 5x/bulan, backup mingguan, monitor uptime 24/7" },
      { name: "Extra Revisi", price: "Rp 150.000/sesi", description: "Di luar kuota revisi paket" },
      { name: "Custom Domain .com", price: "+Rp 200.000", description: "Upgrade dari .my.id ke .com" }
    ],
    popular: false,
    icon: Sparkles,
    icon_name: "Sparkles",
  },
  {
    name: "Business",
    price: "Rp 3.000.000 – 5.000.000",
    description: "Website yang bikin bisnis kamu terlihat serius dan dipercaya.",
    tagline: "Website yang bikin bisnis kamu terlihat serius dan dipercaya.",
    category: "Web Solution",
    badge: "★ Paling Populer",
    features: [
      "5–15 halaman (Home, About, Services, Portfolio, Blog, Contact)",
      "Desain custom sesuai identitas brand",
      "Domain .com 1 tahun (gratis)",
      "Hosting 1 tahun (gratis)",
      "Mobile responsive",
      "SEO On-Page semua halaman",
      "Email profesional nama@domain.com — 3 akun",
      "WhatsApp chat + form kontak",
      "Integrasi Google Analytics",
      "Integrasi social media",
      "3x revisi"
    ],
    add_ons: [
      { name: "Dashboard / CMS", price: "+Rp 500.000", description: "Kelola konten & halaman secara mandiri" },
      { name: "Maintenance Pro", price: "Rp 500.000/bulan", description: "Semua Basic + update minor fitur, laporan performa bulanan, priority support respon <4 jam" },
      { name: "Email Profesional Tambahan", price: "Rp 50.000/akun/tahun", description: "Tambah akun email di luar 3 yang sudah include" },
      { name: "Extra Revisi", price: "Rp 150.000/sesi", description: "Di luar kuota revisi paket" },
      { name: "Blog System", price: "+Rp 300.000", description: "Sistem artikel/blog yang bisa dikelola sendiri" }
    ],
    popular: true,
    icon: Star,
    icon_name: "Star",
  },
  {
    name: "E-Commerce",
    price: "Rp 5.000.000 – 8.000.000",
    description: "Toko online lengkap yang siap terima order dan pembayaran sejak hari pertama.",
    tagline: "Toko online lengkap yang siap terima order dan pembayaran sejak hari pertama.",
    category: "Web Solution",
    badge: "",
    features: [
      "10+ halaman",
      "Desain custom",
      "Domain .com 1 tahun (gratis)",
      "Hosting 10GB 1 tahun (gratis)",
      "Katalog produk unlimited",
      "Sistem keranjang & checkout",
      "Integrasi payment gateway (Midtrans / Xendit)",
      "Hitung ongkir otomatis (RajaOngkir)",
      "Dashboard admin — kelola produk & order (sudah include)",
      "Email profesional — 5 akun",
      "SEO On-Page",
      "Mobile responsive",
      "3x revisi"
    ],
    add_ons: [
      { name: "Maintenance Pro", price: "Rp 500.000/bulan", description: "Update konten, monitor performa, priority support" },
      { name: "Payment Gateway Tambahan", price: "+Rp 500.000", description: "Integrasi gateway tambahan selain yang sudah include" },
      { name: "Migrasi Produk", price: "Sesuai volume", description: "Pindahkan data produk dari platform lama" },
      { name: "Extra Revisi", price: "Rp 150.000/sesi", description: "Di luar kuota revisi paket" },
      { name: "Email Profesional Tambahan", price: "Rp 50.000/akun/tahun", description: "Tambah akun di luar 5 yang sudah include" }
    ],
    popular: false,
    icon: ShoppingBag,
    icon_name: "ShoppingBag",
  },
  {
    name: "App Starter",
    price: "Rp 8.000.000 – 15.000.000",
    description: "Aplikasi mobile pertama kamu — fungsional, clean, dan siap dipakai user.",
    tagline: "Aplikasi mobile pertama kamu — fungsional, clean, dan siap dipakai user.",
    category: "Mobile App",
    badge: "★ Paling Populer",
    features: [
      "UI/UX design custom",
      "Android — Flutter (iOS opsional)",
      "Sistem autentikasi (login, register, lupa password)",
      "Database & API backend",
      "Push notification",
      "Dashboard admin berbasis web (sudah include)",
      "Deploy ke Google Play Store",
      "3x revisi"
    ],
    add_ons: [
      { name: "Platform iOS", price: "+Rp 3.000.000", description: "Tambah build & deploy ke App Store" },
      { name: "Maintenance App", price: "Rp 1.000.000/bulan", description: "Bug fix, monitor crash, update minor, backup database" },
      { name: "Extra Revisi", price: "Rp 300.000/sesi", description: "Di luar kuota revisi paket" },
      { name: "Integrasi Payment Gateway", price: "+Rp 2.000.000", description: "Tambah sistem pembayaran in-app" }
    ],
    popular: true,
    icon: CgSmartphone,
    icon_name: "CgSmartphone",
  },
  {
    name: "App Business",
    price: "Rp 15.000.000 – 30.000.000",
    description: "Aplikasi kompleks, multi-platform, siap scale bersama bisnis kamu.",
    tagline: "Aplikasi kompleks, multi-platform, siap scale bersama bisnis kamu.",
    category: "Mobile App",
    badge: "",
    features: [
      "UI/UX design custom & advanced",
      "Android + iOS (Flutter)",
      "Multi-role user (customer, admin, kurir, mitra, dll)",
      "Real-time features (live tracking, chat, notifikasi instan)",
      "Integrasi payment gateway (Midtrans / Xendit / Doku)",
      "Integrasi API pihak ketiga (maps, logistik, dll)",
      "Database & API backend scalable",
      "Dashboard admin web lengkap (sudah include)",
      "Deploy ke Play Store & App Store",
      "Dokumentasi teknis",
      "5x revisi"
    ],
    add_ons: [
      { name: "Tech Retainer", price: "Rp 1.500.000/bulan", description: "Development 10 jam/bulan + dedicated developer + semua maintenance" },
      { name: "Maintenance App", price: "Rp 1.000.000/bulan", description: "Bug fix, monitor, update minor tanpa development tambahan" },
      { name: "Extra Integrasi API", price: "Sesuai scope", description: "Integrasi sistem eksternal di luar yang sudah disepakati" },
      { name: "Extra Revisi", price: "Rp 300.000/sesi", description: "Di luar kuota revisi paket" }
    ],
    popular: false,
    icon: CgSmartphone,
    icon_name: "CgSmartphone",
  },
  {
    name: "HRIS / ERP Custom",
    price: "Mulai Rp 20.000.000",
    description: "Sistem internal yang dibangun sesuai alur bisnis kamu — bukan software generik yang dipaksakan.",
    tagline: "Sistem internal yang dibangun sesuai alur bisnis kamu — bukan software generik yang dipaksakan.",
    category: "Enterprise",
    badge: "Enterprise",
    features: [
      "Analisis kebutuhan & konsultasi sistem (gratis)",
      "Scope document & proposal teknis",
      "Web-based + mobile app",
      "Multi-user dengan manajemen hak akses",
      "Training tim (online / onsite)",
      "Dokumentasi teknis lengkap",
      "Support 3 bulan setelah go-live",
      "MODUL: Manajemen karyawan & data kepegawaian",
      "MODUL: Absensi digital (GPS / QR Code / Face Recognition)",
      "MODUL: Penggajian otomatis & slip gaji digital",
      "MODUL: Manajemen cuti & izin",
      "MODUL: Manajemen lembur & perhitungan otomatis",
      "MODUL: Evaluasi kinerja karyawan",
      "MODUL: Laporan HR real-time & export",
      "MODUL: Manajemen aset & inventori (ERP)",
      "MODUL: Manajemen pembelian & penjualan (ERP)"
    ],
    add_ons: [
      { name: "Perpanjangan Support", price: "Rp 2.000.000/bulan", description: "Setelah 3 bulan support gratis habis" },
      { name: "Modul Tambahan", price: "Sesuai scope", description: "Tambah modul baru setelah sistem live" },
      { name: "Training Tambahan", price: "Rp 500.000/sesi", description: "Training onsite / online untuk tim baru" }
    ],
    popular: false,
    icon: BuildingIcon,
    icon_name: "BuildingIcon",
  }
];

export const serviceFeatures = [
  {
    id: 1,
    title: "Domain + Hosting Premium Gratis 1 Tahun",
    description:
      "Dapatkan domain .com/.co.id + hosting 10GB NVMe SSD tanpa biaya tambahan selama setahun penuh.",
    icon: Globe,
    icon_name: "Globe",
  },
  {
    id: 2,
    title: "SSL Certificate & IP Dedicated",
    description:
      "Website Anda dilindungi enkripsi SSL kelas enterprise + IP khusus untuk keamanan dan kecepatan maksimal.",
    icon: ShieldCheck,
    icon_name: "ShieldCheck",
  },
  {
    id: 3,
    title: "Email Profesional Custom Domain",
    description:
      "Email bisnis resmi seperti nama@perusahaan Anda (unlimited alias, akses webmail & mobile).",
    icon: MailCheck,
    icon_name: "MailCheck",
  },
  {
    id: 4,
    title: "100% Mobile Responsive",
    description:
      "Tampilan sempurna di HP, tablet, hingga desktop — pengunjung nyaman dari perangkat apa pun.",
    icon: Smartphone,
    icon_name: "Smartphone",
  },
  {
    id: 5,
    title: "Optimasi SEO On-Page Terbaik",
    description:
      "Struktur kode, meta tag, kecepatan loading, dan schema markup sudah dioptimalkan agar mudah nangkring di Google.",
    icon: SearchCheck,
    icon_name: "SearchCheck",
  },
  {
    id: 6,
    title: "Dashboard Statistik Pengunjung Real-time",
    description:
      "Pantau jumlah pengunjung, asal kota, halaman favorit, dan perilaku user langsung dari dashboard website Anda.",
    icon: BarChart4,
    icon_name: "BarChart4",
  },
];

export const testimonials = [
  {
    name: "Rama Pratama",
    photo: "/images/testimoni2.avif",
    review:
      "Pelayanan sangat memuaskan. Website ini membantu saya menemukan informasi dengan cepat.",
  },
  {
    name: "Dewi Anjani",
    photo: "/images/testimoni1.avif",
    review:
      "Desainnya modern dan responsif. Saya sangat merekomendasikannya untuk kebutuhan profesional.",
  },
  {
    name: "Fajar Nugroho",
    photo: "/images/testimoni3.avif",
    review:
      "Navigasi jelas dan fitur-fiturnya lengkap. Pengalaman pengguna terasa sangat nyaman.",
  },
];
