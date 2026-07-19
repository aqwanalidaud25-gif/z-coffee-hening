import Layout from "../components/layout/Layout";

export default function Customers({ onLogout }) {
  return (
    <Layout onLogout={onLogout}>
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-amber-600">Pelanggan</p>
            <h2 className="mt-1 text-2xl font-semibold text-stone-900">Daftar pelanggan setia</h2>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
            182 pelanggan aktif
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            { name: "Alya", tier: "Gold", orders: 14 },
            { name: "Riko", tier: "Silver", orders: 8 },
            { name: "Nina", tier: "Bronze", orders: 5 },
          ].map((customer) => (
            <div key={customer.name} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-stone-900">{customer.name}</p>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-stone-600">
                  {customer.tier}
                </span>
              </div>
              <p className="mt-3 text-sm text-stone-600">Total order: {customer.orders}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
