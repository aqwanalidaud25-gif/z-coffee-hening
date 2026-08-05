import { useState } from "react";
import { CalendarCheck2, Clock3, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import Layout from "../components/layout/Layout";
import PageHeader from "../components/ui/PageHeader";
import useAttendance from "../hooks/useAttendance";

export default function AbsensiKaryawan({ onLogout }) {
  const { employees, report, isInitializing, isSubmitting, error, lastAction, verifyPin, recordAttendance } = useAttendance();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [pin, setPin] = useState("");
  const [actionType, setActionType] = useState("masuk");
  const [query, setQuery] = useState("");

  const handleVerify = async () => {
    if (!selectedEmployeeId || !pin) return;
    await verifyPin({ employeeId: selectedEmployeeId, pin });
  };

  const handleRecord = async () => {
    if (!selectedEmployeeId) return;
    await recordAttendance({ employeeId: selectedEmployeeId, type: actionType });
  };

  const hadirCount = report.filter((r) => r.status === "Hadir").length;
  const izinCount = report.filter((r) => r.status === "Izin").length;
  const telatCount = report.filter((r) => r.status === "Telat").length;
  const totalEmployees = employees.length;

  const visibleReport = report.filter((r) => {
    if (!query) return true;
    return r.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        subtitle="Absensi"
        title="Pencatatan kehadiran karyawan"
        description="Verifikasi PIN secara cepat dan catat kedatangan atau kepulangan tim secara real-time."
        status="Siap pakai"
      />

      <div className="rounded-[1.25rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow)]">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">Verifikasi & Catat Absensi</h3>
            <p className="mt-1 text-sm text-stone-500">Pilih karyawan, masukkan PIN, dan catat waktu kehadiran</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 rounded-xl border border-stone-100 bg-stone-50 px-3 py-2">
              <CalendarCheck2 className="h-4 w-4 text-amber-600" />
              <div className="text-sm">
                <div className="text-xs text-stone-500">Hadir</div>
                <div className="text-sm font-semibold text-stone-900">{hadirCount}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-stone-100 bg-stone-50 px-3 py-2">
              <Clock3 className="h-4 w-4 text-stone-600" />
              <div className="text-sm">
                <div className="text-xs text-stone-500">Telat</div>
                <div className="text-sm font-semibold text-stone-900">{telatCount}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-stone-100 bg-stone-50 px-3 py-2">
              <span className="text-xs text-stone-500">Total</span>
              <div className="text-sm font-semibold text-stone-900">{totalEmployees}</div>
            </div>
          </div>
        </div>

        {error ? (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            <AlertTriangle className="h-4 w-4" />
            {error}
          </div>
        ) : null}

        {lastAction && !error ? (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            {lastAction.message}
          </div>
        ) : null}

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-stone-700">Pilih Karyawan</label>
            <div className="flex gap-2">
              <select
                value={selectedEmployeeId}
                onChange={(event) => setSelectedEmployeeId(event.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700 transition-colors focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              >
                <option value="">— Pilih karyawan —</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} — {employee.role}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari karyawan..."
                className="w-56 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 transition-colors focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-stone-700">PIN</label>
            <input
              type="password"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700 transition-colors focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              placeholder="Masukkan PIN 4 digit"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={handleVerify}
            disabled={isSubmitting || !selectedEmployeeId || !pin}
            className="flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            {isSubmitting ? "Memverifikasi..." : "Verifikasi PIN"}
            <ArrowRight className="h-4 w-4" />
          </button>

          <select
            value={actionType}
            onChange={(event) => setActionType(event.target.value)}
            className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 transition-colors focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
          >
            <option value="masuk">Catat Masuk</option>
            <option value="pulang">Catat Pulang</option>
          </select>

          <button
            onClick={handleRecord}
            disabled={isSubmitting || !selectedEmployeeId}
            className="rounded-xl border border-stone-200 bg-stone-50 px-5 py-3 font-semibold text-stone-700 transition-colors hover:bg-stone-100 disabled:cursor-not-allowed disabled:text-stone-400"
          >
            {isSubmitting ? "Mengirim..." : "Simpan Absensi"}
          </button>
        </div>
      </div>

      <div className="rounded-[1.25rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-stone-900">Ringkasan Absensi Hari Ini</h3>
          <div className="flex items-center gap-3">
            <div className="text-sm text-stone-500">Hadir</div>
            <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">{hadirCount}</div>
          </div>
        </div>

        {isInitializing ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-12 animate-pulse rounded-xl bg-stone-200" />
            ))}
          </div>
        ) : visibleReport.length > 0 ? (
          <div className="space-y-3">
            {visibleReport.map((person) => (
              <div key={person.id} className="flex items-center justify-between gap-4 rounded-xl border border-stone-100 bg-stone-50 px-4 py-3 hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-700 font-semibold">
                    {person.name.split(" ").map((n) => n[0]).slice(0,2).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">{person.name}</p>
                    <p className="text-xs text-stone-500">{person.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-stone-600">
                    <Clock3 className="h-3.5 w-3.5" />
                    {person.time}
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${person.tone}`}>{person.status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-stone-500">Belum ada data absensi untuk pencarian ini</p>
        )}
      </div>
    </Layout>
  );
}
