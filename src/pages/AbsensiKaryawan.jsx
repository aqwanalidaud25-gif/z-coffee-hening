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

  const handleVerify = async () => {
    if (!selectedEmployeeId || !pin) return;
    await verifyPin({ employeeId: selectedEmployeeId, pin });
  };

  const handleRecord = async () => {
    if (!selectedEmployeeId) return;
    await recordAttendance({ employeeId: selectedEmployeeId, type: actionType });
  };

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        subtitle="Absensi"
        title="Pencatatan kehadiran karyawan"
        description="Verifikasi PIN secara cepat dan catat kedatangan atau kepulangan tim secara real-time."
        status="Siap pakai"
      />

      <div className="rounded-[1.25rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow)]">
        <div className="mb-6 border-b border-stone-200 pb-4">
          <h3 className="text-lg font-semibold text-stone-900">Verifikasi & Catat Absensi</h3>
          <p className="mt-1 text-sm text-stone-500">Pilih karyawan, masukkan PIN, dan catat waktu kehadiran</p>
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

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-stone-700">Pilih Karyawan</label>
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

        <div className="mt-6 flex flex-wrap gap-3">
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
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
            {report.filter((r) => r.status === "Hadir").length} hadir
          </span>
        </div>

        {isInitializing ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-12 animate-pulse rounded-xl bg-stone-200" />
            ))}
          </div>
        ) : report.length > 0 ? (
          <div className="space-y-2">
            {report.map((person) => (
              <div key={person.id} className="flex items-center justify-between rounded-[1.25rem] border border-stone-200 bg-stone-50 px-4 py-3">
                <div>
                  <p className="font-semibold text-stone-900">{person.name}</p>
                  <p className="text-xs text-stone-500">{person.role}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-stone-600">
                    <Clock3 className="h-3.5 w-3.5" />
                    {person.time}
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${person.tone}`}>
                    {person.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-stone-500">Belum ada data absensi hari ini</p>
        )}
      </div>
    </Layout>
  );
}
