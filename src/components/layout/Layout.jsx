import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useSidebar } from "../../hooks/useSidebar";

/**
 * Layout
 * Struktur: [Sidebar] | [Navbar di atas Main Area]
 *
 * Mobile-first:
 * - Default (mobile): Sidebar disembunyikan (drawer), konten full-width.
 * - md ke atas: Sidebar tampil permanen di kiri via flex, konten mengisi sisa ruang.
 */
export default function Layout({ children }) {
  const { isOpen, close, toggle } = useSidebar();

  return (
    <div className="flex min-h-screen bg-stone-50">
      <Sidebar isOpen={isOpen} onClose={close} />

      {/* Main Area: flex-1 agar mengisi sisa ruang di samping sidebar */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar onMenuClick={toggle} />

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          {/* Grid dasar untuk konten dashboard, bisa diatur ulang per halaman */}
          <div className="mx-auto grid max-w-7xl gap-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
