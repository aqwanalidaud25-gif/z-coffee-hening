import { useState } from "react";
import { RotateCcw, AlertTriangle, CalendarDays, Users2 } from "lucide-react";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import useAttendance from "../hooks/useAttendance";

export default function AttendanceReport({ onLogout }) {
  const { report, isInitializing, error, refreshReport } = useAttendance();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const hadirCount = report.filter((row) => row.status === "Hadir").length;
  const telatCount = report.filter((row) => row.status === "Telat").length;
  const izinCount = report.filter((row) => row.status === "Izin").length;
  const totalCount = report.length;

  const visibleReport = report.filter((row) => {
    const matchesQuery = !query || row.name.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "all" || row.status.toLowerCase() === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleDownloadReport = () => {
    const headers = ["Nama", "Jabatan", "Status", "Waktu"];
    const rows = visibleReport.map((row) => [row.name, row.role, row.status, row.time]);
    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `rekap-absensi-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        subtitle="Laporan absensi"
        title="Rekap kehadiran"
        description="Sajikan ringkasan kehadiran harian dengan status dan jam secara jelas."
        status="Real-time"
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={() => refreshReport()} loading={isInitializing}>
              {isInitializing ? "Memuat ulang..." : "Segarkan data"}
            </Button>
            <Button onClick={handleDownloadReport} disabled={isInitializing || visibleReport.length === 0}>
              Unduh ringkasan
            </Button>
          </div>
        }
      />

      {error && (
        <div className="mb-6 rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_25px_60px_-32px_rgba(15,23,42,0.18)]">
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 shadow-sm">
            <div className="flex items-center gap-3 text-stone-500">
              <CalendarDays className="h-5 w-5 text-amber-600" />
              <p className="text-sm font-semibold">Tanggal</p>
            </div>
            <p className="mt-4 text-2xl font-semibold text-stone-900">20 Juli</p>
            <p className="mt-1 text-xs text-stone-500">Data kehadiran hari ini</p>
          </div>
          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 shadow-sm">
            <div className="flex items-center gap-3 text-stone-500">
              <Users2 className="h-5 w-5 text-amber-600" />
              <p className="text-sm font-semibold">Hadir</p>
            </div>
            <p className="mt-4 text-2xl font-semibold text-stone-900">{hadirCount}</p>
            <p className="mt-1 text-xs text-stone-500">Karyawan hadir</p>
          </div>
          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 shadow-sm">
            <div className="flex items-center gap-3 text-stone-500">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <p className="text-sm font-semibold">Telat</p>
            </div>
            <p className="mt-4 text-2xl font-semibold text-stone-900">{telatCount}</p>
            <p className="mt-1 text-xs text-stone-500">Telat hari ini</p>
          </div>
          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 shadow-sm">
            <div className="flex items-center gap-3 text-stone-500">
              <RotateCcw className="h-5 w-5 text-amber-600" />
              <p className="text-sm font-semibold">Izin</p>
            </div>
            <p className="mt-4 text-2xl font-semibold text-stone-900">{izinCount}</p>
            <p className="mt-1 text-xs text-stone-500">Izin/reschedule</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-stone-700">Cari karyawan</label>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari nama atau jabatan..."
              disabled={isInitializing}
              className="w-full rounded-3xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 transition duration-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 disabled:cursor-not-allowed disabled:bg-stone-100"
            />
          </div>

          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 shadow-sm">
            <p className="mb-3 text-sm font-semibold text-stone-700">Filter status</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Semua", value: "all" },
                { label: "Hadir", value: "hadir" },
                { label: "Telat", value: "telat" },
                { label: "Izin", value: "izin" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStatusFilter(option.value)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    statusFilter === option.value
                      ? "bg-amber-600 text-white shadow"
                      : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-stone-900">Detail absensi</h3>
              <p className="text-sm text-stone-500">Lihat ringkasan lengkap berdasarkan filter.</p>
            </div>
            <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-stone-600 shadow-sm">
              {visibleReport.length} hasil ditemukan
            </div>
          </div>

          {isInitializing ? (
            <div className="mt-5 space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-24 rounded-[1.5rem] bg-stone-200" />
              ))}
            </div>
          ) : visibleReport.length > 0 ? (
            <div className="mt-5 grid gap-3">
              {visibleReport.map((row) => (
                <div
                  key={row.id}
                  className="rounded-[1.5rem] border border-stone-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-50 text-amber-700 font-semibold text-base">
                        {row.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-900">{row.name}</p>
                        <p className="text-xs text-stone-500">{row.role}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-600">
                        {row.time}
                      </span>
                      <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${row.tone}`}>
                        {row.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-[1.5rem] border border-dashed border-stone-200 bg-white p-6 text-center text-sm text-stone-500">
              Tidak ada data absensi yang cocok dengan filter.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
