import { useState } from "react";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";

const initialSettings = [
  { title: "Jam operasional", detail: "07.00 - 22.00" },
  { title: "Metode pembayaran", detail: "QRIS, Cash, E-Wallet" },
  { title: "Notifikasi", detail: "Aktif untuk stok rendah" },
];

export default function Settings({ onLogout }) {
  const [settings, setSettings] = useState(initialSettings);
  const [editingKey, setEditingKey] = useState(null);
  const [draftValue, setDraftValue] = useState("");

  const startEditing = (item) => {
    setEditingKey(item.title);
    setDraftValue(item.detail);
  };

  const saveEditing = (title) => {
    setSettings((current) =>
      current.map((item) => (item.title === title ? { ...item, detail: draftValue } : item))
    );
    setEditingKey(null);
  };

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        subtitle="Pengaturan"
        title="Preferensi operasional"
        description="Atur jam operasional, metode pembayaran, dan notifikasi dengan mudah."
        status="Terkelola"
        actions={<Button variant="secondary">Simpan semua</Button>}
      />

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-medium text-amber-600">Pengaturan</p>
          <h2 className="mt-1 text-2xl font-semibold text-stone-900">Atur preferensi operasional</h2>
        </div>

        <div className="mt-6 space-y-4">
          {settings.map((item) => {
            const isEditing = editingKey === item.title;

            return (
              <div key={item.title} className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-stone-900">{item.title}</p>
                    {isEditing ? (
                      <input
                        value={draftValue}
                        onChange={(event) => setDraftValue(event.target.value)}
                        className="mt-2 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 outline-none"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-stone-600">{item.detail}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => (isEditing ? saveEditing(item.title) : startEditing(item))}
                    className="rounded-full bg-amber-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-amber-700"
                  >
                    {isEditing ? "Simpan" : "Lihat & Edit"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
