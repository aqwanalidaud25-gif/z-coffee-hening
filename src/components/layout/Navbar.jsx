// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import { Menu, Bell, Search, LogOut, ChevronDown } from "lucide-react";
import NotificationPanel from "../ui/NotificationPanel";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo-Zcoffee-Hening-rb.png";

/**
 * Navbar
 * Sticky di atas Main Area, dengan efek glassmorphism (backdrop-blur)
 * agar terasa modern saat konten discroll di belakangnya.
 */
export default function Navbar({ onMenuClick, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();

  const notifications = [
    {
      id: 2,
      title: "Stok kopi hampir habis",
      message: "Sisa stok Arabika tinggal 6 kg.",
      type: "warning",
    },
    {
      id: 3,
      title: "Transaksi baru masuk",
      message: "2 pesanan baru selesai hari ini.",
      type: "success",
    },
    {
      id: 4,
      title: "Pembayaran gagal",
      message: "Transaksi #12345 gagal diproses.",
      type: "error",
    }
    
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-stone-200/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md md:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-200/60 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50"
          aria-label="Buka menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo Z Coffee Hening"
            className="h-12 w-12 object-contain md:h-16 md:w-16"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-2xl border border-stone-200 bg-white px-3 py-2 shadow-sm sm:flex">
          <Search className="h-4 w-4 text-stone-400" />
          <input
            type="text"
            placeholder="Cari transaksi, menu..."
            aria-label="Cari"
            className="w-40 bg-transparent text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 lg:w-56"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative rounded-xl border border-stone-200 bg-white/70 p-2.5 shadow-sm transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Notifikasi"
            aria-expanded={showNotifications}
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

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white/70 px-2.5 py-2 shadow-sm transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Profil pengguna"
            aria-expanded={showProfileMenu}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 text-sm font-semibold text-stone-50 shadow-sm">
              {user?.initials || "AK"}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-stone-800">{user?.name || "Admin Kasir"}</p>
              <p className="text-xs text-stone-500">{user?.email || "manager@zcoffee.com"}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-stone-500" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 z-40 mt-3 w-56 rounded-2xl border border-stone-200 bg-white p-3 shadow-xl">
              <div className="rounded-xl bg-stone-50 px-3 py-3">
                <p className="text-sm font-semibold text-stone-900">{user?.name || "Admin Kasir"}</p>
                <p className="text-xs text-stone-500">{user?.email || "manager@zcoffee.com"}</p>
              </div>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                  onLogout?.();
                }}
                className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label="Keluar dari akun"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
