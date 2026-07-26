# Z Coffee Hening — Dashboard Manajemen Kafe

Dashboard manajemen kafe berbasis React + Vite + Tailwind CSS, dirancang untuk membantu admin memantau operasional harian dengan tampilan yang sederhana, rapih, dan mudah dikembangkan.

## Fitur yang tersedia

- Dashboard utama dengan ringkasan performa kafe
- Halaman transaksi dengan pencarian, ringkasan omzet, dan status transaksi
- Halaman pengaturan yang bisa langsung dilihat dan diedit melalui satu tombol
- Halaman inventaris dengan form tambah barang oleh admin
- Halaman pelanggan dengan pencarian dan status aktivitas untuk memantau pelanggan yang jarang datang
- Layout responsif dengan sidebar yang nyaman dipakai di desktop maupun mobile

## Update terbaru

Beberapa perubahan yang sudah diterapkan di aplikasi:

- Menambahkan halaman login admin di route `/login` dengan validasi form kosong, loading state, error state, dan toggle show/hide password
- Menambahkan proteksi route untuk halaman dashboard dan fitur admin agar pengguna yang belum login otomatis diarahkan ke halaman login
- Menyimpan status login di `localStorage` agar admin tidak perlu login ulang saat refresh halaman
- Menambahkan tombol logout dan avatar inisial admin di navbar
- Menambahkan komponen UI dasar reusable di `src/components/ui/` untuk button, modal, dialog konfirmasi, empty state, dan skeleton loading
- Menambahkan sistem toast global untuk notifikasi sukses, error, dan informasi
- Menambahkan halaman 404 untuk route yang tidak dikenal
- Menambahkan fitur riset data transaksi dengan pencarian dan ringkasan total transaksi
- Menambahkan tombol edit pada pengaturan agar admin bisa memperbarui preferensi dengan cepat
- Menambahkan form penambahan barang untuk admin di halaman inventaris
- Menambahkan pencarian dan status kunjungan pelanggan untuk memudahkan identifikasi pelanggan yang sudah lama tidak datang

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
│   ├── pages/                 # Dashboard, Transactions, Inventory, Customers, Settings, Login, NotFound
│   ├── App.jsx                # Entry point aplikasi
│   └── main.jsx               # Bootstrap React
├── public/                    # File statis
├── package.json               # Konfigurasi project dan dependency
└── README.md                  # Dokumentasi proyek
```

## Teknologi yang dipakai

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Recharts
- Lucide React

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

## Catatan desain

Aplikasi ini menggunakan palet warna earthy professional dengan nuansa stone dan amber agar terasa hangat, profesional, dan cocok untuk identitas kafe.
