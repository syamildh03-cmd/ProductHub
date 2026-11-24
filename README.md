# ProductHub — Smart Product Catalog

Aplikasi katalog produk berbasis **React** untuk menjelajahi produk, mencari, menyaring berdasarkan kategori, mengurutkan, melihat detail, menyimpan favorit (wishlist), dan menulis catatan produk.

Tugas individu mata kuliah Pemrograman Web — materi: React Routing, State Management, Data Fetching, dan Application Architecture.

## 1. Tujuan
Menerapkan konsep React modern dalam satu aplikasi utuh: routing sisi klien, lima jenis state, pengambilan data dari API publik, custom hooks, dan arsitektur yang memisahkan UI, logika, dan layanan API.

## 2. Teknologi
React 19 · Vite · JavaScript (JSX) · React Router DOM 7 · Context API · Fetch API · CSS3 · Lucide React · Git/GitHub · Vercel.
Tanpa backend dan tanpa database; wishlist dan catatan disimpan di `localStorage`.

## 3. Fitur
- **Beranda** (`/`): sapaan sesuai jam, statistik (jumlah produk, kategori, wishlist), 4 produk dengan rating tertinggi, daftar kategori.
- **Katalog** (`/products`): search nama, filter kategori, sorting (nama/harga), pagination 12 produk per halaman, tombol reset filter, state loading/error/kosong. Semua kondisi disimpan di URL.
- **Detail** (`/products/:id`): galeri foto, harga, deskripsi, kategori, rating, brand, stok, diskon, tombol wishlist, tombol kembali (mempertahankan filter terakhir).
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
- `useProducts`, `useProduct`, `useCategories`, `useCatalogSummary` — hook data berbasis `useFetch`.
- `useLocalStorage` — `useState` yang tersinkron dengan `localStorage` (aman bila storage diblokir).
- `useNotes`, `useWishlist` — akses data catatan dan konsumsi context.

## 8. Context API
`WishlistProvider` (`src/context/WishlistContext.jsx`) membungkus aplikasi dan menyediakan `items`, `count`, `addToWishlist`, `removeFromWishlist`, `isInWishlist`. Data divalidasi saat dibaca dari `localStorage` sehingga data rusak tidak membuat aplikasi error. Dipakai oleh Navbar (badge), ProductCard, ProductDetailView, Home, dan Wishlist.

## 9. Struktur Folder
```
src/
├── components/   Navbar, Footer, ProductCard, ProductGrid, ProductGallery, ProductDetailView,
│                 SearchBar, SelectField, FilterDropdown, SortDropdown, Pagination,
│                 Loading, ErrorMessage, EmptyState, NoteForm, NoteList
├── layouts/      MainLayout.jsx
├── pages/        Home, Products, ProductDetail, Wishlist, ProductNotes, NotFound
├── context/      WishlistContext.jsx, wishlistContextValue.js
├── hooks/        useFetch, useProducts, useProduct, useCategories, useCatalogSummary,
│                 useLocalStorage, useNotes, useWishlist
├── services/     productService.js
├── utils/        formatCurrency, productQuery, wishlist, notes
├── App.jsx · main.jsx · index.css
```

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
Pengembangan disertai pengujian otomatis di jsdom dengan API tiruan (alur search/filter/sort/pagination via URL, wishlist, detail, form validasi, localStorage, error + retry, 404, menu mobile) dan `npm run lint` + `npm run build` tanpa error. Sebelum dikumpulkan, lakukan cek manual di browser dengan internet:
- [ ] `/products` memuat produk asli dari DummyJSON; coba search, kategori, sort, halaman 2.
- [ ] Salin URL dengan parameter, buka di tab baru → kondisi sama.
- [ ] Tambah wishlist → refresh → data tetap ada; badge navbar sesuai.
- [ ] Buka `/products/5` langsung dan refresh (di Vercel tidak 404).
- [ ] Matikan internet → muncul pesan error; nyalakan lagi → "Coba lagi".
- [ ] Cek tampilan di lebar HP (±375px) dan tablet.

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
