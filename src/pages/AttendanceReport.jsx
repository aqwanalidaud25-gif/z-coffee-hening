import { RotateCcw, AlertTriangle, CalendarDays, Users2 } from "lucide-react";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import useAttendance from "../hooks/useAttendance";

export default function AttendanceReport({ onLogout }) {
  const { report, isInitializing, error, refreshReport } = useAttendance();

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        subtitle="Laporan absensi"
        title="Rekap kehadiran"
        description="Sajikan ringkasan kehadiran harian dengan status dan jam secara jelas."
        status="Real-time"
        actions={
          <Button variant="secondary" onClick={() => refreshReport()}>
            Refresh data
          </Button>
        }
      />

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        {error ? (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-700">
            <AlertTriangle className="h-4 w-4" />
            {error}
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <div className="flex items-center gap-2 text-stone-600">
              <CalendarDays className="h-4 w-4 text-amber-600" />
              <p className="text-sm font-medium">Hari ini</p>
            </div>
            <p className="mt-3 text-2xl font-semibold text-stone-900">20 Juli</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <div className="flex items-center gap-2 text-stone-600">
              <Users2 className="h-4 w-4 text-amber-600" />
              <p className="text-sm font-medium">Kehadiran</p>
            </div>
            <p className="mt-3 text-2xl font-semibold text-stone-900">3 orang</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <div className="flex items-center gap-2 text-stone-600">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <p className="text-sm font-medium">Catatan</p>
            </div>
            <p className="mt-3 text-2xl font-semibold text-stone-900">1 telat</p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-stone-200">
          <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-stone-700">Karyawan</th>
                <th className="px-4 py-3 font-semibold text-stone-700">Jabatan</th>
                <th className="px-4 py-3 font-semibold text-stone-700">Status</th>
                <th className="px-4 py-3 font-semibold text-stone-700">Jam</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 bg-white">
              {isInitializing ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan="4" className="px-4 py-4">
                      <div className="h-4 w-full animate-pulse rounded bg-stone-200" />
                    </td>
                  </tr>
                ))
              ) : (
                report.map((row) => (
                  <tr key={row.id} className="hover:bg-stone-50">
                    <td className="px-4 py-3 font-medium text-stone-800">{row.name}</td>
                    <td className="px-4 py-3 text-stone-600">{row.role}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${row.tone}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-stone-600">{row.time}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
