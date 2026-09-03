import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutGrid, Receipt, Package, Users, Settings, X, CalendarCheck2 } from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutGrid, to: "/" },
  { label: "Kasir (POS)", icon: Receipt, to: "/kasir" },
  { label: "Riwayat Transaksi", icon: Receipt, to: "/transactions" },
  { label: "Absensi", icon: CalendarCheck2, to: "/absensi" },
  { label: "Inventaris", icon: Package, to: "/inventory" },
  { label: "Pelanggan", icon: Users, to: "/customers" },
  { label: "Pengaturan", icon: Settings, to: "/settings" },
];

/**
 * Sidebar
 * - Desktop (md+): selalu terlihat, fixed di kiri (bagian dari flex layout).
 * - Mobile (<md): disembunyikan secara default, muncul sebagai drawer/overlay
 *   saat `isOpen` true. Kontrol lewat prop dari useSidebar().
 */
export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay gelap saat sidebar mobile terbuka */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-900/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 max-w-[18rem] bg-stone-950 text-stone-100 shadow-2xl shadow-stone-950/20
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:fixed md:translate-x-0 md:flex md:flex-col md:shrink-0
        `}
      >
        <div className="flex h-full flex-col">
          {/* Brand */}
          <div className="flex items-center justify-between border-b border-stone-800 px-5 py-5">
            <div>
              <p className="text-lg font-semibold uppercase tracking-[0.24em] text-amber-300">Z Coffee</p>
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Hening</p>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 transition-colors hover:text-stone-50 md:hidden"
              aria-label="Tutup menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tagline */}
          <div className="border-b border-stone-800 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Menemukan tenang di setiap tegukan</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4 py-6" aria-label="Navigasi utama">
            {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
              <NavLink
              key={label}
              to={to}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition duration-200
                ${
                  isActive
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-stone-400 hover:bg-stone-900 hover:text-white"
                }
              `}
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
              {label}
            </NavLink>
            ))}
          </nav>

          {/* Footer / user */}
          <div className="border-t border-stone-800 px-6 py-5">
            <p className="text-xs text-stone-500">Masuk sebagai</p>
            <p className="text-sm font-medium text-stone-100">Admin Kasir</p>
          </div>
        </div>
      </aside>
    </>
  );
}
