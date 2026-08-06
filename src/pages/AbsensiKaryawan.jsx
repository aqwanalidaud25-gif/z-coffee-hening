import { useState } from "react";
import { CalendarCheck2, Clock3, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import Layout from "../components/layout/Layout";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
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
  const [statusFilter, setStatusFilter] = useState("all");

  const visibleReport = report.filter((r) => {
    const matchesQuery = !query || r.name.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status.toLowerCase() === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        subtitle="Absensi"
        title="Pencatatan kehadiran karyawan"
        description="Verifikasi PIN secara cepat dan catat kedatangan atau kepulangan tim secara real-time."
        status="Siap pakai"
      />

      {isInitializing && (
        <div className="mb-6 rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600">
          Memuat data absensi... Mohon tunggu.
        </div>
      )}

      <div className="rounded-[1.25rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow)]">
        <div className="mb-6 grid gap-4 md:grid-cols-[1.25fr_1fr] md:items-center">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">Verifikasi & Catat Absensi</h3>
            <p className="mt-1 text-sm text-stone-500">Pilih karyawan, masukkan PIN, dan catat waktu kehadiran</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Hadir</div>
              <div className="mt-3 text-3xl font-semibold text-stone-900">{hadirCount}</div>
            </div>
            <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Telat</div>
              <div className="mt-3 text-3xl font-semibold text-stone-900">{telatCount}</div>
            </div>
            <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Total</div>
              <div className="mt-3 text-3xl font-semibold text-stone-900">{totalEmployees}</div>
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
            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                value={selectedEmployeeId}
                onChange={(event) => setSelectedEmployeeId(event.target.value)}
                disabled={isInitializing}
                className="w-full rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700 transition-colors focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 disabled:cursor-not-allowed disabled:bg-stone-100"
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
                disabled={isInitializing}
                className="w-full rounded-3xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 transition-colors focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 disabled:cursor-not-allowed disabled:bg-stone-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-stone-700">PIN</label>
            <input
              type="password"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              className="w-full rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700 transition-colors focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              placeholder="Masukkan PIN 4 digit"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1.6fr_1fr_1fr]">
          <Button
            onClick={handleVerify}
            loading={isSubmitting}
            disabled={isInitializing || isSubmitting || !selectedEmployeeId || !pin}
            className="w-full"
          >
            Verifikasi PIN
          </Button>

          <select
            value={actionType}
            onChange={(event) => setActionType(event.target.value)}
            disabled={isInitializing}
            className="w-full rounded-3xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 transition duration-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 disabled:cursor-not-allowed disabled:bg-stone-100"
          >
            <option value="masuk">Catat Masuk</option>
            <option value="pulang">Catat Pulang</option>
          </select>

          <Button
            variant="secondary"
            onClick={handleRecord}
            loading={isSubmitting}
            disabled={isInitializing || isSubmitting || !selectedEmployeeId}
            className="w-full"
          >
            Simpan Absensi
          </Button>
        </div>
      </div>

      <div className="rounded-[1.25rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow)]">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">Ringkasan Absensi Hari Ini</h3>
            <p className="text-sm text-stone-500">Pantau status kehadiran tim dengan cepat.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setStatusFilter("all")}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${statusFilter === "all" ? "bg-amber-600 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"}`}
            >
              Semua
            </button>
            <button
              onClick={() => setStatusFilter("hadir")}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${statusFilter === "hadir" ? "bg-amber-600 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"}`}
            >
              Hadir
            </button>
            <button
              onClick={() => setStatusFilter("telat")}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${statusFilter === "telat" ? "bg-amber-600 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"}`}
            >
              Telat
            </button>
            <button
              onClick={() => setStatusFilter("izin")}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${statusFilter === "izin" ? "bg-amber-600 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"}`}
            >
              Izin
            </button>
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
              <div key={person.id} className="group overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-50 text-amber-700 font-semibold text-base">
                      {person.name.split(" ").map((n) => n[0]).slice(0,2).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">{person.name}</p>
                      <p className="text-xs text-stone-500">{person.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 rounded-3xl bg-stone-50 px-3 py-2 text-xs font-medium text-stone-600">
                      <Clock3 className="h-4 w-4" />
                      {person.time}
                    </div>
                    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${person.tone}`}>
                      {person.status}
                    </span>
                  </div>
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
