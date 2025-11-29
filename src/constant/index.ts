import { Star, Sparkles, ShoppingBag, BuildingIcon } from "lucide-react";
import { CgSmartphone } from "react-icons/cg";
import {
  Globe,
  ShieldCheck,
  MailCheck,
  Smartphone,
  SearchCheck,
  BarChart4,
} from "lucide-react";

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
    name: "Arenaku",
    description:
      "Website booking lapangan online yang memudahkan pengguna dalam mencari lapangan yang sesuai dengan kebutuhan dan waktu.",
    features: [
      "Dashboard admin untuk pengelolaan data lapangan",
      "Sistem manajemen jadwal dan ketersediaan lapangan",
      "Otentikasi Google",
      "Integrasi pembayaran Midtrans",
      "Tampilan responsif dan mudah digunakan",
    ],
    preview: "",
    image: "/images/arenaku.webp",
    frameworks: [
      { id: 1, name: "Laravel" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "MySQL" },
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
    priority: true,
  },
  {
    id: 4,
    name: "Bank Sha",
    description:
      "Aplikasi e-wallet yang memudahkan pengguna dalam melakukan transaksi dan mengelola saldo.",
    features: [
      "Melakukan transaksi (Top up, transfer, pembayaran)",
      "Manajemen saldo dan riwayat transaksi",
      "Integrasi pembayaran via Midtrans",
      "UI responsif dan modern",
    ],
    preview: "",
    image: "/images/bank-sha.webp",
    frameworks: [
      { id: 1, name: "Flutter" },
      { id: 2, name: "Bloc" },
      { id: 3, name: "Laravel" },
      { id: 4, name: "MySQL" },
    ],
  },
  {
    id: 5,
    name: "Sahabat Buku",
    description: "Aplikasi peminjaman buku sederhana.",
    features: [
      "Otentikasi menggunakan Firebase Auth",
      "Peminjaman buku secara real-time",
      "Pengembalian buku & update stok otomatis",
      "Riwayat peminjaman lengkap",
      "Tampilan Responsive",
    ],
    preview: "",
    image: "/images/sahabat-buku.webp",
    frameworks: [
      { id: 1, name: "Flutter" },
      { id: 2, name: "GetX" },
      { id: 3, name: "Firebase" },
    ],
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
    priority: true,
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
    name: "Website Basic",
    price: "750k",
    description:
      "Cocok untuk UMKM yang baru memulai digitalisasi dan butuh website sederhana.",
    features: [
      "1 Halaman (Landing Page)",
      "Gratis Domain & Hosting 1 Tahun",
      "Basic SEO",
      "Desain Responsif",
      "WhatsApp Chat",
      "2x Revisi",
    ],
    icon: Sparkles,
  },

  {
    name: "Premium",
    price: "1,5 – 2 Juta",
    description:
      "Pilihan ideal untuk bisnis yang butuh lebih banyak halaman dan fitur profesional.",
    features: [
      "5 Halaman",
      "Gratis Domain & Hosting 1 Tahun",
      "Desain Responsif",
      "SEO Friendly",
      "Email Profesional",
      "WhatsApp Chat",
      "Integrasi Social Media",
      "3x Revisi",
    ],
    popular: true,
    icon: Star,
  },

  {
    name: "Website Business",
    price: "2 – 3,5 Juta",
    description:
      "Direkomendasikan untuk perusahaan yang membutuhkan website skala bisnis.",
    features: [
      "10 – 15 Halaman",
      "Gratis Domain & Hosting 1 Tahun",
      "Desain Responsif",
      "SEO Friendly",
      "Hosting pribadi 25GB",
      "WhatsApp Chat",
      "Email Profesional",
      "Integrasi Social Media",
      "4x Revisi",
    ],
    icon: BuildingIcon,
  },

  {
    name: "Web E-Commerce",
    price: "3 – 5 Juta",
    description:
      "Untuk bisnis yang ingin menjual produk secara online dengan fitur modern.",
    features: [
      "10+ Halaman",
      "Gratis Domain & Hosting 1 Tahun",
      "Halaman katalog produk",
      "Add to Cart / Order via WA",
      "Dashboard Admin (opsional)",
      "Email Profesional",
      "Desain Responsif",
      "SEO Friendly",
      "Integrasi Payment Gateway",
      "Hitung Ongkir Otomatis",
      "3x Revisi",
    ],
    icon: ShoppingBag,
  },

  {
    name: "Aplikasi Mobile",
    price: "5 – 25 Juta",
    description:
      "Solusi aplikasi mobile hybrid (Flutter) untuk bisnis yang ingin berkembang pesat.",
    features: [
      "Desain UI/UX",
      "Aplikasi Android (iOS opsional)",
      "API & Backend",
      "Auth & Database",
      "Dashboard Admin",
      "Integrasi Payment Gateway (opsional)",
      "Push Notification",
      "Deployment ke Play Store",
      "3x Revisi",
    ],
    icon: CgSmartphone,
  },
];

export const serviceFeatures = [
  {
    id: 1,
    title: "Domain + Hosting Premium Gratis 1 Tahun",
    description:
      "Dapatkan domain .com/.co.id + hosting 10GB NVMe SSD tanpa biaya tambahan selama setahun penuh.",
    icon: Globe,
  },
  {
    id: 2,
    title: "SSL Certificate & IP Dedicated",
    description:
      "Website Anda dilindungi enkripsi SSL kelas enterprise + IP khusus untuk keamanan dan kecepatan maksimal.",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "Email Profesional Custom Domain",
    description:
      "Email bisnis resmi seperti nama@perusahaan Anda (unlimited alias, akses webmail & mobile).",
    icon: MailCheck,
  },
  {
    id: 4,
    title: "100% Mobile Responsive",
    description:
      "Tampilan sempurna di HP, tablet, hingga desktop — pengunjung nyaman dari perangkat apa pun.",
    icon: Smartphone,
  },
  {
    id: 5,
    title: "Optimasi SEO On-Page Terbaik",
    description:
      "Struktur kode, meta tag, kecepatan loading, dan schema markup sudah dioptimalkan agar mudah nangkring di Google.",
    icon: SearchCheck,
  },
  {
    id: 6,
    title: "Dashboard Statistik Pengunjung Real-time",
    description:
      "Pantau jumlah pengunjung, asal kota, halaman favorit, dan perilaku user langsung dari dashboard website Anda.",
    icon: BarChart4,
  },
];
