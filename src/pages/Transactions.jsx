import { useMemo, useState } from "react";
import Layout from "../components/layout/Layout";

const transactionsData = [
  { id: "#1024", customer: "Alya", total: 96000, status: "Selesai", date: "22 Jul 2026", payment: "QRIS", items: 3 },
  { id: "#1025", customer: "Riko", total: 124000, status: "Diproses", date: "22 Jul 2026", payment: "Tunai", items: 4 },
  { id: "#1026", customer: "Nina", total: 78000, status: "Menunggu", date: "21 Jul 2026", payment: "Transfer", items: 2 },
  { id: "#1027", customer: "Damar", total: 152000, status: "Selesai", date: "21 Jul 2026", payment: "QRIS", items: 5 },
];

const statusStyles = {
  Selesai: "bg-emerald-100 text-emerald-700",
  Diproses: "bg-sky-100 text-sky-700",
  Menunggu: "bg-amber-100 text-amber-700",
};

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Transactions({ onLogout }) {
  const [search, setSearch] = useState("");

  const filteredTransactions = useMemo(() => {
    const keyword = search.toLowerCase();

    return transactionsData.filter((item) => {
      return [item.id, item.customer, item.status, item.payment, item.date]
        .join(" ")
        .toLowerCase()
        .includes(keyword);
    });
  }, [search]);

  const totalRevenue = transactionsData.reduce((sum, item) => sum + item.total, 0);
  const pendingCount = transactionsData.filter((item) => item.status === "Menunggu").length;

  return (
    <Layout onLogout={onLogout}>
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-amber-600">Transaksi</p>
            <h2 className="mt-1 text-2xl font-semibold text-stone-900">Riwayat & status transaksi</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
              {transactionsData.length} transaksi hari ini
            </span>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-700">
              Omzet: {formatRupiah(totalRevenue)}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm text-stone-500">Total transaksi</p>
            <p className="mt-1 text-xl font-semibold text-stone-900">{transactionsData.length}</p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm text-stone-500">Pendapatan</p>
            <p className="mt-1 text-xl font-semibold text-stone-900">{formatRupiah(totalRevenue)}</p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm text-stone-500">Menunggu</p>
            <p className="mt-1 text-xl font-semibold text-amber-700">{pendingCount}</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-stone-200 bg-stone-50 p-4">
          <label htmlFor="transaction-search" className="text-sm font-medium text-stone-700">
            Cari transaksi
          </label>
          <input
            id="transaction-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari ID, pelanggan, status, atau metode bayar"
            className="mt-2 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 outline-none ring-0"
          />
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-stone-200">
          <div className="hidden grid-cols-[1.2fr_1fr_0.9fr_0.8fr] bg-stone-100 px-4 py-3 text-sm font-semibold text-stone-700 md:grid">
            <div>Transaksi</div>
            <div>Tanggal & metode</div>
            <div>Status</div>
            <div>Total</div>
          </div>

          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((item) => (
              <div key={item.id} className="grid border-t border-stone-200 bg-white px-4 py-4 text-sm md:grid-cols-[1.2fr_1fr_0.9fr_0.8fr]">
                <div>
                  <p className="font-semibold text-stone-900">{item.id}</p>
                  <p className="mt-1 text-stone-600">{item.customer}</p>
                  <p className="text-xs text-stone-500">{item.items} item</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <p className="text-stone-700">{item.date}</p>
                  <p className="text-stone-500">{item.payment}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[item.status] || "bg-stone-100 text-stone-700"}`}>
                    {item.status}
                  </span>
                </div>
                <div className="mt-2 md:mt-0">
                  <p className="font-semibold text-stone-900">{formatRupiah(item.total)}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-4 text-sm text-stone-500">
              Tidak ada transaksi yang sesuai pencarian.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
