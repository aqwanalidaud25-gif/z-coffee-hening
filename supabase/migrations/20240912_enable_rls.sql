-- Enable RLS on tables mentioned in the warning
ALTER TABLE public.produk ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pengaturan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.absensi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pelanggan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.karyawan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profil ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Catatan: Untuk tabel produk sudah memiliki policy (karena peringatan "Policy Exists RLS Disabled").
-- Untuk tabel lainnya, jika Anda ingin agar aksesnya tetap terbuka seperti sebelumnya (sementara),
-- Anda bisa membuat policy yang mengizinkan semua akses.
-- Jika Anda ingin mengamankannya, Anda perlu membuat policy yang lebih spesifik (misalnya menggunakan auth.uid()).

-- Contoh policy terbuka (uncomment jika diperlukan, namun tidak disarankan untuk production):
-- CREATE POLICY "Buka akses" ON public.pengaturan FOR ALL USING (true) WITH CHECK (true);
-- CREATE POLICY "Buka akses" ON public.absensi FOR ALL USING (true) WITH CHECK (true);
-- CREATE POLICY "Buka akses" ON public.pelanggan FOR ALL USING (true) WITH CHECK (true);
-- CREATE POLICY "Buka akses" ON public.karyawan FOR ALL USING (true) WITH CHECK (true);
-- CREATE POLICY "Buka akses" ON public.profil FOR ALL USING (true) WITH CHECK (true);
-- CREATE POLICY "Buka akses" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
