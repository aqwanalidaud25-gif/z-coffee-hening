import { Bell, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";

export default function NotificationPanel({ notifications = [] }) {
  return (
    <div className="w-80 rounded-2xl border border-stone-200 bg-white p-4 shadow-xl" role="region" aria-label="Pusat notifikasi">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-amber-600" />
          <h3 className="text-sm font-semibold text-stone-900">Notifikasi</h3>
        </div>
        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
          {notifications.length} baru
        </span>
      </div>

      <div className="mt-4 space-y-2">
        {notifications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-stone-200 bg-stone-50 px-3 py-4 text-sm text-stone-500" role="status" aria-live="polite">
            Tidak ada notifikasi baru untuk saat ini.
          </div>
        ) : (
          notifications.map((item) => {
            const Icon = item.type === "warning" ? AlertTriangle : CheckCircle2;
            return (
              <div key={item.id} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 rounded-full bg-white p-1 shadow-sm">
                    <Icon className={`h-3.5 w-3.5 ${item.type === "warning" ? "text-amber-600" : "text-emerald-600"}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-stone-800">{item.title}</p>
                    <p className="mt-1 text-xs text-stone-500">{item.message}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-700">
        <Sparkles className="h-3.5 w-3.5" />
        Sistem siap mengingatkan Anda saat ada hal penting.
      </div>
    </div>
  );
}
