import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Skeleton from "../components/ui/Skeleton";
import EmptyState from "../components/ui/EmptyState";

const initialInventory = [
  { item: "Kopi Arabika", stock: "48 kg", status: "Aman" },
  { item: "Susu Oat", stock: "6 liter", status: "Hampir habis" },
  { item: "Cup 12oz", stock: "180 pcs", status: "Aman" },
  { item: "Matcha powder", stock: "2 kg", status: "perlu restok"},
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
      <PageHeader
        subtitle="Inventaris"
        title="Kelola stok bahan baku"
        description="Tambahkan, tandai, dan pantau status persediaan supaya operasi kafe selalu lancar."
        status="Terupdate"
        actions={<Button variant="secondary">Cetak laporan stok</Button>}
      />

      <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-amber-600">Inventaris</p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900">Stok bahan baku & perlengkapan</h2>
          </div>
          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-semibold text-stone-700 shadow-sm">
            {items.length} item terdaftar
          </div>
        </div>

        <form onSubmit={handleAddItem} className="mt-6 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              value={form.item}
              onChange={(event) => setForm((current) => ({ ...current, item: event.target.value }))}
              placeholder="Nama barang"
              className="rounded-[1.5rem] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
            <input
              type="text"
              value={form.stock}
              onChange={(event) => setForm((current) => ({ ...current, stock: event.target.value }))}
              placeholder="Stok, contoh: 48 kg"
              className="rounded-[1.5rem] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
            <select
              value={form.status}
              onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
              className="rounded-[1.5rem] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            >
              <option value="Aman">Aman</option>
              <option value="Hampir habis">Hampir habis</option>
              <option value="Perlu restock">Perlu restock</option>
            </select>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button type="submit" className="rounded-[1.5rem]">
              Tambah barang oleh admin
            </Button>
            <Button variant="secondary" type="button" className="rounded-[1.5rem]">
              Cetak laporan stok
            </Button>
          </div>
        </form>

        <div className="mt-6 grid gap-4">
          {loading ? (
            <Skeleton count={3} />
          ) : items.length === 0 ? (
            <EmptyState title="Inventaris kosong" description="Belum ada item terdaftar." />
          ) : (
            items.map((entry) => (
              <div
                key={`${entry.item}-${entry.stock}`}
                className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-stone-900">{entry.item}</p>
                    <p className="text-sm text-stone-500">Stok saat ini</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-stone-900">{entry.stock}</p>
                    <p className="mt-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">{entry.status}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
