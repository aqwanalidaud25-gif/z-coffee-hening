import { useMemo, useState } from "react";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";

const customersData = [
  { name: "Alya", tier: "Gold", orders: 14, lastVisit: "2 hari lalu", status: "Aktif" },
  { name: "Riko", tier: "Silver", orders: 8, lastVisit: "12 hari lalu", status: "Jarang" },
  { name: "Nina", tier: "Bronze", orders: 5, lastVisit: "1 bulan lalu", status: "Tidak aktif" },
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

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-amber-600">Pelanggan</p>
            <h2 className="mt-1 text-2xl font-semibold text-stone-900">Daftar pelanggan setia</h2>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
            {customersData.length} pelanggan aktif
          </span>
        </div>

        <div className="mt-6 rounded-xl border border-stone-200 bg-stone-50 p-4">
          <label htmlFor="customer-search" className="text-sm font-medium text-stone-700">
            Cari pelanggan
          </label>
          <input
            id="customer-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari nama, tier, status, atau terakhir datang"
            className="mt-2 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 outline-none"
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filteredCustomers.map((customer) => (
            <div key={customer.name} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-stone-900">{customer.name}</p>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-stone-600">
                  {customer.tier}
                </span>
              </div>
              <p className="mt-3 text-sm text-stone-600">Total order: {customer.orders}</p>
              <p className="mt-1 text-sm text-stone-600">Terakhir datang: {customer.lastVisit}</p>
              <p className="mt-2 text-sm font-medium text-amber-700">Status: {customer.status}</p>
            </div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="mt-4 rounded-xl border border-dashed border-stone-200 bg-stone-50 p-4 text-sm text-stone-500">
            Tidak ada pelanggan yang cocok dengan pencarian.
          </div>
        )}
      </div>
    </Layout>
  );
}
