# ProductHub — Smart Product Catalog

Aplikasi katalog produk berbasis **React** untuk menjelajahi produk, mencari, menyaring berdasarkan kategori, mengurutkan, melihat detail, menyimpan favorit (wishlist), dan menulis catatan produk.

Tugas individu mata kuliah Pemrograman Web — materi: React Routing, State Management, Data Fetching, dan Application Architecture.

## 1. Tujuan
Menerapkan konsep React modern dalam satu aplikasi utuh: routing sisi klien, lima jenis state, pengambilan data dari API publik, custom hooks, dan arsitektur yang memisahkan UI, logika, dan layanan API.

## 2. Teknologi
React 19 · Vite · JavaScript (JSX) · React Router DOM 7 · Context API · Fetch API · CSS3 · Lucide React · Git/GitHub · Vercel.
Tanpa backend dan tanpa database; wishlist dan catatan disimpan di `localStorage`.

## 3. Fitur
- **Beranda** (`/`): sapaan sesuai jam, statistik (jumlah produk, kategori, wishlist), 4 produk dengan rating tertinggi, daftar kategori, dan rekomendasi (diskon terbesar).
- **Katalog** (`/products`): search nama, filter kategori, sorting (nama/harga), pagination 12 produk per halaman, tombol reset filter, state loading/error/kosong. Semua kondisi disimpan di URL. Kotak pencarian memakai draft lokal dan menulis ke URL setelah jeda ±250 ms, agar ketikan cepat tidak hilang.
- **Detail** (`/products/:id`): galeri foto, harga, deskripsi, kategori, rating, brand, stok, diskon, tombol wishlist, indikator stok, produk serupa (sekategori), dan tombol kembali (mempertahankan filter terakhir).
- **Wishlist** (`/wishlist`): tambah/hapus, empty state, tersimpan di `localStorage`, jumlahnya tampil di navbar.
- **Catatan produk** (`/notes`): form dengan validasi (judul min. 3 karakter, deskripsi wajib, kategori wajib), tambah dan hapus catatan, tersimpan di `localStorage`.
- Halaman 404, responsif (desktop/tablet/mobile), semantic HTML, alt text, label form, fokus keyboard terlihat, link "lewati ke konten".
- Harga ditampilkan dalam Rupiah. DummyJSON memberi harga USD, dikonversi dengan **kurs tetap 1 USD = Rp 16.000** (`src/utils/formatCurrency.js`), bukan kurs real-time.

## 4. React Router
Didefinisikan di `src/App.jsx`; `BrowserRouter` di `src/main.jsx`.

```
MainLayout (Navbar + <Outlet/> + Footer)
├── index            → Home
├── products         → Products
├── products/:id     → ProductDetail   (dynamic route, useParams)
├── wishlist         → Wishlist
├── notes            → ProductNotes
└── *                → NotFound (404)
```
Navigasi memakai `Link`/`NavLink` (tanpa reload penuh). `ProductCard` mengirim URL asal lewat `location.state` agar tombol "Kembali ke katalog" mengembalikan filter sebelumnya.

## 5. State Management
| Jenis | Implementasi | Contoh |
|---|---|---|
| Local | `useState` | menu mobile (`Navbar`), foto aktif (`ProductGallery`) |
| Global | Context API | `WishlistContext` |
| Server | `useFetch` (data, loading, error, retry) | produk, detail, kategori |
| URL | `useSearchParams` | `search`, `category`, `sort`, `page` |
| Form | controlled components + `useState` | `NoteForm` |

## 6. Data Fetching
Semua pemanggilan API ada di `src/services/productService.js`: `getProducts()`, `getProductsByCategory()`, `getProductById()`, `getCategories()`.
- Memakai `fetch`, memeriksa `response.ok`, dan `try/catch`; kegagalan jaringan, 404, error server, dan JSON rusak menghasilkan pesan berbahasa Indonesia.
- `AbortController` (di `useFetch`) membatalkan request saat parameter berubah atau komponen dilepas.
- DummyJSON tidak bisa menggabungkan search + kategori + sort dalam satu request, sehingga seluruh produk diambil sekali (`limit=0`, ±190 item) lalu search, sort, dan pagination dilakukan di sisi klien (`src/utils/productQuery.js`, fungsi murni).

## 7. Custom Hooks (`src/hooks`)
- `useFetch` — server state generik (data/loading/error/retry + abort).
- `useProducts`, `useProduct`, `useCategories`, `useCatalogSummary`, `useRelatedProducts` — hook data berbasis `useFetch`.
- `useLocalStorage` — `useState` yang tersinkron dengan `localStorage` (aman bila storage diblokir).
- `useNotes`, `useWishlist` — akses data catatan dan konsumsi context.

## 8. Context API
`WishlistProvider` (`src/context/WishlistContext.jsx`) membungkus aplikasi dan menyediakan `items`, `count`, `addToWishlist`, `removeFromWishlist`, `isInWishlist`. Data divalidasi saat dibaca dari `localStorage` sehingga data rusak tidak membuat aplikasi error. Dipakai oleh Navbar (badge), ProductCard, ProductDetailView, Home, dan Wishlist.

## 9. Struktur Folder
```
src/
├── components/
│   ├── EmptyState.jsx
│   ├── ErrorMessage.jsx
│   ├── FilterDropdown.jsx
│   ├── Footer.jsx
│   ├── Loading.jsx
│   ├── Navbar.jsx
│   ├── NoteForm.jsx
│   ├── NoteList.jsx
│   ├── Pagination.jsx
│   ├── ProductCard.jsx
│   ├── ProductDetailView.jsx  # tampilan detail (dipisah dari fetching)
│   ├── ProductGallery.jsx
│   ├── ProductGrid.jsx
│   ├── RelatedProducts.jsx  # produk serupa di halaman detail
│   ├── SearchBar.jsx  # kotak pencarian dengan draft lokal + jeda
│   ├── SelectField.jsx  # dasar bersama Filter/Sort dropdown
│   └── SortDropdown.jsx
├── layouts/
│   └── MainLayout.jsx
├── pages/
│   ├── Home.jsx
│   ├── NotFound.jsx
│   ├── ProductDetail.jsx
│   ├── ProductNotes.jsx
│   ├── Products.jsx
│   └── Wishlist.jsx
├── context/
│   ├── WishlistContext.jsx
│   └── wishlistContextValue.js
├── hooks/
│   ├── useCatalogSummary.js  # ringkasan beranda (unggulan + rekomendasi)
│   ├── useCategories.js
│   ├── useFetch.js  # server state generik
│   ├── useLocalStorage.js
│   ├── useNotes.js
│   ├── useProduct.js
│   ├── useProducts.js
│   ├── useRelatedProducts.js  # produk sekategori untuk "Produk serupa"
│   └── useWishlist.js
├── services/
│   └── productService.js
├── utils/
│   ├── formatCategory.js  # slug kategori → teks tampilan
│   ├── formatCurrency.js
│   ├── notes.js
│   ├── productQuery.js
│   └── wishlist.js
├── App.jsx            # definisi rute
├── main.jsx           # BrowserRouter + WishlistProvider
└── index.css          # design token + seluruh gaya
```

## 9b. Desain & Responsif
- **Identitas:** "modern luxury" — latar `#F7F5F0`, kartu putih, teks `#1E293B`, aksen `#A68A64`, border `#E9E4DA`. Seluruh warna, radius, dan bayangan berupa CSS variable di `:root` (`src/index.css`).
- **Tipografi:** Inter (teks) dan Instrument Serif (judul), dimuat dari Google Fonts lewat `index.html`.
- **Breakpoint:** 960px (hero dan form catatan menjadi satu kolom), 760px (navbar mobile, grid 2 kolom), 720px (detail produk satu kolom), 480px (dropdown selebar penuh).
- **Interaksi:** transisi ringan (hover kartu, zoom gambar, indikator menu aktif, menu mobile, animasi hati wishlist, fade halaman).
- **Aksesibilitas gerak:** blok `@media (prefers-reduced-motion: reduce)` mematikan seluruh animasi, transisi, dan smooth scroll.

## 10. Instalasi
Prasyarat: Node.js 20+ dan npm.
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # hasil di dist/
npm run preview   # uji build produksi
npm run lint
```
Koneksi internet diperlukan karena data diambil dari DummyJSON.

## 11. Sumber API
DummyJSON — https://dummyjson.com/products · dokumentasi: https://dummyjson.com/docs/products

## 12. Deployment
**GitHub**
```bash
git remote add origin https://github.com/<username>/producthub.git
git push -u origin main
```
**Vercel**: Add New → Project → impor repository. Preset *Vite* terdeteksi otomatis (Build `npm run build`, Output `dist`). Tidak ada environment variable yang dibutuhkan.

`vercel.json` mengarahkan semua path ke `index.html` sehingga refresh di `/products/5` tidak menghasilkan 404:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```
**Website pribadi**: tautkan ke URL Vercel, atau pasang domain kustom/subdomain di Vercel → Settings → Domains. Untuk menampilkan di dalam halaman, gunakan `<iframe src="https://<proyek>.vercel.app" loading="lazy" title="ProductHub"></iframe>`.
File `.env` sudah dikecualikan lewat `.gitignore`; proyek ini tidak memakai rahasia apa pun.

## 13. Catatan Pengujian
Pengujian dijalankan selama pengembangan di lingkungan tanpa akses ke `dummyjson.com`, sehingga **API asli belum terverifikasi oleh pengembang**; semua uji memakai data tiruan yang meniru bentuk respons DummyJSON.
- **Uji otomatis (jsdom):** service API (termasuk error 404/500/jaringan/abort), fungsi filter/sort/pagination, wishlist, validasi dan persistensi catatan, serta 10 skenario end-to-end (URL state, wishlist, detail, produk serupa, error + retry, 404, menu mobile).
- **Uji browser (Chromium headless, data tiruan):** tidak ada horizontal overflow di 375, 768, dan 1440 px pada 11 kondisi halaman; font termuat; `prefers-reduced-motion` mematikan animasi; menu mobile; alur klik nyata (search, filter, sort, pagination, wishlist bertahan setelah reload, refresh pada `/products/:id`, 404, form catatan, state error).
- `npm run lint` dan `npm run build` bersih. Skrip uji tidak disertakan dalam repository ini.

Yang **masih perlu Anda cek sendiri** dengan internet dan browser Anda:
- [ ] `/products` memuat produk asli DummyJSON; coba search, kategori, sort, halaman 2.
- [ ] Gambar produk asli tampil proporsional di kartu dan galeri detail (pengujian memakai gambar tiruan).
- [ ] Tampilan di perangkat nyata (HP dan tablet), bukan hanya emulasi lebar layar.
- [ ] Setelah deploy: buka `/products/5` langsung dan refresh (harus tidak 404 di Vercel).
- [ ] Matikan internet → pesan error muncul; nyalakan lagi → "Coba lagi".

---

## Panduan Presentasi (±3 menit)
**Pembuka.** "ProductHub adalah katalog produk berbasis React. Data diambil langsung dari API publik DummyJSON, tanpa backend sendiri."

**Routing.** "Saya memakai React Router dengan satu `MainLayout` dan `Outlet`, jadi navbar dan footer tidak dirender ulang. Ada dynamic route `/products/:id` untuk detail produk dan halaman 404 untuk alamat yang tidak dikenal. Perpindahan halaman tanpa reload penuh."

**Lima jenis state.** "Local state untuk menu mobile dan galeri foto. Global state memakai Context API untuk wishlist, sehingga navbar, kartu produk, dan halaman wishlist selalu sinkron. Server state adalah data API dengan loading, error, dan retry. URL state memakai `useSearchParams`: search, kategori, sort, dan halaman ada di URL, jadi bisa di-bookmark dan dibagikan. Form state memakai controlled component pada form catatan."

**Data fetching.** "Semua pemanggilan API dipisah di folder `services`. Setiap request memeriksa `response.ok`, menangani error jaringan, dan dibatalkan dengan AbortController saat tidak diperlukan lagi. Hook `useFetch` dipakai ulang oleh semua hook data."

**Arsitektur.** "UI ada di components dan pages, logika di hooks dan utils, akses API di services. Logika murni seperti filter, sort, dan validasi dipisah agar mudah diuji."

**Keputusan teknis (siap ditanyakan).**
- *Mengapa semua produk diambil sekaligus?* API tidak bisa menggabungkan search, kategori, dan sort, jadi digabung di klien (±190 item, ringan).
- *Mengapa harga Rupiah?* Dikonversi dari USD dengan kurs tetap sebagai asumsi.
- *Mengapa localStorage?* Tugas tidak mengizinkan backend; data hanya tersimpan di perangkat ini.

**Demo.** Cari "phone" → pilih kategori → urutkan harga → buka detail → tambah wishlist → lihat badge → refresh dan tunjukkan data tetap ada → buat catatan dengan input salah untuk menunjukkan validasi.
