import React, { useEffect, useState } from "react";
import { Wallet, ShoppingBag, Users2, Coffee, Sparkles } from "lucide-react";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import Skeleton from "../components/ui/Skeleton";
import EmptyState from "../components/ui/EmptyState";

export default function Dashboard({ onLogout }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const topStats = [
    { label: "Pemasukan Harian", value: "Rp1.250.000", delta: "+4,8%", isPositive: true, icon: Wallet, comparisonLabel: "vs kemarin" },
    { label: "Pemasukan Mingguan", value: "Rp8.450.000", delta: "+12,1%", isPositive: true, icon: Sparkles, comparisonLabel: "vs minggu lalu" },
    { label: "Pemasukan Bulanan", value: "Rp42.300.000", delta: "-2,3%", isPositive: false, icon: Wallet, comparisonLabel: "vs bulan lalu" },
    { label: "Transaksi Bulanan", value: "342", delta: "+6,4%", isPositive: true, icon: ShoppingBag, comparisonLabel: "vs bulan lalu" },
  ];

  const bestSellers = [
    { name: "Kopi Susu Gula Aren", qty: "128 cup" },
    { name: "Americano", qty: "94 cup" },
    { name: "Croissant Coklat", qty: "76 pcs" },
  ];

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        subtitle="Ringkasan operasional"
        title="Z-Coffe-Hening Dashboard"
        description="Pantau pemasukan, transaksi, absensi, dan performa menu favorit dari satu tampilan profesional."
        status="Siap pakai"
        actions={<Button variant="secondary">Unduh ringkasan</Button>}
      />

      <div className="rounded-[1.25rem] border border-stone-200 bg-gradient-to-r from-stone-900 to-stone-800 p-6 text-stone-50 shadow-[var(--shadow)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-amber-300">Senin, 20 Juli 2026</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">Operasional hari ini berjalan lancar</h2>
            <p className="mt-2 max-w-2xl text-sm text-stone-300">
              Pantau pemasukan, transaksi, absensi karyawan, dan performa menu favorit dari satu dashboard yang rapi dan profesional.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-amber-300" />
              Fokus hari ini: layanan cepat & stok aman
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:gap-5">
        {loading ? (
          <Skeleton count={4} />
        ) : (
          topStats.map((s) => (
            <StatCard
              key={s.label}
              label={s.label}
              value={s.value}
              delta={s.delta}
              isPositive={s.isPositive}
              icon={s.icon}
              comparisonLabel={s.comparisonLabel}
            />
          ))
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        <div className="rounded-[1.25rem] border border-stone-200 bg-white p-5 shadow-[var(--shadow)]">
          <div className="flex items-center gap-2">
            <Coffee className="h-4 w-4 text-amber-600" />
            <h3 className="text-sm font-semibold text-stone-900">Menu Terlaris</h3>
          </div>
          <p className="mt-1 text-xs text-stone-500">Minggu ini</p>
          <div className="mt-4">
            {loading ? (
              <Skeleton count={3} />
            ) : bestSellers.length === 0 ? (
              <EmptyState title="Tidak ada data menu" description="Belum ada menu terlaris untuk minggu ini." />
            ) : (
              <ul className="mt-4 space-y-3">
                {bestSellers.map((item) => (
                  <li key={item.name} className="flex items-center justify-between rounded-lg bg-stone-50 px-3 py-2 text-sm">
                    <span className="text-stone-700">{item.name}</span>
                    <span className="font-semibold text-amber-700">{item.qty}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
