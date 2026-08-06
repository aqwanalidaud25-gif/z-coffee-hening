import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

/**
 * StatCard
 * Kartu ringkasan angka (mis. Pemasukan, Transaksi, Pelanggan Baru).
 * Menggunakan shadow-sm + rounded-xl agar terasa lembut & elegan.
 */
export default function StatCard({ label, value, delta, isPositive = true, icon: Icon, comparisonLabel = "vs minggu lalu" }) {
  return (
    <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm transition duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-stone-400">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">{value}</p>
        </div>
        {Icon && (
          <span className="flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-50 text-amber-600 shadow-sm">
            <Icon className="h-6 w-6" strokeWidth={2} />
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
        {isPositive ? (
          <ArrowUpRight className="h-4 w-4 text-emerald-600" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-red-500" />
        )}
        <span className={isPositive ? "text-emerald-600" : "text-red-500"}>{delta}</span>
        <span className="text-stone-400">{comparisonLabel}</span>
      </div>
    </div>
  );
}
