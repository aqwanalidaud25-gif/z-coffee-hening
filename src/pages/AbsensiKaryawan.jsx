import { useState } from "react";
import { CalendarCheck2, Clock3, AlertTriangle, CheckCircle2, Plus, Pencil, Trash2 } from "lucide-react";
import Layout from "../components/layout/Layout";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import useAttendance from "../hooks/useAttendance";

export default function AbsensiKaryawan({ onLogout }) {
  const {
    employees,
    report,
    isInitializing,
    isSubmitting,
    error,
    lastAction,
    verifyPin,
    recordAttendance,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  } = useAttendance();

  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [pin, setPin] = useState("");
  const [actionType, setActionType] = useState("masuk");
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeRole, setEmployeeRole] = useState("");
  const [employeePin, setEmployeePin] = useState("");
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const visibleEmployees = employees.filter((employee) =>
    !employeeSearch || `${employee.name} ${employee.role}`.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  const visibleReport = report.filter((row) => statusFilter === "all" || row.status.toLowerCase() === statusFilter);

  const handleVerify = async () => {
    if (!selectedEmployeeId || !pin) return;
    await verifyPin({ employeeId: selectedEmployeeId, pin });
  };

  const handleRecord = async () => {
    if (!selectedEmployeeId) return;
    await recordAttendance({ employeeId: selectedEmployeeId, type: actionType });
  };

  const openAddEmployee = () => {
    setEditingEmployee(null);
    setEmployeeName("");
    setEmployeeRole("");
    setEmployeePin("");
    setIsEmployeeModalOpen(true);
  };

  const openEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setEmployeeName(employee.name);
    setEmployeeRole(employee.role);
    setEmployeePin(employee.pin);
    setIsEmployeeModalOpen(true);
  };

  const closeEmployeeModal = () => {
    setIsEmployeeModalOpen(false);
    setEditingEmployee(null);
  };

  const handleSaveEmployee = async (event) => {
    event.preventDefault();

    if (!employeeName || !employeeRole || !employeePin) return;

    if (editingEmployee) {
      await updateEmployee({
        id: editingEmployee.id,
        name: employeeName,
        role: employeeRole,
        pin: employeePin,
      });
    } else {
      await addEmployee({ name: employeeName, role: employeeRole, pin: employeePin });
    }

    closeEmployeeModal();
  };

  const confirmDeleteEmployee = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteEmployee = async () => {
    if (!employeeToDelete) return;

    await deleteEmployee(employeeToDelete.id);
    if (selectedEmployeeId === employeeToDelete.id) {
      setSelectedEmployeeId("");
    }
    setEmployeeToDelete(null);
    setIsDeleteConfirmOpen(false);
  };

  const totalEmployees = employees.length;
  const hadirCount = report.filter((r) => r.status === "Hadir").length;
  const izinCount = report.filter((r) => r.status === "Izin").length;
  const telatCount = report.filter((r) => r.status === "Telat").length;

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
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">Data Karyawan</h3>
            <p className="mt-1 text-sm text-stone-500">Tambahkan, edit, atau hapus data karyawan sebelum mereka bisa absen.</p>
          </div>
          <Button variant="secondary" onClick={openAddEmployee} className="inline-flex items-center gap-2">
            <Plus className="h-4 w-4" /> Tambah Karyawan
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.4fr_0.6fr]">
          <div>
            <label className="mb-2 block text-sm font-semibold text-stone-700">Cari karyawan</label>
            <input
              value={employeeSearch}
              onChange={(event) => setEmployeeSearch(event.target.value)}
              placeholder="Cari nama atau jabatan..."
              disabled={isInitializing}
              className="w-full rounded-3xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 transition duration-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 disabled:cursor-not-allowed disabled:bg-stone-100"
            />
          </div>

          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Total karyawan</div>
            <div className="mt-3 text-3xl font-semibold text-stone-900">{totalEmployees}</div>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          {totalEmployees > 0 ? (
            <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold text-stone-500">ID</th>
                  <th className="px-4 py-3 font-semibold text-stone-500">Nama</th>
                  <th className="px-4 py-3 font-semibold text-stone-500">Jabatan</th>
                  <th className="px-4 py-3 font-semibold text-stone-500">PIN</th>
                  <th className="px-4 py-3 font-semibold text-stone-500">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {visibleEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="whitespace-nowrap px-4 py-3 text-stone-700">{employee.id}</td>
                    <td className="px-4 py-3 text-stone-700">{employee.name}</td>
                    <td className="px-4 py-3 text-stone-700">{employee.role}</td>
                    <td className="px-4 py-3 text-stone-700">{employee.pin}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <Button variant="secondary" onClick={() => openEditEmployee(employee)} className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold">
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </Button>
                        <Button variant="danger" onClick={() => confirmDeleteEmployee(employee)} className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold">
                          <Trash2 className="h-3.5 w-3.5" /> Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-stone-200 bg-stone-50 p-6 text-center text-sm text-stone-500">
              Belum ada data karyawan. Silakan tambahkan karyawan terlebih dahulu.
            </div>
          )}
        </div>
      </div>

      <div className="rounded-[1.25rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow)] mt-6">
        <div className="mb-6 grid gap-4 md:grid-cols-[1.25fr_1fr] md:items-center">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">Verifikasi & Catat Absensi</h3>
            <p className="mt-1 text-sm text-stone-500">Pilih karyawan, masukkan PIN, dan catat waktu kehadiran.</p>
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

        {totalEmployees === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-stone-200 bg-stone-50 p-6 text-center text-sm text-stone-500">
            Tambahkan data karyawan terlebih dahulu sebelum mencatat absensi.
          </div>
        ) : (
          <>
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
                    {visibleEmployees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name} — {employee.role}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={employeeSearch}
                    onChange={(e) => setEmployeeSearch(e.target.value)}
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
          </>
        )}
      </div>

      <div className="rounded-[1.25rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow)] mt-6">
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
                      {person.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
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

      <Modal title={editingEmployee ? "Edit Karyawan" : "Tambah Karyawan"} isOpen={isEmployeeModalOpen} onClose={closeEmployeeModal} size="md">
        <form className="space-y-4" onSubmit={handleSaveEmployee}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-stone-700">Nama</label>
            <input
              value={employeeName}
              onChange={(event) => setEmployeeName(event.target.value)}
              placeholder="Nama karyawan"
              className="w-full rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700 transition duration-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-stone-700">Jabatan</label>
            <input
              value={employeeRole}
              onChange={(event) => setEmployeeRole(event.target.value)}
              placeholder="Contoh: Barista, Kasir"
              className="w-full rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700 transition duration-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-stone-700">PIN</label>
            <input
              value={employeePin}
              onChange={(event) => setEmployeePin(event.target.value)}
              placeholder="PIN 4 digit"
              className="w-full rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700 transition duration-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={closeEmployeeModal} type="button">
              Batal
            </Button>
            <Button type="submit" loading={isSubmitting}>
              {editingEmployee ? "Simpan" : "Tambah"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteEmployee}
        title="Hapus karyawan"
        description={`Yakin ingin menghapus ${employeeToDelete?.name}? Aksi ini tidak bisa dibatalkan.`}
        confirmLabel="Hapus"
        cancelLabel="Batal"
      />
    </Layout>
  );
}
