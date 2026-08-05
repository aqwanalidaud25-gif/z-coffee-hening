# Z Coffee Hening — Dashboard Manajemen Kafe

Dashboard manajemen kafe berbasis React, Vite, Tailwind CSS, dan React Router yang dirancang untuk membantu admin memantau operasional harian dengan tampilan yang modern, profesional, dan mudah dikembangkan.

## Fitur yang tersedia

- Dashboard utama dengan ringkasan performa kafe dan elemen visual yang lebih polished
- Halaman absensi karyawan dengan alur verifikasi PIN, status hadir/izin/telat, dan UI yang sudah terhubung ke hook custom
- Halaman laporan absensi untuk melihat rekap kehadiran harian dengan ringkasan status dan jam secara terstruktur
- Halaman transaksi dengan pencarian, ringkasan omzet, dan status transaksi
- Halaman inventaris dengan form tambah barang oleh admin
- Halaman pelanggan dengan pencarian dan status aktivitas untuk memantau pelanggan yang jarang datang
- Halaman pengaturan yang dapat diakses dengan cepat dari sidebar
- Layout responsif dengan sidebar, navbar, dan elemen UI yang nyaman dipakai di desktop maupun mobile
- Sistem autentikasi sederhana dengan proteksi route dan toast notifikasi global

## Update terbaru

Beberapa perubahan yang sudah diterapkan di aplikasi:

- Menambahkan halaman login admin dengan validasi form, loading state, error state, dan toggle show/hide password
- Menambahkan proteksi route agar halaman admin otomatis diarahkan ke halaman login saat belum terautentikasi
- Menyimpan status login di localStorage agar sesi tetap aman saat refresh halaman
- Menambahkan navbar dengan notifikasi, profil admin, dan tombol logout
- Menambahkan komponen UI reusable seperti button, modal, dialog konfirmasi, empty state, skeleton, dan panel notifikasi
- Menambahkan halaman 404 untuk route yang tidak dikenal
- Menambahkan halaman absensi dan laporan absensi yang saat ini memakai data mock lokal melalui hook custom untuk simulasi alur operasional
- Menambahkan fitur pencarian dan ringkasan transaksi, inventaris, serta pelanggan
- Menambahkan desain token warna dan visual system yang lebih profesional dan konsisten
- Menambahkan uji komponen dasar dengan Vitest dan Testing Library

## Struktur folder

```text
z-coffee-hening/
├── src/
│   ├── assets/                 # Logo dan aset visual
│   ├── components/
│   │   ├── auth/              # Proteksi route dan autentikasi UI
│   │   ├── dashboard/         # Komponen statistik dan grafik
│   │   ├── layout/            # Layout utama, sidebar, navbar
│   │   └── ui/                # Button, modal, toast, empty state, skeleton
│   ├── context/               # AuthContext dan ToastContext
│   ├── hooks/                 # Custom hooks seperti state sidebar dan absensi
│   ├── pages/                 # Dashboard, Absensi, Laporan Absensi, Transactions, Inventory, Customers, Settings, Login, NotFound
│   ├── App.jsx                # Entry point aplikasi
│   └── main.jsx               # Bootstrap React
├── public/                    # File statis dan aset publik
├── package.json               # Konfigurasi project dan dependency
├── vitest.config.js           # Konfigurasi test engine
└── README.md                  # Dokumentasi proyek
```

## Teknologi yang dipakai

- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS 4
- Recharts
- Lucide React
- Vitest + Testing Library

## Cara menjalankan proyek

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Build untuk produksi:

```bash
npm run build
```

Jalankan uji komponen:

```bash
npm run test:run
```

## Catatan desain

Aplikasi ini menggunakan palet warna earthy professional dengan nuansa stone dan amber yang lebih gelap, hangat, dan konsisten agar terasa elegan dan cocok untuk identitas kafe modern.
