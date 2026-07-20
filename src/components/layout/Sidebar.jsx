import { NavLink } from "react-router-dom";
import { LayoutGrid, Receipt, Package, Users, Settings, X, CalendarCheck2 } from "lucide-react";
import logo from "../../assets/logo-zcoffeehening-removebg-preview.png";

const NAV_ITEMS = [
  { label: "Ringkasan", icon: LayoutGrid, to: "/" },
  { label: "Absensi", icon: CalendarCheck2, to: "/absensi" },
  { label: "Transaksi", icon: Receipt, to: "/transactions" },
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
          fixed inset-y-0 left-0 z-50 w-64 bg-stone-900 text-stone-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:flex md:flex-col md:shrink-0
        `}
      >
        <div className="flex h-full flex-col">
          {/* Brand */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Z Coffee Hening" className="h-12 w-auto object-contain" />
            </div>
            <button
              onClick={onClose}
              className="md:hidden text-stone-400 hover:text-stone-50 transition-colors"
              aria-label="Tutup menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tagline */}
          <div className="border-b border-stone-800 px-6 py-3">
            <p className="text-xs font-medium text-amber-400">Menemukan Tenang Disetiap Tegukan</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-6">
            {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
              <NavLink
                key={label}
                to={to}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium
                  transition-colors
                  ${
                    isActive
                      ? "bg-amber-600 text-stone-50 shadow-sm"
                      : "text-stone-400 hover:bg-stone-800 hover:text-stone-100"
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
