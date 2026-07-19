import { ArrowUpRight, ArrowDownRight } from "lucide-react";

/**
 * StatCard
 * Kartu ringkasan angka (mis. Pemasukan, Transaksi, Pelanggan Baru).
 * Menggunakan shadow-sm + rounded-xl agar terasa lembut & elegan.
 */
export default function StatCard({ label, value, delta, isPositive = true, icon: Icon }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-stone-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
            {value}
          </p>
        </div>
        {Icon && (
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Icon className="h-5 w-5" strokeWidth={2} />
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-1 text-xs font-medium">
        {isPositive ? (
          <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
        ) : (
          <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
        )}
        <span className={isPositive ? "text-emerald-600" : "text-red-500"}>
          {delta}
        </span>
        <span className="text-stone-400">vs minggu lalu</span>
      </div>
    </div>
  );
}
