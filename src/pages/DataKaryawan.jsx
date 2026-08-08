import { useMemo, useState } from "react";
import { Plus, Pencil, Trash2, Search, Users2 } from "lucide-react";
import Layout from "../components/layout/Layout";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import useAttendance from "../hooks/useAttendance";

export default function DataKaryawan({ onLogout }) {
  const { employees, isInitializing, isSubmitting, error, lastAction, addEmployee, updateEmployee, deleteEmployee } = useAttendance();
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeRole, setEmployeeRole] = useState("");
  const [employeePin, setEmployeePin] = useState("");
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const visibleEmployees = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return employees;
    return employees.filter((employee) => `${employee.name} ${employee.role}`.toLowerCase().includes(normalizedQuery));
  }, [employees, query]);

  const openAddModal = () => {
    setEditingEmployee(null);
    setEmployeeName("");
    setEmployeeRole("");
    setEmployeePin("");
    setIsModalOpen(true);
  };

  const openEditModal = (employee) => {
    setEditingEmployee(employee);
    setEmployeeName(employee.name);
    setEmployeeRole(employee.role);
    setEmployeePin(employee.pin);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleSaveEmployee = async (event) => {
    event.preventDefault();

    if (!employeeName.trim() || !employeeRole.trim() || !employeePin.trim()) return;

    const result = editingEmployee
      ? await updateEmployee({ id: editingEmployee.id, name: employeeName, role: employeeRole, pin: employeePin })
      : await addEmployee({ name: employeeName, role: employeeRole, pin: employeePin });

    if (result.ok) {
      closeModal();
    }
  };

  const confirmDeleteEmployee = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteEmployee = async () => {
    if (!employeeToDelete) return;
    await deleteEmployee(employeeToDelete.id);
    setEmployeeToDelete(null);
    setIsDeleteConfirmOpen(false);
  };

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        subtitle="Data karyawan"
        title="Kelola data tim absensi"
        description="Atur daftar karyawan yang bisa dipakai untuk verifikasi PIN dan pencatatan absensi."
        status="Siap dipakai"
      />

      <div className="rounded-[1.25rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow)]">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">Daftar karyawan</h3>
            <p className="mt-1 text-sm text-stone-500">Tambah, ubah, dan hapus profil karyawan dari satu tempat.</p>
          </div>
          <Button variant="secondary" onClick={openAddModal} className="inline-flex items-center gap-2">
            <Plus className="h-4 w-4" /> Tambah karyawan
          </Button>
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-[1.2fr_0.5fr]">
          <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-stone-700">Cari karyawan</label>
            <div className="flex items-center gap-3 rounded-3xl border border-stone-200 bg-white px-4 py-3">
              <Search className="h-4 w-4 text-stone-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari nama atau jabatan..."
                className="w-full border-none bg-transparent text-sm text-stone-700 outline-none"
              />
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-stone-200 bg-amber-50 p-5 shadow-sm">
            <div className="flex items-center gap-3 text-stone-600">
              <Users2 className="h-5 w-5 text-amber-600" />
              <p className="text-sm font-semibold">Total karyawan</p>
            </div>
            <p className="mt-4 text-3xl font-semibold text-stone-900">{employees.length}</p>
            <p className="mt-1 text-xs text-stone-500">Data siap dipakai untuk absensi harian.</p>
          </div>
        </div>

        {error ? (
          <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        {lastAction && !error ? (
          <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {lastAction.message}
          </div>
        ) : null}

        {isInitializing ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-14 animate-pulse rounded-2xl bg-stone-200" />
            ))}
          </div>
        ) : visibleEmployees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-3 font-semibold text-stone-500">ID</th>
                  <th className="px-4 py-3 font-semibold text-stone-500">Nama</th>
                  <th className="px-4 py-3 font-semibold text-stone-500">Jabatan</th>
                  <th className="px-4 py-3 font-semibold text-stone-500">PIN</th>
                  <th className="px-4 py-3 font-semibold text-stone-500">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {visibleEmployees.map((employee) => (
                  <tr key={employee.id} className="bg-white hover:bg-stone-50">
                    <td className="whitespace-nowrap px-4 py-4 text-stone-700">{employee.id}</td>
                    <td className="px-4 py-4 text-stone-700">{employee.name}</td>
                    <td className="px-4 py-4 text-stone-700">{employee.role}</td>
                    <td className="px-4 py-4 text-stone-700">{employee.pin}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Button variant="secondary" onClick={() => openEditModal(employee)} className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold">
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
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-stone-200 bg-stone-50 p-8 text-center text-sm text-stone-500">
            Belum ada data karyawan yang cocok dengan pencarian ini.
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingEmployee ? "Edit karyawan" : "Tambah karyawan"}>
        <form onSubmit={handleSaveEmployee} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-stone-700">Nama karyawan</label>
            <input
              value={employeeName}
              onChange={(event) => setEmployeeName(event.target.value)}
              className="w-full rounded-3xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              placeholder="Contoh: Ayu"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-stone-700">Jabatan</label>
            <input
              value={employeeRole}
              onChange={(event) => setEmployeeRole(event.target.value)}
              className="w-full rounded-3xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              placeholder="Contoh: Barista"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-stone-700">PIN 4 digit</label>
            <input
              value={employeePin}
              onChange={(event) => setEmployeePin(event.target.value)}
              inputMode="numeric"
              maxLength={4}
              className="w-full rounded-3xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              placeholder="1234"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={closeModal}>
              Batal
            </Button>
            <Button type="submit" loading={isSubmitting}>
              {editingEmployee ? "Simpan perubahan" : "Tambah karyawan"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        title="Hapus karyawan"
        description={`Yakin ingin menghapus ${employeeToDelete?.name || "karyawan ini"}? Tindakan ini tidak bisa dibatalkan.`}
        confirmLabel="Hapus"
        onConfirm={handleDeleteEmployee}
      />
    </Layout>
  );
}
