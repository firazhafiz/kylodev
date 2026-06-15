# PRD — Promo Banner & Admin Configuration
## KyloDev | Early Bird / Limited Slot Promotion System

**Versi:** 1.0  
**Tanggal:** Mei 2026  
**Status:** Ready for Development

---

## 1. OVERVIEW & TUJUAN

### Latar Belakang
KyloDev membutuhkan sistem promo yang dapat ditampilkan di homepage sebagai conversion booster untuk traffic dari iklan maupun organik. Promo harus terasa genuine dan tidak manipulatif — menggunakan mekanisme "Early Bird" atau "Limited Slot" yang memiliki narasi bisnis yang masuk akal, bukan countdown yang bisa di-reset.

Seluruh konfigurasi promo harus dapat dikelola mandiri oleh admin melalui dashboard tanpa perlu menyentuh kode.

### Tujuan
- Meningkatkan konversi pengunjung homepage → WhatsApp / pricing page
- Memberikan urgency yang legitimate dan believable
- Memudahkan admin mengaktifkan, menonaktifkan, dan mengkonfigurasi promo kapan saja
- Memastikan promo otomatis nonaktif saat kondisi berakhir (waktu habis / slot habis)

### Success Metrics
- CTR banner → pricing page meningkat
- Waktu rata-rata di homepage meningkat (user engaged dengan promo)
- Lead yang mention "promo" atau "early bird" di WA meningkat

---

## 2. SCOPE FITUR

### Yang Dikerjakan (In Scope)
- Promo banner di hero section homepage
- Dua mekanisme urgency: Countdown Timer + Limited Slot
- Admin bisa pilih salah satu atau kombinasi keduanya
- Konfigurasi penuh dari dashboard admin
- Banner otomatis hilang saat promo berakhir
- Preview promo sebelum dipublish (dari dashboard)
- Riwayat promo yang pernah dijalankan

### Yang Tidak Dikerjakan (Out of Scope)
- Promo code / voucher system
- Diskon otomatis saat checkout (tidak ada checkout di KyloDev)
- Notifikasi email ke subscriber saat promo aktif
- A/B testing banner
- Promo per halaman selain homepage

---

## 3. USER STORIES

**Sebagai admin KyloDev**, saya ingin mengaktifkan promo Early Bird dari dashboard tanpa menyentuh kode, sehingga saya bisa launch promo kapan saja secara mandiri.

**Sebagai admin**, saya ingin set tanggal mulai dan berakhirnya promo, sehingga banner otomatis muncul dan hilang sesuai jadwal.

**Sebagai admin**, saya ingin set jumlah slot yang tersedia dan menguranginya secara manual saat ada klien yang masuk, sehingga urgency "sisa slot" terasa real.

**Sebagai admin**, saya ingin preview tampilan banner sebelum dipublish, sehingga saya yakin kontennya benar sebelum dilihat publik.

**Sebagai pengunjung website**, saya ingin melihat promo yang jelas dan mudah dipahami, sehingga saya tahu apa yang saya dapatkan dan segera ambil keputusan.

**Sebagai pengunjung**, saya ingin countdown timer yang akurat, sehingga saya percaya promo ini real dan ada batas waktunya.

---

## 4. BUSINESS RULES

```
BR-01: Banner hanya tampil jika status promo = ACTIVE
BR-02: Promo otomatis nonaktif jika tanggal berakhir sudah lewat
BR-03: Promo otomatis nonaktif jika saya matikan manual
BR-04: Jika kedua kondisi (BR-02 & BR-03) terpenuhi, 
        promo nonaktif berdasarkan kondisi yang lebih dulu terjadi
BR-05: Countdown timer menggunakan server time, bukan client time
        (mencegah manipulasi user dengan ganti timezone browser)
BR-06: Countdown tidak pernah reset — kalau sudah 00:00:00, 
        banner hilang bukan restart
BR-07: Perubahan konfigurasi di admin langsung reflected 
        di frontend dalam 60 detik (revalidation)
BR-08: Harga coret (original price) wajib diisi jika 
        tipe promo = DISCOUNT
BR-09: Minimal satu mekanisme urgency harus aktif 
        (countdown ATAU slot, tidak boleh keduanya kosong)
BR-10: Admin tidak bisa set tanggal berakhir di masa lalu
```

---
---

## 7. FRONTEND — PROMO BANNER

### 7.1 Posisi & Kondisi Tampil

```
Homepage layout:
┌─────────────────────────────────────────┐
│  NAVBAR                                 │
├─────────────────────────────────────────┤
│  [PROMO BANNER] ← muncul di sini       │  
│  (di antara navbar dan hero section)   │
├─────────────────────────────────────────┤
│  HERO SECTION                           │
│  ...                                    │
└─────────────────────────────────────────┘

Kondisi tampil:
- is_active = true
- Tanggal sekarang < end_date
- remaining_slots > 0 (jika use_slot_counter = true)
- Komponen fetch dari /api/promo/active
```

### 7.2 Anatomy Banner — Desktop

```
┌──────────────────────────────────────────────────────────────────┐
│ 🎯 [BADGE: "Early Bird"]                                    [✕] │
│                                                                  │
│  "Headline promo kamu di sini"              ⏳ Berakhir dalam:  │
│  Subheadline pendukung yang menjelaskan                         │
│  nilai promo secara singkat.               [ 05 : 23 : 41 : 09 ]│
│                                             hh    mm   ss   ms  │
│  ┌──────────────┐  ┌─────────────────┐                         │
│  │ Starter      │  │ ★ Business       │   📦 Tersisa 3 slot    │
│  │ ~~Rp 1 Juta~~│  │ ~~Rp 5 Juta~~   │                         │
│  │ Rp 500.000   │  │ Rp 3.000.000    │  [ Lihat Paket →  ]    │
│  └──────────────┘  └─────────────────┘                         │
│                                                                  │
│  * Harga berlaku hingga [tanggal]. Konsultasi gratis dulu?      │
└──────────────────────────────────────────────────────────────────┘
```

### 7.3 Anatomy Banner — Mobile

```
┌──────────────────────────────────┐
│ 🎯 Early Bird              [✕]  │
│                                  │
│ "Headline promo"                 │
│ Subheadline singkat.             │
│                                  │
│ ⏳ Berakhir dalam:               │
│ [ 05 ] [ 23 ] [ 41 ] [ 09 ]     │
│  hari   jam   menit  detik       │
│                                  │
│ ┌────────────┐ ┌──────────────┐  │
│ │ Starter    │ │ ★ Business   │  │
│ │ ~~1 Jt~~   │ │ ~~5 Jt~~    │  │
│ │ 500 Rb     │ │ 3 Juta      │  │
│ └────────────┘ └──────────────┘  │
│                                  │
│ 📦 Tersisa 3 slot bulan ini      │
│                                  │
│ [ Lihat Paket Promo →     ]      │
│                                  │
│ * Berlaku hingga 31 Mei 2026     │
└──────────────────────────────────┘
```

### 7.4 States Banner

```
STATE 1 — Active (countdown + slot):
Tampil penuh seperti anatomy di atas.

STATE 2 — Active (countdown only, no slot):
Sembunyikan baris "Tersisa X slot".

STATE 3 — Active (slot only, no countdown):
Sembunyikan bagian countdown timer.

STATE 4 — Active (no packages shown):
Sembunyikan section harga coret, 
tampil hanya headline + CTA + urgency.

STATE 5 — Expired / Slot habis:
Banner tidak tampil sama sekali.
Bukan di-replace dengan sesuatu, 
langsung layout melanjutkan ke hero section.

STATE 6 — Dismissed (user klik ✕):
Simpan di sessionStorage.
Banner tidak muncul lagi selama sesi itu.
Muncul lagi di sesi berikutnya.
```

### 7.5 Countdown Timer Logic

```typescript
// Gunakan server time sebagai acuan, bukan client
// Fetch sekali dari API, hitung selisih dengan client time
// Gunakan selisih itu untuk koreksi

const initCountdown = (endDate: string, serverTime: string) => {
  const serverNow = new Date(serverTime).getTime();
  const clientNow = Date.now();
  const drift = clientNow - serverNow; // selisih client vs server
  
  const targetTime = new Date(endDate).getTime();
  
  const tick = () => {
    const correctedNow = Date.now() - drift;
    const remaining = targetTime - correctedNow;
    
    if (remaining <= 0) {
      // Promo berakhir — sembunyikan banner
      setBannerVisible(false);
      return;
    }
    
    const days    = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    
    setCountdown({ days, hours, minutes, seconds });
  };
  
  tick();
  const interval = setInterval(tick, 1000);
  return () => clearInterval(interval); // cleanup
};
```
### 7.7 Animasi Banner

```
Mount animation:
→ Slide down dari atas + fade in
→ Duration: 400ms, easing: cubic-bezier(0.16, 1, 0.3, 1)
→ Delay: 800ms setelah page load 
  (beri waktu user lihat navbar dulu)

Countdown number change:
→ Flip animation per digit (CSS perspective flip)
→ Duration: 200ms

Dismiss (klik ✕):
→ Slide up + fade out
→ Duration: 300ms

Slot indicator:
→ Pulse animation subtle pada angka slot
→ CSS: animation: pulse 2s infinite
```

---

## 8. ADMIN DASHBOARD — PROMO CONFIGURATION

### 8.1 Navigasi di Dashboard

```
Sidebar admin:
├── Dashboard (overview)
├── Projects
├── Testimonials
├── Pricing         ← sudah ada
├── Promo & Banner  ← TAMBAH INI
│   ├── Konfigurasi Aktif
│   └── Riwayat Promo
└── Settings
```

### 8.2 Layout Halaman Promo Admin — Desktop

```
┌──────────────────────────────────────────────────────────┐
│  PROMO & BANNER MANAGEMENT                               │
│                                         [Preview] [Save] │
├────────────────────────┬─────────────────────────────────┤
│                        │                                 │
│  FORM KONFIGURASI      │  PREVIEW BANNER                 │
│  (kiri, 55%)           │  (kanan, 45%, sticky)           │
│                        │                                 │
│  [form fields]         │  [render banner live]           │
│                        │  berdasarkan input form         │
│                        │                                 │
└────────────────────────┴─────────────────────────────────┘
```

### 8.3 Form Fields — Konfigurasi Promo

---

**SECTION 1 — Status & Jadwal**

```
┌─────────────────────────────────────────────────┐
│ STATUS & JADWAL                                 │
│                                                 │
│ Status Promo:                                   │
│ ○ Nonaktif    ● Aktif                           │
│                                                 │
│ Tanggal Mulai:        Tanggal Berakhir:         │
│ [DD/MM/YYYY HH:MM]    [DD/MM/YYYY HH:MM]        │
│                                                 │
│ ⚠ Promo akan otomatis nonaktif saat             │
│   tanggal berakhir tercapai.                    │
└─────────────────────────────────────────────────┘
```

Field:
- `is_active` → Toggle switch (ON/OFF)
- `start_date` → DateTime picker (default: sekarang)
- `end_date` → DateTime picker (tidak boleh di masa lalu)

Validasi:
- end_date harus > start_date
- end_date harus > sekarang
- Jika is_active = ON tapi end_date sudah lewat → tampil warning merah

---

**SECTION 2 — Konten Banner**

```
┌─────────────────────────────────────────────────┐
│ KONTEN BANNER                                   │
│                                                 │
│ Tipe Promo:                                     │
│ [Early Bird ▼]                                  │
│ ○ Early Bird   ○ Limited Slot   ○ Seasonal      │
│                                                 │
│ Label Badge: (maks 30 karakter)                 │
│ [Early Bird              ] ← 11/30             │
│                                                 │
│ Headline: (maks 100 karakter)                   │
│ [Harga Spesial untuk 5 Klien Pertama    ]       │
│                                                 │
│ Subheadline: (maks 200 karakter)                │
│ [Kami buka slot terbatas untuk ...      ]       │
│ [                                       ]       │
└─────────────────────────────────────────────────┘
```

Field:
- `promo_type` → Radio: Early Bird | Limited Slot | Seasonal
- `badge_label` → Text input, maks 30 karakter, counter live
- `headline` → Text input, maks 100 karakter
- `subheadline` → Textarea, maks 200 karakter

---

**SECTION 3 — Mekanisme Urgency**

```
┌─────────────────────────────────────────────────┐
│ MEKANISME URGENCY                               │
│ (aktifkan minimal satu)                         │
│                                                 │
│ ☑ Countdown Timer                              │
│   Otomatis hitung mundur ke tanggal berakhir.  │
│   (Menggunakan end_date dari Section 1)         │
│                                                 │
│ ☑ Limited Slot Counter                         │
│   Total Slot Awal:    Sisa Slot Sekarang:       │
│   [10          ]      [7           ] [−] [+]    │
│                                                 │
│   Label slot: (maks 60 karakter)               │
│   [slot tersisa untuk bulan ini    ]            │
│                                                 │
│ ⚠ Promo otomatis nonaktif jika sisa slot = 0   │
└─────────────────────────────────────────────────┘
```

Field:
- `use_countdown` → Checkbox
- `use_slot_counter` → Checkbox
- `total_slots` → Number input (muncul jika use_slot_counter = true)
- `remaining_slots` → Number input + tombol [−] [+] untuk quick adjust
- `slot_label` → Text input

Validasi:
- Minimal satu urgency harus dicentang
- remaining_slots tidak boleh > total_slots
- remaining_slots tidak boleh < 0

---

**SECTION 4 — Tampilan Harga**

```
┌─────────────────────────────────────────────────┐
│ TAMPILAN HARGA PROMO                            │
│                                                 │
│ ☑ Tampilkan perbandingan harga di banner        │
│                                                 │
│ + Tambah Paket                                  │
│                                                 │
│ ┌─────────────────────────────────────────────┐│
│ │ Paket 1                             [Hapus] ││
│ │ Nama Paket: [Starter              ]         ││
│ │ Harga Asli: [Rp 1.000.000        ]         ││
│ │ Harga Promo:[Rp 500.000          ]         ││
│ │ Diskon:     50% (otomatis hitung)           ││
│ │ Highlight:  ○ Ya  ● Tidak                   ││
│ └─────────────────────────────────────────────┘│
│                                                 │
│ ┌─────────────────────────────────────────────┐│
│ │ Paket 2                    [★ Highlight][Hapus]│
│ │ Nama Paket: [Business             ]         ││
│ │ Harga Asli: [Rp 5.000.000        ]         ││
│ │ Harga Promo:[Rp 3.000.000        ]         ││
│ │ Diskon:     40% (otomatis hitung)           ││
│ │ Highlight:  ● Ya  ○ Tidak                   ││
│ └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
```

Field:
- `show_price_comparison` → Checkbox
- `packages` → Dynamic list (tambah/hapus paket)
  - `name` → Text
  - `original_price` → Number (format Rupiah otomatis)
  - `promo_price` → Number (format Rupiah otomatis)
  - `discount_percent` → Read-only, hitung otomatis
  - `highlight` → Toggle (maksimal 1 paket bisa di-highlight)

---

**SECTION 5 — CTA & Disclaimer**

```
┌─────────────────────────────────────────────────┐
│ CTA & DISCLAIMER                                │
│                                                 │
│ Label CTA Utama:                                │
│ [Lihat Paket Promo                   ]          │
│                                                 │
│ URL CTA Utama:                                  │
│ [/pricing                            ]          │
│                                                 │
│ CTA Sekunder (opsional):                        │
│ Label: [atau konsultasi gratis dulu  ]          │
│ URL:   [https://wa.me/628561475550   ]          │
│                                                 │
│ Teks Disclaimer (opsional):                     │
│ [* Harga berlaku hingga 31 Mei 2026. ]          │
│ [Syarat & ketentuan berlaku.         ]          │
│                                                 │
│ Catatan Internal (tidak tampil di website):     │
│ [Campaign iklan Meta Ads - Mei 2026  ]          │
└─────────────────────────────────────────────────┘
```

---

**SECTION 6 — Actions**

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  [Preview di Tab Baru]   [Simpan Draft]         │
│                                                 │
│  [          Publish Promo Sekarang           ]  │
│                                                 │
│  Terakhir dipublish: 22 Mei 2026, 10:30 WIB    │
│  oleh: admin@kylodev.id                         │
└─────────────────────────────────────────────────┘
```

Button behavior:
- **Preview di Tab Baru** → Buka homepage dengan query param `?preview_promo=true` (tampilkan banner meski is_active = false)
- **Simpan Draft** → Simpan ke DB tapi is_active tetap false
- **Publish Promo Sekarang** → Simpan + set is_active = true + update last_published_at

---

### 8.4 Slot Management — Quick Action

Karena sisa slot perlu diupdate sering (setiap dapat klien baru), sediakan **widget quick-access** di halaman overview dashboard:

```
┌─────────────────────────────────────────────────┐
│ 🎯 PROMO AKTIF                         [Kelola]│
│                                                 │
│ "Harga Spesial untuk 5 Klien Pertama"           │
│ Berakhir: 31 Mei 2026 (9 hari lagi)            │
│                                                 │
│ Sisa Slot:                                      │
│ [−]  [ 7 ]  [+]         [Update Slot]          │
│                                                 │
│ Status: ● AKTIF         [Nonaktifkan]           │
└─────────────────────────────────────────────────┘
```

Widget ini tampil di:
- Dashboard overview (sidebar/main area)
- Halaman Promo & Banner itu sendiri

---

### 8.5 Riwayat Promo

```
┌──────────────────────────────────────────────────────────────────┐
│ RIWAYAT PROMO                                                    │
├──────────┬─────────────────────────┬──────────┬──────┬──────────┤
│ Periode  │ Judul                   │ Berakhir │ Klik │ Status   │
├──────────┼─────────────────────────┼──────────┼──────┼──────────┤
│ Mei 2026 │ Early Bird 5 Klien      │ Expired  │ 143  │ Archived │
│ Apr 2026 │ Promo Lebaran           │ Manual   │  89  │ Archived │
│ Mar 2026 │ Early Bird Launch       │ Slot     │  67  │ Archived │
└──────────┴─────────────────────────┴──────────┴──────┴──────────┘

Kolom "Berakhir":
- Expired     → waktu habis otomatis
- Manual      → admin nonaktifkan manual
- Slot        → sisa slot = 0

[Lihat Detail] per row → tampil snapshot lengkap promo tersebut
```

---

## 9. COMPONENT BREAKDOWN (Frontend)

### PromoBanner (Server Component wrapper)

```typescript
// Fetch di server, pass data ke client component
// Revalidate setiap 60 detik (ISR)
async function PromoBannerWrapper() {
  const promo = await fetch('/api/promo/active', {
    next: { revalidate: 60 }
  });
  
  if (!promo.isActive) return null;
  
  return <PromoBannerClient data={promo} />;
}
```

### PromoBannerClient (Client Component)

```typescript
Props:
- data: PromoData
  - headline: string
  - subheadline: string
  - badgeLabel: string
  - endDate: string
  - serverTime: string
  - useCountdown: boolean
  - useSlotCounter: boolean
  - remainingSlots: number | null
  - slotLabel: string | null
  - showPriceComparison: boolean
  - packages: Package[]
  - ctaLabel: string
  - ctaUrl: string
  - ctaSecondaryLabel?: string
  - ctaSecondaryUrl?: string
  - disclaimerText?: string

State:
- isVisible: boolean      (dismissed atau tidak)
- countdown: CountdownState

Methods:
- handleDismiss()         → set sessionStorage + isVisible = false
- initCountdown()         → hitung dari serverTime & endDate
```

### CountdownDisplay (Client Component)

```typescript
Props:
- days: number
- hours: number
- minutes: number
- seconds: number

Behavior:
- Flip animation per digit change
- Tampilkan "hari" jika days > 0
- Sembunyikan "hari" jika days = 0 (hanya jam, menit, detik)
```

### PriceComparison (Client Component)

```typescript
Props:
- packages: Package[]

Behavior:
- Render 2 kolom max di desktop
- Stack vertikal di mobile
- Highlighted package: border accent + label bintang
```

### Admin: PromoConfigForm (Client Component)

```typescript
State:
- formData: PromoConfig
- isDirty: boolean
- isPreviewOpen: boolean
- isSaving: boolean

Validation:
- Zod schema untuk semua field
- Real-time error display

Auto-preview:
- Debounce 500ms setelah user stop typing
- Update preview panel kanan secara live
```

---

## 10. SECURITY & EDGE CASES

```
SEC-01: Endpoint /api/admin/promo/* wajib auth middleware
SEC-02: Preview mode (?preview_promo=true) hanya bisa 
        diakses jika ada valid session cookie admin
SEC-03: remaining_slots tidak bisa diinput negatif
SEC-04: Rate limit pada endpoint update slot 
        (maks 10x per menit) mencegah spam klik +/-
SEC-05: Semua input di-sanitize sebelum disimpan

EDGE-01: Jika API /api/promo/active gagal (500/timeout),
         banner tidak tampil — fail silently, 
         jangan crash halaman utama
EDGE-02: Jika user matikan JavaScript, 
         banner tidak perlu tampil (acceptable)
EDGE-03: Jika end_date dan remaining_slots keduanya 
         habis secara bersamaan, banner hilang
EDGE-04: Admin update slot dari 3 → 0 secara manual,
         banner langsung hilang dalam 60 detik
         (setelah cache revalidate)
```

---

## 11. TESTING CHECKLIST

```
Frontend:
□ Banner muncul saat promo aktif
□ Banner tidak muncul saat is_active = false
□ Banner tidak muncul saat end_date sudah lewat
□ Banner tidak muncul saat remaining_slots = 0
□ Countdown akurat (bandingkan dengan server time)
□ Countdown tidak reset saat user refresh
□ Dismiss (✕) menyimpan ke sessionStorage
□ Banner muncul kembali di sesi baru setelah dismiss
□ Preview mode berjalan dengan benar
□ Tampilan mobile sesuai spec
□ Loading state (skeleton) saat fetch

Admin Dashboard:
□ Form validation bekerja untuk semua field
□ Tanggal berakhir tidak bisa di masa lalu
□ Minimal satu urgency harus dicentang
□ Preview live update dengan debounce
□ Simpan Draft tidak publish
□ Publish mengubah is_active = true
□ Quick-action slot update bekerja
□ Riwayat tercatat saat promo diarchive
□ Slot counter [+] dan [-] tidak melewati batas
```

---

## 12. OPEN QUESTIONS

1. Apakah click tracking pada CTA banner perlu diintegrasikan dengan Meta Pixel (fire event `ViewContent` atau `Lead` saat user klik CTA banner)?
2. Apakah admin perlu notifikasi (email/WA) saat sisa slot tinggal 1 atau saat promo expired otomatis?
3. Apakah perlu fitur "jadwalkan promo" — promo otomatis aktif di tanggal tertentu tanpa perlu admin publish manual?
4. Apakah riwayat promo perlu export ke CSV untuk keperluan reporting?

---

*Dokumen ini siap dijadikan acuan development sprint. Estimasi development: 3–5 hari kerja untuk fullstack implementation.*
