import { useCallback, useEffect, useState } from "react";

const MOCK_EMPLOYEES = [
  { id: "E001", name: "Ayu", role: "Barista", pin: "1234" },
  { id: "E002", name: "Rizki", role: "Kasir", pin: "4321" },
  { id: "E003", name: "Nadia", role: "Cook", pin: "1111" },
  { id: "E004", name: "Doni", role: "Runner", pin: "2222" },
];

const MOCK_REPORT = [
  {
    id: 1,
    employeeId: "E001",
    name: "Ayu",
    role: "Barista",
    status: "Hadir",
    time: "08:05",
    date: "2026-07-20",
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    id: 2,
    employeeId: "E002",
    name: "Rizki",
    role: "Kasir",
    status: "Telat",
    time: "08:18",
    date: "2026-07-20",
    tone: "bg-amber-50 text-amber-700",
  },
  {
    id: 3,
    employeeId: "E003",
    name: "Nadia",
    role: "Cook",
    status: "Izin",
    time: "—",
    date: "2026-07-20",
    tone: "bg-sky-50 text-sky-700",
  },
  {
    id: 4,
    employeeId: "E004",
    name: "Doni",
    role: "Runner",
    status: "Hadir",
    time: "07:58",
    date: "2026-07-20",
    tone: "bg-emerald-50 text-emerald-700",
  },
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function useAttendance() {
  const [employees, setEmployees] = useState([]);
  const [report, setReport] = useState([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [lastAction, setLastAction] = useState(null);

  const loadInitialData = useCallback(async () => {
    setIsInitializing(true);
    setError(null);
    await wait(700);
    setEmployees(MOCK_EMPLOYEES);
    setReport(MOCK_REPORT);
    setIsInitializing(false);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => loadInitialData(), 0);
    return () => clearTimeout(t);
  }, [loadInitialData]);

  const verifyPin = useCallback(
    async ({ employeeId, pin }) => {
      setIsSubmitting(true);
      setError(null);
      setLastAction(null);

      await wait(900);

      const employee = employees.find((item) => item.id === employeeId);

      if (!employee) {
        setIsSubmitting(false);
        setError("Karyawan tidak ditemukan.");
        return { ok: false, message: "Karyawan tidak ditemukan.", employee: null };
      }

      if (employee.pin !== String(pin)) {
        setIsSubmitting(false);
        setError("PIN tidak valid. Silakan cek kembali.");
        return { ok: false, message: "PIN tidak valid. Silakan cek kembali.", employee: null };
      }

      const result = {
        ok: true,
        message: `PIN valid untuk ${employee.name}.`,
        employee,
        type: "masuk",
        time: "08:05",
      };

      setLastAction(result);
      setIsSubmitting(false);
      return result;
    },
    [employees]
  );

  const recordAttendance = useCallback(
    async ({ employeeId, type = "masuk" }) => {
      setIsSubmitting(true);
      setError(null);

      await wait(800);

      const employee = employees.find((item) => item.id === employeeId);

      if (!employee) {
        setIsSubmitting(false);
        setError("Karyawan tidak ditemukan.");
        return { ok: false, message: "Karyawan tidak ditemukan.", employee: null };
      }

      const now = new Date();
      const timeLabel = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const date = now.toISOString().slice(0, 10);

      const status =
        type === "masuk"
          ? timeLabel > "08:00"
            ? "Telat"
            : "Hadir"
          : "Pulang";
      const tone =
        status === "Hadir"
          ? "bg-emerald-50 text-emerald-700"
          : status === "Telat"
          ? "bg-amber-50 text-amber-700"
          : "bg-slate-50 text-slate-700";

      const newReportItem = {
        id: Date.now(),
        employeeId,
        name: employee.name,
        role: employee.role,
        status,
        time: timeLabel,
        date,
        tone,
      };

      setReport((current) => {
        const existingIndex = current.findIndex((item) => item.employeeId === employeeId && item.date === date);
        if (existingIndex >= 0) {
          return current.map((item) =>
            item.employeeId === employeeId && item.date === date ? { ...item, ...newReportItem } : item
          );
        }
        return [newReportItem, ...current];
      });

      const result = {
        ok: true,
        message: `${employee.name} tercatat ${type === "masuk" ? "masuk" : "pulang"} pukul ${timeLabel}.`,
        employee,
        type,
        time: timeLabel,
      };

      setLastAction(result);
      setIsSubmitting(false);
      return result;
    },
    [employees]
  );

  const addEmployee = useCallback(async ({ name, role, pin }) => {
    setIsSubmitting(true);
    setError(null);
    setLastAction(null);

    await wait(600);

    if (!name || !role || !pin) {
      setIsSubmitting(false);
      setError("Lengkapi semua data karyawan.");
      return { ok: false, message: "Lengkapi semua data karyawan." };
    }

    const newEmployee = {
      id: `E${String(Date.now()).slice(-4)}`,
      name: name.trim(),
      role: role.trim(),
      pin: String(pin).trim(),
    };

    setEmployees((current) => [...current, newEmployee]);
    const result = {
      ok: true,
      message: `Karyawan ${newEmployee.name} berhasil ditambahkan.`,
      employee: newEmployee,
      type: "karyawan",
    };

    setLastAction(result);
    setIsSubmitting(false);
    return result;
  }, []);

  const updateEmployee = useCallback(async ({ id, name, role, pin }) => {
    setIsSubmitting(true);
    setError(null);
    setLastAction(null);

    await wait(600);

    if (!id || !name || !role || !pin) {
      setIsSubmitting(false);
      setError("Lengkapi semua data karyawan.");
      return { ok: false, message: "Lengkapi semua data karyawan." };
    }

    const updatedEmployee = {
      id,
      name: name.trim(),
      role: role.trim(),
      pin: String(pin).trim(),
    };

    setEmployees((current) => current.map((employee) => (employee.id === id ? updatedEmployee : employee)));

    const result = {
      ok: true,
      message: `Data karyawan ${updatedEmployee.name} berhasil diperbarui.`,
      employee: updatedEmployee,
      type: "karyawan",
    };

    setLastAction(result);
    setIsSubmitting(false);
    return result;
  }, []);

  const deleteEmployee = useCallback(async (employeeId) => {
    setIsSubmitting(true);
    setError(null);
    setLastAction(null);

    await wait(600);

    const employee = employees.find((item) => item.id === employeeId);
    if (!employee) {
      setIsSubmitting(false);
      setError("Karyawan tidak ditemukan.");
      return { ok: false, message: "Karyawan tidak ditemukan." };
    }

    setEmployees((current) => current.filter((item) => item.id !== employeeId));

    const result = {
      ok: true,
      message: `Karyawan ${employee.name} berhasil dihapus.`,
      employee,
      type: "karyawan",
    };

    setLastAction(result);
    setIsSubmitting(false);
    return result;
  }, [employees]);

  const refreshReport = useCallback(async () => {
    setIsInitializing(true);
    setError(null);
    await wait(600);
    setReport(MOCK_REPORT);
    setIsInitializing(false);
  }, []);

  return {
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
    refreshReport,
  };
}
