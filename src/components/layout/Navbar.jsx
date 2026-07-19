import { useState } from "react";
import { Menu, Bell, Search, LogOut } from "lucide-react";
import NotificationPanel from "../ui/NotificationPanel";

/**
 * Navbar
 * Sticky di atas Main Area, dengan efek glassmorphism (backdrop-blur)
 * agar terasa modern saat konten discroll di belakangnya.
 */
export default function Navbar({ onMenuClick, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Stok kopi hampir habis",
      message: "Sisa stok Arabika tinggal 6 kg.",
      type: "warning",
    },
    {
      id: 2,
      title: "Transaksi baru masuk",
      message: "2 pesanan baru selesai hari ini.",
      type: "success",
    },
  ];

  return (
    <header
      className="
        sticky top-0 z-30 flex items-center justify-between gap-4
        border-b border-stone-200/70 bg-stone-50/70 px-4 py-4
        backdrop-blur-md md:px-8
      "
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden rounded-lg p-2 text-stone-600 hover:bg-stone-200/60 transition-colors"
          aria-label="Buka menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-stone-900">
            Z Coffee Hening
          </h1>
          <p className="text-xs text-stone-500">Dashboard manajemen kafe • Senin, 20 Juli 2026</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-stone-200 bg-white/70 px-3 py-2 shadow-sm">
          <Search className="h-4 w-4 text-stone-400" />
          <input
            type="text"
            placeholder="Cari transaksi, menu..."
            className="w-40 bg-transparent text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none lg:w-56"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative rounded-xl border border-stone-200 bg-white/70 p-2.5 shadow-sm transition-colors hover:bg-white"
            aria-label="Notifikasi"
          >
            <Bell className="h-4 w-4 text-stone-600" />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-600 ring-2 ring-stone-50" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 z-40 mt-3">
              <NotificationPanel notifications={notifications} />
            </div>
          )}
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white/70 px-3 py-2 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:bg-white"
          aria-label="Logout"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>

        <div className="h-9 w-9 rounded-full bg-amber-600 flex items-center justify-center text-sm font-semibold text-stone-50 shadow-sm">
          AK
        </div>
      </div>
    </header>
  );
}
