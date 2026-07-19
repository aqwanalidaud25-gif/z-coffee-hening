import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Sen", pemasukan: 1250000 },
  { day: "Sel", pemasukan: 1480000 },
  { day: "Rab", pemasukan: 1120000 },
  { day: "Kam", pemasukan: 1690000 },
  { day: "Jum", pemasukan: 2100000 },
  { day: "Sab", pemasukan: 2450000 },
  { day: "Min", pemasukan: 1980000 },
];

function formatRupiah(value) {
  return `Rp${(value / 1000).toFixed(0)}rb`;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-stone-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur-sm">
      <p className="text-xs text-stone-500">{label}</p>
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
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-stone-900">
            Pemasukan Mingguan
          </h3>
          <p className="text-xs text-stone-500">7 hari terakhir</p>
        </div>
        <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
          +18.2%
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="amberFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d97706" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#e7e5e4" strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
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
            <Tooltip content={<CustomTooltip />} />
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
