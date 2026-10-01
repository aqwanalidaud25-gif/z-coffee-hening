# Z Coffee Hening — Dashboard Manajemen Kafe
hallo coppy
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
- Sistem autentikasi sederhana dengan proteksi route, login session di localStorage, dan redirect ke halaman login bila belum terautentikasi

## Update terbaru

Beberapa perubahan yang sudah diterapkan di aplikasi:

- Menambahkan halaman login admin dengan validasi form, loading state, error state, dan toggle show/hide password
- Menambahkan proteksi route agar halaman admin otomatis diarahkan ke halaman login saat belum terautentikasi
- Menyimpan status login di localStorage agar sesi tetap terjaga saat refresh halaman
- Menyediakan login demo: admin@zcoffee.id / caffee123!@#
- Menambahkan uji frontend minimal untuk komponen StatCard, halaman Login, dan halaman Dashboard
- Menambahkan navbar dengan notifikasi, profil admin, dan tombol logout
- Menambahkan komponen UI reusable seperti button, modal, dialog konfirmasi, empty state, skeleton, dan panel notifikasi
- Menambahkan halaman 404 untuk route yang tidak dikenal
- Menambahkan halaman absensi dan laporan absensi yang saat ini memakai data mock lokal melalui hook custom untuk simulasi alur operasional
- Menambahkan fitur pencarian dan ringkasan transaksi, inventaris, serta pelanggan
- Menambahkan desain token warna dan visual system yang lebih profesional dan konsisten
- Menambahkan uji komponen dasar dengan Vitest dan Testing Library

- Menambahkan kartu pemasukan harian dan bulanan di dashboard (kartu mingguan sudah tersedia) untuk memudahkan pemantauan performa harian dan ringkasan bulanan.
- Rasionalisasi pengeluaran: menata kategori pengeluaran operasional agar lebih jelas—mis. bahan baku, gaji & tunjangan, biaya operasional (listrik, sewa), maintenance & peralatan, dan biaya pemasaran—sehingga laporan kas menjadi lebih transparan dan mudah dianalisis.
- Fokus frontend: UI kartu dan dashboard dirancang profesional, siap pakai, dan mudah diintegrasikan dengan API backend untuk data real-time.
 - Menambahkan kartu "Transaksi Bulanan" di dashboard untuk memudahkan pemantauan jumlah transaksi dalam satu bulan dan perbandingan dengan periode sebelumnya.

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
├── public/
│   └── .htaccess              # Fallback route SPA untuk Apache/cPanel
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

## Deploy manual ke cPanel Rumahweb

Aplikasi ini adalah frontend statis Vite. Server cPanel hanya perlu menyajikan hasil build; jangan unggah source code, `node_modules`, atau file `.env` ke `public_html`.

### 1. Siapkan environment production

Buat `.env.production` di folder proyek, sejajar dengan `package.json`, dan isi dengan URL dasar proyek Supabase serta publishable/anon key:

```dotenv
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<publishable-or-anon-key>
```

URL Supabase harus URL proyek, tidak diakhiri `/rest/v1/`. Vite menyisipkan variabel `VITE_` ke bundle browser sehingga nilainya dapat dilihat pengunjung. Gunakan hanya publishable/anon key, jangan pernah gunakan `service_role` key di frontend. Lindungi data dengan Row Level Security (RLS) dan policy Supabase. `.env` lokal dan `.env.production` tidak untuk diunggah atau di-commit; `.env.example` hanya template placeholder.

Jika file `.env` sudah pernah di-commit sebelumnya, mengabaikannya di `.gitignore` tidak menghapusnya dari riwayat Git. Hapus dari tracking dan, jika berisi kredensial rahasia server, rotasi kredensial tersebut.

### 2. Build dan cek hasilnya

Gunakan versi Node.js yang didukung Vite 8. Dari root proyek jalankan:

```bash
npm install
npm run build
```

Perintah build membaca `.env.production` dan membuat folder `dist/`. Di PowerShell, cek hasil build:

```powershell
Test-Path .\dist\index.html
Get-ChildItem .\dist -Force
Get-ChildItem .\dist\assets -Force
```

Pemeriksaan pertama harus menghasilkan `True`; pastikan juga `dist/.htaccess` ada. Jika environment berubah, build ulang sebelum upload. Opsional, uji lokal dengan `npm run preview`.

### 3. Siapkan DNS dan SSL di Rumahweb

1. Di client area Rumahweb, periksa nameserver domain dan informasi IP hosting. Gunakan nameserver atau IP yang ditetapkan pada akun Anda, jangan menebak nilainya.
2. Jika DNS dikelola Rumahweb, periksa record di Zone Editor/cPanel. Jika nameserver mengarah ke provider lain, perbarui record di provider DNS aktif.
3. Arahkan record A `zcoffeehening.com` ke IP hosting yang diberikan Rumahweb. Arahkan `www` dengan CNAME ke domain utama atau sesuai petunjuk provider.
4. Sebelum mengganti nameserver, pertahankan MX dan record email lain (mis. SPF/DKIM) yang masih digunakan.
5. Tunggu propagasi, lalu pastikan domain terpasang pada akun cPanel dan document root-nya diketahui. Domain utama biasanya memakai `public_html`; domain tambahan dapat memakai folder berbeda.
6. Setelah DNS mengarah ke hosting, buka menu **SSL/TLS Status** di cPanel, pilih domain dan `www` bila diperlukan, lalu jalankan **Run AutoSSL**. Jika paket menyediakan menu Let's Encrypt, ikuti menu tersebut. Ketersediaan menu dan penerbitan sertifikat tergantung paket; hubungi dukungan Rumahweb jika tidak tersedia atau gagal.
7. Uji `https://zcoffeehening.com` dan `https://www.zcoffeehening.com` sebelum mengaktifkan paksa-HTTPS.

### 4. Upload hasil build

Buat backup situs lama sebelum menimpa file di document root.

Di **cPanel File Manager**, masuk ke document root domain dan unggah **seluruh isi `dist/`**, bukan folder `dist` itu sendiri. Struktur yang benar:

```text
public_html/
├── .htaccess
├── index.html
└── assets/
```

Jika `.htaccess` tidak terlihat, aktifkan **Show Hidden Files (dotfiles)** pada pengaturan File Manager. Alternatifnya, ZIP isi folder `dist`, unggah, lalu extract di document root. Pastikan `index.html` langsung berada di `public_html`, bukan di `public_html/dist`.

Dengan FileZilla, gunakan FTPS/FTP over TLS, unggah isi `dist/` ke document root yang benar, dan pastikan file tersembunyi `.htaccess` ikut terunggah. Jangan gunakan FTP tanpa enkripsi.

### 5. Routing SPA dan HTTPS

File `public/.htaccess` disalin Vite ke `dist/.htaccess`. Aturannya menyajikan file yang ada dan mengirim route lain ke `index.html`, agar refresh pada route React Router tidak menghasilkan 404 dari Apache. Route harus tetap didaftarkan di aplikasi: saat ini dashboard memakai `/`, dan contoh route aktif termasuk `/kasir` serta `/absensi`; `/dashboard` belum terdaftar dan akan menampilkan halaman NotFound.

Setelah SSL valid dan HTTPS sudah berhasil diuji, bila ingin redirect HTTP ke HTTPS tambahkan aturan berikut di bagian atas `public/.htaccess`, lalu build ulang dan upload kembali:

```apache
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
```

Untuk login/OAuth Supabase, perbarui **Site URL** ke `https://zcoffeehening.com` dan tambahkan URL callback yang digunakan aplikasi ke **Redirect URLs** di pengaturan Authentication Supabase. Tambahkan hostname `www` hanya jika memang digunakan.

### 6. Checklist dan troubleshooting

- Buka `https://zcoffeehening.com`; pastikan halaman utama dan asset tampil tanpa 404.
- Buka `/kasir` atau `/absensi`, lalu refresh. Fallback Apache seharusnya tetap memuat aplikasi.
- Periksa Console dan Network browser untuk kegagalan asset, request, atau URL Supabase yang tidak tepat.
- **CORS/Supabase:** pastikan URL environment adalah URL dasar proyek, bukan URL `/rest/v1/`; build ulang setelah mengubah `.env.production`. Untuk OAuth, periksa Site URL dan Redirect URLs. Untuk API lain, server API harus mengizinkan origin situs HTTPS.
- **Mixed Content/SSL:** semua endpoint yang dipanggil halaman HTTPS harus memakai HTTPS. Perbarui endpoint HTTP/localhost dan build ulang. Jangan paksa HTTPS sebelum sertifikat valid.
- **Cache:** lakukan hard refresh (`Ctrl+F5`) atau tes Incognito. Pastikan file terbaru benar-benar terunggah; bersihkan cache cPanel/provider bila tersedia.

## Catatan desain

Aplikasi ini menggunakan palet warna earthy professional dengan nuansa stone dan amber yang lebih gelap, hangat, dan konsisten agar terasa elegan dan cocok untuk identitas kafe modern.
