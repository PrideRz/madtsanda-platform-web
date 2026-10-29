# Local backend

Frontend ini memiliki API development lokal di `app/api/v1/[...path]/route.ts`.

Jalankan frontend dengan:

```bash
npm run dev
```

Buka `http://localhost:3000/login` dan gunakan:

- Email: `master@mtsn2kk.sch.id`
- Password: `local123456`

API ini hanya merespons ketika `NODE_ENV=development`, `LOCAL_API_ENABLED=true`, dan host request adalah `localhost`, `127.0.0.1`, atau `::1`. Popup lokal dapat dibuat, diaktifkan, dihapus, dan menyimpan gambar di `.local-data/popup-assets`; data tersebut tidak masuk Git. Endpoint konten lain masih mengembalikan data kosong.

`.env.local` diabaikan Git, jadi konfigurasi ini tidak ikut deploy ke VPS. Deployment VPS tetap harus mengatur `NEXT_PUBLIC_API_URL` sendiri sebelum build.
