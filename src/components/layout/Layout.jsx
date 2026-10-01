import React from "react";
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
export default function Layout({ children, onLogout }) {
  const { isOpen, close, toggle } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden bg-stone-50">
      <Sidebar isOpen={isOpen} onClose={close} />

      <div className="flex h-screen min-w-0 flex-1 flex-col md:pl-[18rem]">
        <Navbar onMenuClick={toggle} onLogout={onLogout} />

        <main className="relative flex-1 flex flex-col px-4 py-6 md:px-6 md:py-8 lg:px-8 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl flex-1 flex flex-col min-h-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
