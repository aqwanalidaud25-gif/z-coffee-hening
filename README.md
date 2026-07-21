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
│   │   ├── layout/             # Layout utama, sidebar, navbar
│   │   ├── dashboard/         # Komponen statistik dan grafik
│   │   └── ui/                # Komponen UI pendukung
│   ├── hooks/                 # Custom hooks seperti state sidebar
│   ├── pages/                 # Halaman utama: Dashboard, Transactions, Inventory, Customers, Settings
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
