import { useMemo, useState } from "react";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";

const customersData = [
  { name: "Alya", tier: "Gold", orders: 14, lastVisit: "2 hari lalu", status: "Aktif" },
  { name: "Riko", tier: "Silver", orders: 8, lastVisit: "12 hari lalu", status: "Jarang" },
  { name: "Nina", tier: "Bronze", orders: 5, lastVisit: "1 bulan lalu", status: "Tidak aktif" },
  { name: "Dimas", tier: "silver", orders: 10, lastVisit: "3 hari yang lalu", status: "aktif"},
];

export default function Customers({ onLogout }) {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    const keyword = search.toLowerCase();

    return customersData.filter((customer) => {
      return [customer.name, customer.tier, customer.status, customer.lastVisit]
        .join(" ")
        .toLowerCase()
        .includes(keyword);
    });
  }, [search]);

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        subtitle="Pelanggan"
        title="Analitik pelanggan setia"
        description="Cari dan pantau pelanggan yang sering datang maupun mereka yang butuh perhatian lebih."
        status="Data aktif"
        actions={<Button variant="secondary">Lihat loyalitas</Button>}
      />

      <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-amber-600">Pelanggan</p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900">Analitik pelanggan setia</h2>
          </div>
          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-semibold text-stone-700 shadow-sm">
            {customersData.length} pelanggan aktif
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 shadow-sm">
            <label htmlFor="customer-search" className="text-sm font-semibold text-stone-700">Cari pelanggan</label>
            <input
              id="customer-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari nama, tier, status, atau terakhir datang"
              className="mt-3 w-full rounded-[1.5rem] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 shadow-sm">
            <p className="text-sm font-semibold text-stone-700">Hasil pencarian</p>
            <p className="mt-3 text-3xl font-semibold text-stone-900">{filteredCustomers.length}</p>
            <p className="mt-1 text-sm text-stone-500">Pelanggan sesuai kriteria</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCustomers.map((customer) => (
            <div key={customer.name} className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-50 text-amber-700 font-semibold text-base">
                    {customer.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-stone-900">{customer.name}</p>
                    <p className="text-sm text-stone-500">{customer.tier}</p>
                  </div>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-600">{customer.status}</span>
              </div>
              <div className="mt-5 grid gap-3 text-sm text-stone-600">
                <div className="rounded-[1.5rem] bg-white px-4 py-3">
                  <p className="font-medium text-stone-900">{customer.orders} order</p>
                  <p className="text-xs text-stone-500">Total</p>
                </div>
                <div className="rounded-[1.5rem] bg-white px-4 py-3">
                  <p className="font-medium text-stone-900">{customer.lastVisit}</p>
                  <p className="text-xs text-stone-500">Terakhir datang</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="mt-4 rounded-[1.5rem] border border-dashed border-stone-200 bg-stone-50 p-6 text-center text-sm text-stone-500">
            Tidak ada pelanggan yang cocok dengan pencarian.
          </div>
        )}
      </div>
    </Layout>
  );
}
