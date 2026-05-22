# 🚀 Promo System Deployment Guide

## ✅ Implementation Complete!

Sistem promo banner sudah selesai diimplementasi. Berikut langkah deployment:

---

## 📋 Step 1: Database Setup (WAJIB)

Jalankan SQL migration di Supabase SQL Editor:

1. Buka Supabase Dashboard → SQL Editor
2. Copy-paste isi file: `prisma/migrations/add_promo_system.sql`
3. Klik **Run**

SQL akan:
- Membuat tabel `promo_banner`
- Menambah kolom `is_promo_active` dan `promo_discount_percent` ke tabel `pricing_plans`
- Insert 1 row default promo (status: nonaktif)

---

## 🧪 Step 2: Testing Local

```bash
# Install dependencies (jika ada yang baru)
npm install

# Run development server
npm run dev
```

### Test Checklist:

**Homepage:**
- [ ] Banner TIDAK muncul (karena default is_active = false)

**Admin Dashboard:**
- [ ] Buka `/admin/[your-secret]/promo`
- [ ] Menu "Promo Banner" muncul di sidebar
- [ ] Form konfigurasi promo tampil
- [ ] Toggle "Status Promo" ke ON
- [ ] Set tanggal berakhir (misal: 7 hari dari sekarang)
- [ ] Aktifkan promo untuk 1-2 pricing plan
- [ ] Set diskon % (misal: 50%)
- [ ] Klik "Simpan & Publish Promo"

**Homepage (After Save):**
- [ ] Refresh homepage
- [ ] Banner promo muncul di atas Hero section
- [ ] Countdown timer berjalan
- [ ] Klik "Cek Promo" → scroll ke pricing section
- [ ] Card pricing yang di-set promo menampilkan:
  - Harga asli (coret)
  - Badge diskon (misal: -50%)
  - Harga promo (hasil kalkulasi otomatis)

**Test Harga Range:**
- [ ] Set promo untuk plan dengan harga range (misal: "1 - 5 Juta")
- [ ] Harga promo harus jadi range juga (misal: "500 Rb - 2.5 Juta")

**Test Dismiss:**
- [ ] Klik tombol X di banner
- [ ] Banner hilang
- [ ] Refresh page → banner muncul lagi (sessionStorage)

**Test Expired:**
- [ ] Set tanggal berakhir ke masa lalu
- [ ] Banner hilang otomatis

---

## 🌐 Step 3: Deploy to Production

```bash
# Commit changes
git add .
git commit -m "feat: add promo banner system with countdown and pricing discount"

# Push to repository
git push origin main
```

Vercel akan auto-deploy. Setelah deploy:

1. Jalankan SQL migration di **Production Supabase** (sama seperti Step 1)
2. Test di production URL

---

## 📱 Step 4: Test di Mobile (iOS Safari)

Penting untuk test di iPhone karena ada iOS Safari specific behavior:

- [ ] Banner tampil dengan benar
- [ ] Countdown timer akurat
- [ ] Button "Cek Promo" berfungsi (scroll ke pricing)
- [ ] Button dismiss (X) berfungsi
- [ ] Responsive layout bagus

---

## 🎯 Cara Menggunakan Promo System

### Aktivasi Promo Baru:

1. Login ke admin: `/admin/[secret]/promo`
2. **Banner Configuration:**
   - Toggle "Status Promo" → ON
   - Set "Tanggal Berakhir" (misal: 7 hari dari sekarang)
   - Edit "Badge Text" (misal: "🎯 Flash Sale")
   - Edit "Headline" (misal: "Diskon 50% untuk 10 orang pertama!")
   - Set "Slot Count" (display only, misal: 10)

3. **Pricing Plans Promo:**
   - Toggle ON untuk plan yang mau dikasih promo
   - Set diskon % (misal: 50%)
   - Harga promo akan auto-calculate

4. Klik **"Simpan & Publish Promo"**

5. Buka homepage → banner muncul, harga coret muncul di pricing

### Nonaktifkan Promo:

**Cara 1: Manual**
- Toggle "Status Promo" → OFF
- Klik "Simpan & Publish Promo"
- Banner hilang, harga kembali normal

**Cara 2: Otomatis (Expired)**
- Tunggu sampai tanggal berakhir
- Banner hilang otomatis
- Harga kembali normal

### Update Slot Count (Display):

- Edit "Slot Count" di admin
- Klik "Simpan & Publish Promo"
- Angka di banner update (tapi ini hanya display, tidak mempengaruhi logika)

---

## 🔧 Troubleshooting

### Banner tidak muncul:
- Cek `is_active = true` di admin
- Cek `end_date` belum lewat
- Cek browser console untuk error
- Hard refresh (Ctrl+Shift+R)

### Harga promo tidak muncul:
- Cek plan sudah di-toggle ON di admin
- Cek `promo_discount_percent > 0`
- Refresh page

### Countdown tidak akurat:
- Countdown pakai server time, bukan client time
- Jika masih tidak akurat, cek timezone server Supabase

### Error saat save di admin:
- Cek browser console
- Cek Network tab untuk response error
- Pastikan SQL migration sudah dijalankan

---

## 📊 Database Schema Reference

### Table: `promo_banner`
```sql
- id (serial, PK)
- is_active (boolean) → ON/OFF promo
- end_date (timestamptz) → Tanggal berakhir
- badge_text (varchar) → Text badge (misal: "🎯 Early Bird")
- headline (varchar) → Headline banner
- slot_count (integer) → Display only
- created_at, updated_at (timestamptz)
```

### Table: `pricing_plans` (added columns)
```sql
- is_promo_active (boolean) → Promo ON/OFF per plan
- promo_discount_percent (integer) → Diskon % (0-100)
```

---

## 🎨 Customization

### Ubah warna badge diskon:
File: `src/components/section/Pricing.tsx`
```tsx
// Line ~335
<span className="bg-red-500 text-white ...">
  -{plan.promo_discount_percent || 0}%
</span>
```
Ganti `bg-red-500` dengan warna lain (misal: `bg-orange-500`)

### Ubah durasi animasi banner:
File: `src/app/globals.css`
```css
.animate-slideDown {
  animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both;
  /*                    ↑ durasi        ↑ easing          ↑ delay */
}
```

### Ubah format harga promo:
File: `src/lib/promo-utils.ts`
Function: `formatPriceNumber()`

---

## 📈 Future Enhancements (Optional)

Fitur yang bisa ditambahkan nanti:

1. **Preview Mode** - Preview promo sebelum publish
2. **Promo History** - Riwayat promo yang pernah dijalankan
3. **Multiple Promo** - Bisa aktifkan beberapa promo sekaligus
4. **Promo Scheduling** - Jadwalkan promo otomatis aktif di tanggal tertentu
5. **Analytics** - Track CTR banner, conversion rate
6. **Notification** - Email/WA notif saat promo hampir expired

---

## ✅ Implementation Summary

**Files Created:**
- `src/app/api/promo/route.ts` - API fetch active promo
- `src/app/api/promo/update/route.ts` - API update promo (admin)
- `src/components/section/PromoBanner.tsx` - Banner component
- `src/components/admin/PromoAdminClient.tsx` - Admin form
- `src/app/admin/[secret]/promo/page.tsx` - Admin page
- `src/lib/promo-utils.ts` - Helper functions
- `prisma/migrations/add_promo_system.sql` - Database migration

**Files Modified:**
- `src/app/(public)/page.tsx` - Added PromoBanner
- `src/components/section/Pricing.tsx` - Added promo price logic
- `src/components/admin/AdminSidebar.tsx` - Added menu item
- `src/app/globals.css` - Added animation

**Total Implementation Time:** ~2.5 hours ✅

---

**Need help? Check browser console for errors or contact developer.**
