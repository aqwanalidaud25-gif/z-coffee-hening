import Layout from "../components/layout/Layout";

export default function Inventory() {
  return (
    <Layout>
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-amber-600">Inventaris</p>
            <h2 className="mt-1 text-2xl font-semibold text-stone-900">Stok bahan baku & perlengkapan</h2>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
            12 item butuh restock
          </span>
        </div>

        <div className="mt-6 space-y-3">
          {[
            { item: "Kopi Arabika", stock: "48 kg", status: "Aman" },
            { item: "Susu Oat", stock: "6 liter", status: "Hampir habis" },
            { item: "Cup 12oz", stock: "180 pcs", status: "Aman" },
          ].map((entry) => (
            <div key={entry.item} className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
              <div>
                <p className="font-medium text-stone-900">{entry.item}</p>
                <p className="text-sm text-stone-500">Stok saat ini</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-stone-900">{entry.stock}</p>
                <p className="text-sm text-amber-700">{entry.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
