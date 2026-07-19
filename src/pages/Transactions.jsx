import Layout from "../components/layout/Layout";

export default function Transactions({ onLogout }) {
  return (
    <Layout onLogout={onLogout}>
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-amber-600">Transaksi</p>
            <h2 className="mt-1 text-2xl font-semibold text-stone-900">Riwayat & status transaksi</h2>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
            24 transaksi hari ini
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            { id: "#1024", customer: "Alya", total: "Rp96.000", status: "Selesai" },
            { id: "#1025", customer: "Riko", total: "Rp124.000", status: "Diproses" },
            { id: "#1026", customer: "Nina", total: "Rp78.000", status: "Menunggu" },
          ].map((item) => (
            <div key={item.id} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-stone-900">{item.id}</p>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-stone-600">
                  {item.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-stone-600">Pelanggan: {item.customer}</p>
              <p className="mt-1 text-lg font-semibold text-stone-900">{item.total}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
