import { useState } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dataDaily = [
  { label: "Sen", pemasukan: 1250000 },
  { label: "Sel", pemasukan: 1480000 },
  { label: "Rab", pemasukan: 1120000 },
  { label: "Kam", pemasukan: 1690000 },
  { label: "Jum", pemasukan: 2100000 },
  { label: "Sab", pemasukan: 2450000 },
  { label: "Min", pemasukan: 1980000 },
];

const dataWeekly = [
  { label: "Mgg 1", pemasukan: 8400000 },
  { label: "Mgg 2", pemasukan: 9150000 },
  { label: "Mgg 3", pemasukan: 7850000 },
  { label: "Mgg 4", pemasukan: 9230000 },
];

const dataMonthly = [
  { label: "Jan", pemasukan: 41200000 },
  { label: "Feb", pemasukan: 38500000 },
  { label: "Mar", pemasukan: 42300000 },
  { label: "Apr", pemasukan: 39800000 },
  { label: "Mei", pemasukan: 44100000 },
  { label: "Jun", pemasukan: 42900000 },
  { label: "Jul", pemasukan: 42300000 },
  { label: "Agu", pemasukan: 43800000 },
  { label: "Sep", pemasukan: 41000000 },
  { label: "Okt", pemasukan: 44700000 },
  { label: "Nov", pemasukan: 45400000 },
  { label: "Des", pemasukan: 46800000 },
];

function formatRupiah(value) {
  return `Rp${(value / 1000).toFixed(0)}rb`;
}

function CustomTooltip({ active, payload, label, formatterLabel }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-stone-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur-sm">
      <p className="text-xs text-stone-500">{formatterLabel ?? label}</p>
      <p className="text-sm font-semibold text-stone-900">
        {formatRupiah(payload[0].value)}
      </p>
    </div>
  );
}

/**
 * RevenueChart
 * Grafik area pemasukan mingguan menggunakan aksen amber-600
 * sesuai palet Earthy Professional.
 */
export default function RevenueChart() {
  const [mode, setMode] = useState("daily");

  let chartData = dataDaily;
  let title = "Pemasukan Harian";
  let subtitle = "7 hari terakhir";
  let delta = "+4.8%";

  if (mode === "weekly") {
    chartData = dataWeekly;
    title = "Pemasukan Mingguan";
    subtitle = "4 minggu terakhir";
    delta = "+12.1%";
  } else if (mode === "monthly") {
    chartData = dataMonthly;
    title = "Pemasukan Bulanan";
    subtitle = "12 bulan terakhir";
    delta = "-2.3%";
  }

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-stone-900">{title}</h3>
          <p className="text-xs text-stone-500">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setMode("daily")}
              className={`rounded-md px-2.5 py-1 text-xs font-medium ${mode === "daily" ? "bg-amber-50 text-amber-700" : "bg-stone-50 text-stone-600"}`}
            >
              Harian
            </button>
            <button
              onClick={() => setMode("weekly")}
              className={`rounded-md px-2.5 py-1 text-xs font-medium ${mode === "weekly" ? "bg-amber-50 text-amber-700" : "bg-stone-50 text-stone-600"}`}
            >
              Mingguan
            </button>
            <button
              onClick={() => setMode("monthly")}
              className={`rounded-md px-2.5 py-1 text-xs font-medium ${mode === "monthly" ? "bg-amber-50 text-amber-700" : "bg-stone-50 text-stone-600"}`}
            >
              Bulanan
            </button>
          </div>

          <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
            {delta}
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="amberFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d97706" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#e7e5e4" strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tick={{ fill: "#78716c", fontSize: 12 }}
              axisLine={{ stroke: "#e7e5e4" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#78716c", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatRupiah}
              width={55}
            />
            <Tooltip content={<CustomTooltip formatterLabel={mode === "daily" ? undefined : undefined} />} />
            <Area
              type="monotone"
              dataKey="pemasukan"
              stroke="#d97706"
              strokeWidth={2.5}
              fill="url(#amberFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
