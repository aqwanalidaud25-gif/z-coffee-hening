import { describe, expect, it } from 'vitest';
import { filterAttendanceEntries, isValidPin, summarizeAttendance } from './attendanceUtils';

describe('attendanceUtils', () => {
  it('validates a 4-digit PIN', () => {
    expect(isValidPin('1234')).toBe(true);
    expect(isValidPin('12')).toBe(false);
    expect(isValidPin('abcd')).toBe(false);
  });

  it('filters attendance entries by date range, role, and status', () => {
    const rows = [
      { id: 1, name: 'Ayu', role: 'Barista', status: 'Hadir', date: '2026-08-08', clockIn: '08:05', clockOut: '16:00', reason: '—' },
      { id: 2, name: 'Rizki', role: 'Kasir', status: 'Telat', date: '2026-08-08', clockIn: '08:20', clockOut: '16:30', reason: 'acara keluarga' },
      { id: 3, name: 'Nadia', role: 'Cook', status: 'Izin', date: '2026-08-09', clockIn: '—', clockOut: '—', reason: 'Sakit' },
    ];

    const result = filterAttendanceEntries(rows, {
      startDate: '2026-08-08',
      endDate: '2026-08-08',
      employee: 'Ayu',
      role: 'Barista',
      status: 'hadir',
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Ayu');
  });

  it('summarizes attendance counts correctly', () => {
    const summary = summarizeAttendance([
      { status: 'Hadir' },
      { status: 'Telat' },
      { status: 'Izin' },
      { status: 'Hadir' },
    ]);

    expect(summary).toEqual({ hadir: 2, telat: 1, izin: 1, total: 4 });
  });
});
