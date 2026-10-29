# Staging `pre-post.mtsn2kk.sch.id`

Frontend ini mengambil data melalui API (`NEXT_PUBLIC_API_URL`). Backend dan database tidak ada di repositori ini, jadi menambahkan subdomain saja belum membuat salinan data yang terisolasi.

## Konfigurasi aplikasi

Deploy repositori ini sebagai layanan Next.js terpisah dari web utama, lalu set environment berikut **sebelum build**:

```env
NEXT_PUBLIC_IS_STAGING=true
NEXT_PUBLIC_BASE_URL=https://pre-post.mtsn2kk.sch.id
NEXT_PUBLIC_API_URL=https://<host-api-staging>/api/v1
```

Contoh variabel tersedia di [`env.staging.example`](../env.staging.example). Ganti alamat API dengan URL backend staging yang benar. `NEXT_PUBLIC_` berarti URL tersebut memang terlihat oleh browser. Setelah mengubah variabel, build dan deploy ulang.

Saat `NEXT_PUBLIC_IS_STAGING=true`, metadata meminta mesin pencari tidak mengindeks situs, `robots.txt` memblokir crawler, dan sitemap staging kosong.

## Isolasi backend dan database

1. Buat deployment backend staging yang terpisah dan arahkan domain API staging ke layanan itu.
2. Buat backup database produksi, lalu restore ke **database baru**. Jangan gunakan replikasi dua arah atau koneksi langsung staging ke database produksi.
3. Atur kredensial backend staging agar hanya menunjuk database hasil restore tersebut. Semua operasi tulis dari frontend staging akan diteruskan ke API ini.
4. Pisahkan storage unggahan dan gunakan sandbox untuk email atau integrasi eksternal yang bisa mengirim pesan atau mengubah data.
5. Atur DNS `pre-post.mtsn2kk.sch.id` ke layanan frontend staging dan aktifkan HTTPS. Izinkan origin subdomain tersebut di CORS backend staging.

Database clone adalah snapshot pada waktu backup; perubahan setelahnya tidak otomatis tersinkron dengan produksi. Karena snapshot berisi data asli, batasi akses staging kepada petugas yang perlu mengujinya.

## Sebelum menguji

- Pastikan `NEXT_PUBLIC_API_URL` menuju backend staging, bukan backend produksi.
- Pastikan konfigurasi koneksi backend staging menuju database hasil restore dan akun database produksi tidak dipakai.
- Pastikan host frontend, API, serta storage staging sudah menggunakan konfigurasi terpisah sebelum menguji perubahan yang menulis data atau mengunggah berkas.
