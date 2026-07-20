# Hooks untuk attendance

File ini memodelkan kontrak UI yang siap dipakai saat backend tersedia.

## Endpoint yang diharapkan

- GET /api/employees -> daftar karyawan
- POST /api/attendance/verify-pin -> { employeeId, pin }
- POST /api/attendance/record -> { employeeId, type }
- GET /api/attendance/report -> rekap absensi

## Response yang disarankan

### verify-pin
{
  "valid": true,
  "employee": { "id": "E001", "name": "Ayu", "role": "Barista" },
  "message": "PIN valid"
}

### record
{
  "success": true,
  "type": "masuk",
  "time": "08:05",
  "message": "Absensi tercatat"
}

### report
{
  "data": [
    { "id": 1, "name": "Ayu", "status": "Hadir", "time": "08:05" }
  ]
}
