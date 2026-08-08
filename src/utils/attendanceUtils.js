export function isValidPin(pin) {
  return typeof pin === 'string' && /^\d{4}$/.test(pin.trim());
}

export function summarizeAttendance(rows = []) {
  return rows.reduce(
    (summary, row) => {
      const status = (row.status || '').toLowerCase();
      if (status === 'hadir') summary.hadir += 1;
      else if (status === 'telat') summary.telat += 1;
      else if (status === 'izin') summary.izin += 1;
      summary.total += 1;
      return summary;
    },
    { hadir: 0, telat: 0, izin: 0, total: 0 }
  );
}

export function filterAttendanceEntries(rows = [], filters = {}) {
  const normalizedQuery = (filters.employee || '').trim().toLowerCase();
  const normalizedRole = (filters.role || '').trim().toLowerCase();
  const normalizedStatus = (filters.status || '').trim().toLowerCase();

  return rows.filter((row) => {
    const matchesDate =
      (!filters.startDate || row.date >= filters.startDate) &&
      (!filters.endDate || row.date <= filters.endDate);

    const matchesEmployee =
      !normalizedQuery || `${row.name} ${row.role}`.toLowerCase().includes(normalizedQuery);

    const matchesRole = !normalizedRole || row.role.toLowerCase().includes(normalizedRole);
    const matchesStatus = !normalizedStatus || normalizedStatus === 'all' || row.status.toLowerCase() === normalizedStatus;

    return matchesDate && matchesEmployee && matchesRole && matchesStatus;
  });
}
