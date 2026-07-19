# Z Coffee Hening — Dashboard Manajemen

Dashboard manajemen kafe dibangun dengan React.js + Tailwind CSS,
mengikuti palet **Earthy Professional** (stone-50 / stone-900 / amber-600).

## Struktur Folder

```
zcoffee-hening/
├── src/
│   ├── assets/                 # Logo, ikon custom, gambar produk
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx      # Kerangka utama: Sidebar + Navbar + Main Area
│   │   │   ├── Sidebar.jsx     # Sidebar kiri (dark, stone-900), drawer di mobile
│   │   │   └── Navbar.jsx      # Navbar atas dengan efek glassmorphism
│   │   ├── dashboard/
│   │   │   ├── StatCard.jsx    # Kartu statistik (Pemasukan, Transaksi, dst)
│   │   │   └── RevenueChart.jsx# Grafik Recharts bertema amber
│   │   └── ui/                 # (opsional) tombol, input, badge generik
│   ├── hooks/
│   │   └── useSidebar.js       # State buka/tutup sidebar mobile
│   ├── pages/
│   │   └── Dashboard.jsx       # Halaman dashboard, merakit semua komponen
│   └── App.jsx                 # Entry point aplikasi
├── tailwind.config.js
└── README.md
```

**Kenapa dipisah begini?**
- `layout/` murni soal kerangka halaman (tidak tahu-menahu soal data bisnis).
- `dashboard/` isinya komponen yang tahu tentang data kafe (statistik, grafik).
- `hooks/` menyimpan logic yang bisa dipakai ulang tanpa terikat 1 komponen.
- `pages/` adalah "perakit" — mengimpor Layout + komponen dashboard jadi 1 halaman.

## Palet Warna

| Token       | Kelas Tailwind | Penggunaan                         |
|-------------|----------------|-------------------------------------|
| Background  | `stone-50`     | Latar belakang utama                |
| Sidebar     | `stone-900`    | Sidebar kiri                        |
| Aksen utama | `amber-600`    | Tombol aktif, highlight grafik      |
| Card        | `white`        | Kartu statistik & grafik            |
| Border      | `stone-200`    | Garis pembatas kartu, navbar        |

## Mobile-First & Responsive Sidebar

- Default (mobile): Sidebar disembunyikan (`-translate-x-full`), muncul sebagai
  drawer dengan overlay saat tombol hamburger (ikon `Menu` dari lucide-react) ditekan.
- `md:` ke atas: sidebar permanen terlihat (`md:translate-x-0 md:relative`), jadi
  bagian dari `flex` layout, tidak lagi overlay.

Ini menghindari pola `hidden`/`block` yang kaku — dipakai transform + transition
supaya animasinya halus, tapi prinsipnya sama: kelas responsif Tailwind (`md:`)
menentukan tampilan berbeda di breakpoint berbeda.

## Instalasi

```bash
npm install react react-dom recharts lucide-react
npm install -D tailwindcss postcss autoprefixer
```

Tambahkan font Inter di `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```
