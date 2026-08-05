# Hook untuk attendance

Hook ini sudah diimplementasikan di [src/hooks/useAttendance.js](../hooks/useAttendance.js) dan dipakai oleh halaman absensi serta laporan absensi. Saat ini, modul ini masih berjalan dengan data mock lokal dan simulasi loading, sehingga cocok untuk demo UI sebelum backend tersedia.

## Kondisi saat ini

- Data karyawan dan laporan absensi disimpan sebagai mock array lokal di dalam hook.
- Proses verifikasi PIN dan pencatatan absensi mensimulasikan delay agar UI terasa lebih realistis.
- Halaman absensi dan laporan absensi sudah terhubung ke hook tersebut untuk menampilkan status, jam, dan ringkasan data.

## Fungsi yang tersedia

- verifyPin({ employeeId, pin }) -> memeriksa PIN, mengembalikan status validasi, data karyawan, dan pesan.
- recordAttendance({ employeeId, type }) -> mencatat absensi masuk/pulang dan mengembalikan hasil aksi.
- refreshReport() -> memuat ulang data laporan dari state mock.

## Bentuk response saat ini

### verifyPin
```js
{
  ok: true,
  message: "PIN valid untuk Ayu.",
  employee: { id: "E001", name: "Ayu", role: "Barista", pin: "1234" },
  type: "masuk",
  time: "08:05"
}
```

### recordAttendance
```js
{
  ok: true,
  message: "Ayu tercatat masuk pukul 08:05.",
  employee: { id: "E001", name: "Ayu", role: "Barista", pin: "1234" },
  type: "masuk",
  time: "08:05"
}
```

### report
```js
[
  { id: 1, name: "Ayu", role: "Barista", status: "Hadir", time: "08:05", tone: "bg-emerald-50 text-emerald-700" }
]
```

Jika backend nanti tersedia, bagian ini dapat diubah agar hook memanggil API eksternal secara langsung.
