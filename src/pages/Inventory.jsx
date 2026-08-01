import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import Skeleton from "../components/ui/Skeleton";
import EmptyState from "../components/ui/EmptyState";

const initialInventory = [
  { item: "Kopi Arabika", stock: "48 kg", status: "Aman" },
  { item: "Susu Oat", stock: "6 liter", status: "Hampir habis" },
  { item: "Cup 12oz", stock: "180 pcs", status: "Aman" },
];

export default function Inventory({ onLogout }) {
  const [items, setItems] = useState(initialInventory);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);
  const [form, setForm] = useState({ item: "", stock: "", status: "Aman" });

  const handleAddItem = (event) => {
    event.preventDefault();
    if (!form.item.trim() || !form.stock.trim()) return;

    setItems((current) => [
      ...current,
      {
        item: form.item.trim(),
        stock: form.stock.trim(),
        status: form.status,
      },
    ]);

    setForm({ item: "", stock: "", status: "Aman" });
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-amber-600">Inventaris</p>
            <h2 className="mt-1 text-2xl font-semibold text-stone-900">Stok bahan baku & perlengkapan</h2>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
            {items.length} item terdaftar
          </span>
        </div>

        <form onSubmit={handleAddItem} className="mt-6 rounded-xl border border-stone-200 bg-stone-50 p-4">
          <div className="grid gap-3 md:grid-cols-3">
            <input
              type="text"
              value={form.item}
              onChange={(event) => setForm((current) => ({ ...current, item: event.target.value }))}
              placeholder="Nama barang"
              className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 outline-none"
            />
            <input
              type="text"
              value={form.stock}
              onChange={(event) => setForm((current) => ({ ...current, stock: event.target.value }))}
              placeholder="Stok, contoh: 48 kg"
              className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 outline-none"
            />
            <select
              value={form.status}
              onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
              className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 outline-none"
            >
              <option value="Aman">Aman</option>
              <option value="Hampir habis">Hampir habis</option>
              <option value="Perlu restock">Perlu restock</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-3 rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700"
          >
            Tambah barang oleh admin
          </button>
        </form>

        <div className="mt-6 space-y-3">
          {loading ? (
            <Skeleton count={3} />
          ) : items.length === 0 ? (
            <EmptyState title="Inventaris kosong" description="Belum ada item terdaftar." />
          ) : (
            items.map((entry) => (
              <div key={`${entry.item}-${entry.stock}`} className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
                <div>
                  <p className="font-medium text-stone-900">{entry.item}</p>
                  <p className="text-sm text-stone-500">Stok saat ini</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-stone-900">{entry.stock}</p>
                  <p className="text-sm text-amber-700">{entry.status}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
