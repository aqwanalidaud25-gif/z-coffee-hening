import Layout from "../components/layout/Layout";

export default function Settings({ onLogout }) {
  return (
    <Layout onLogout={onLogout}>
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-medium text-amber-600">Pengaturan</p>
          <h2 className="mt-1 text-2xl font-semibold text-stone-900">Atur preferensi operasional</h2>
        </div>

        <div className="mt-6 space-y-4">
          {[
            { title: "Jam operasional", detail: "07.00 - 22.00" },
            { title: "Metode pembayaran", detail: "QRIS, Cash, E-Wallet" },
            { title: "Notifikasi", detail: "Aktif untuk stok rendah" },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
              <p className="font-medium text-stone-900">{item.title}</p>
              <p className="mt-1 text-sm text-stone-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
