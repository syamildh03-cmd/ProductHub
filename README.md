# ProductHub — Smart Product Catalog

Aplikasi katalog produk berbasis **React** untuk menjelajahi produk, mencari produk, menyaring berdasarkan kategori, mengurutkan harga, melihat detail, menyimpan favorit (*wishlist*), dan membuat catatan produk.

**Jenis tugas:** Individu — Mata Kuliah Pemrograman Web  
**Materi:** React Routing, State Management, Data Fetching, dan Application Architecture.

**Repository:** https://github.com/syamildh03-cmd/ProductHub

---

## 1. Tujuan Proyek

ProductHub dikembangkan untuk menerapkan konsep React modern dalam sebuah aplikasi katalog produk. Proyek ini mencakup:

- Implementasi client-side routing menggunakan React Router.
- Penerapan lima jenis state management.
- Pengambilan data dari API publik.
- Pembuatan reusable components dan custom hooks.
- Pemisahan UI, logika aplikasi, dan layanan API.
- Penyimpanan data lokal menggunakan `localStorage`.
- Pembuatan antarmuka yang responsif dan mudah digunakan.

## 2. Teknologi yang Digunakan

| Teknologi | Kegunaan |
|---|---|
| React 19 | Library untuk membangun antarmuka |
| Vite | Development server dan build tool |
| JavaScript (JSX) | Bahasa pemrograman aplikasi |
| React Router DOM 7 | Navigasi dan routing |
| Context API | Pengelolaan global state |
| Fetch API | Mengambil data dari API |
| CSS3 | Styling dan responsive design |
| Lucide React | Ikon antarmuka |
| DummyJSON API | Sumber data produk |
| localStorage | Penyimpanan wishlist dan catatan |
| Git & GitHub | Version control dan repository |
| Vercel | Target deployment aplikasi |

**Catatan:** Aplikasi tidak menggunakan backend atau database sendiri. Wishlist dan catatan produk disimpan secara lokal pada browser melalui `localStorage`.

## 3. Fitur Aplikasi

### 3.1 Beranda (`/`)
- Menampilkan sapaan berdasarkan waktu.
- Menampilkan statistik jumlah produk, kategori, dan wishlist.
- Menampilkan empat produk dengan rating tertinggi.
- Menampilkan daftar kategori produk.
- Menampilkan rekomendasi produk berdasarkan diskon terbesar.

### 3.2 Katalog Produk (`/products`)
- Pencarian produk berdasarkan nama.
- Filter produk berdasarkan kategori.
- Pengurutan berdasarkan nama dan harga.
- Pagination sebanyak 12 produk per halaman.
- Tombol reset filter.
- Tampilan loading, error, dan empty state.
- Parameter pencarian, kategori, sorting, dan halaman tersimpan dalam URL.
- Input pencarian menggunakan draft lokal dan jeda sekitar 250 ms sebelum memperbarui URL agar pengetikan cepat tetap nyaman.

### 3.3 Detail Produk (`/products/:id`)
- Menampilkan informasi detail produk.
- Galeri gambar produk.
- Harga, deskripsi, kategori, rating, brand, stok, dan diskon.
- Tombol tambah atau hapus wishlist.
- Indikator ketersediaan stok.
- Rekomendasi produk serupa berdasarkan kategori.
- Tombol kembali ke katalog dengan mempertahankan kondisi filter sebelumnya.

### 3.4 Wishlist (`/wishlist`)
- Menambahkan produk ke daftar favorit.
- Menghapus produk dari wishlist.
- Menampilkan empty state jika belum ada produk favorit.
- Menyimpan data wishlist menggunakan `localStorage`.
- Menampilkan jumlah wishlist pada navbar.

### 3.5 Catatan Produk (`/notes`)
- Membuat catatan untuk produk.
- Validasi judul minimal tiga karakter.
- Validasi deskripsi dan kategori wajib diisi.
- Menghapus catatan.
- Menyimpan catatan menggunakan `localStorage`.

### 3.6 Fitur Tambahan
- Halaman 404 untuk alamat yang tidak ditemukan.
- Responsive design untuk desktop, tablet, dan mobile.
- Semantic HTML.
- Alt text pada gambar.
- Label pada form.
- Fokus keyboard yang terlihat.
- Link untuk melewati navigasi dan langsung menuju konten.

**Pengolahan harga:** DummyJSON menyediakan harga dalam USD. ProductHub menampilkannya dalam Rupiah menggunakan kurs tetap 1 USD = Rp16.000. Nilai ini merupakan asumsi konversi, bukan kurs real-time.

Implementasi tersedia di `src/utils/formatCurrency.js`.

## 4. React Router

Routing didefinisikan di `src/App.jsx`, sedangkan `BrowserRouter` digunakan di `src/main.jsx`.

Struktur routing:

```text
MainLayout (Navbar + Outlet + Footer)
│
├── /                  → Home
├── /products          → Products
├── /products/:id      → ProductDetail
├── /wishlist          → Wishlist
├── /notes             → ProductNotes
└── *                  → NotFound (404)
```

Penjelasan implementasi:

- `BrowserRouter` digunakan untuk mengaktifkan routing berbasis browser.
- `Routes` dan `Route` digunakan untuk mendefinisikan halaman.
- `MainLayout` menjadi layout utama aplikasi.
- `Outlet` digunakan untuk menampilkan halaman sesuai route yang aktif.
- `Link` dan `NavLink` digunakan untuk navigasi tanpa reload penuh.
- `useParams()` digunakan untuk membaca ID produk dari dynamic route `/products/:id`.
- `useSearchParams()` digunakan untuk mengelola parameter pencarian, kategori, sorting, dan pagination pada URL.

`ProductCard` juga meneruskan informasi halaman sebelumnya melalui `location.state`, sehingga pengguna dapat kembali ke katalog dengan kondisi sebelumnya.

## 5. State Management

ProductHub menerapkan lima jenis state sesuai kebutuhan aplikasi.

| Jenis State | Implementasi | Contoh |
|---|---|---|
| Local State | `useState` | Menu mobile dan foto aktif pada galeri |
| Global State | Context API | Wishlist |
| Server State | Custom hook `useFetch` | Data produk, detail, dan kategori |
| URL State | `useSearchParams` | Search, kategori, sorting, pagination |
| Form State | Controlled Components dan `useState` | Form catatan produk |

### Penjelasan

**Local State**

Digunakan untuk mengelola kondisi yang hanya dibutuhkan komponen tertentu, seperti menu mobile dan gambar aktif pada galeri produk.

**Global State**

Menggunakan Context API agar data wishlist dapat diakses oleh beberapa komponen tanpa harus meneruskan props secara berulang.

**Server State**

Mengelola data yang diperoleh dari API, termasuk kondisi loading, error, dan retry.

**URL State**

Menyimpan kondisi katalog di URL sehingga hasil pencarian dan filter dapat dipertahankan ketika halaman dimuat ulang atau URL dibagikan.

**Form State**

Menggunakan controlled components untuk mengelola input dan validasi pada form catatan produk.

## 6. Data Fetching dan API

Sumber data aplikasi menggunakan DummyJSON:

- API: https://dummyjson.com/products
- Dokumentasi: https://dummyjson.com/docs/products

Seluruh fungsi pemanggilan API dipisahkan di:

`src/services/productService.js`

Fungsi yang digunakan:

- `getProducts()`
- `getProductsByCategory()`
- `getProductById()`
- `getCategories()`

Implementasi data fetching mencakup:

- Menggunakan Fetch API.
- Memeriksa `response.ok`.
- Menangani kegagalan request menggunakan `try/catch`.
- Menampilkan pesan error dalam bahasa Indonesia.
- Menggunakan `AbortController` untuk membatalkan request ketika parameter berubah atau komponen dilepas.
- Menyediakan kondisi loading, error, dan retry.

### Pengolahan Data Katalog

DummyJSON tidak menyediakan satu request yang menggabungkan seluruh kebutuhan pencarian, kategori, sorting, dan pagination aplikasi.

Oleh karena itu, aplikasi mengambil daftar produk menggunakan `limit=0`, kemudian melakukan pencarian, filter, pengurutan, dan pagination di sisi klien.

Logika tersebut dipisahkan di:

`src/utils/productQuery.js`

Pendekatan ini digunakan karena jumlah data produk pada API relatif kecil untuk kebutuhan demonstrasi aplikasi.

## 7. Custom Hooks

Custom hooks ditempatkan di `src/hooks` untuk memisahkan logika aplikasi dari tampilan komponen.

| Custom Hook | Fungsi |
|---|---|
| `useFetch` | Mengelola server state, loading, error, retry, dan pembatalan request |
| `useProducts` | Mengambil data produk |
| `useProduct` | Mengambil detail produk berdasarkan ID |
| `useCategories` | Mengambil daftar kategori |
| `useCatalogSummary` | Mengelola data ringkasan beranda |
| `useRelatedProducts` | Mengambil produk serupa |
| `useLocalStorage` | Sinkronisasi state dengan localStorage |
| `useNotes` | Mengelola data catatan produk |
| `useWishlist` | Mengakses data wishlist dari Context API |

Penggunaan custom hooks membantu mengurangi duplikasi kode dan membuat logika lebih mudah digunakan kembali.

## 8. Context API

Global state wishlist diimplementasikan menggunakan:

`src/context/WishlistContext.jsx`

`WishlistProvider` membungkus aplikasi dan menyediakan:

- `items`
- `count`
- `addToWishlist`
- `removeFromWishlist`
- `isInWishlist`

Data wishlist disimpan menggunakan `localStorage` dan divalidasi ketika dibaca agar data yang tidak sesuai format tidak langsung menyebabkan aplikasi mengalami error.

Context ini digunakan oleh Navbar, ProductCard, ProductDetailView, Home, dan Wishlist.

## 9. Struktur Folder

```text
ProductHub/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── EmptyState.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── FilterDropdown.jsx
│   │   ├── Footer.jsx
│   │   ├── Loading.jsx
│   │   ├── Navbar.jsx
│   │   ├── NoteForm.jsx
│   │   ├── NoteList.jsx
│   │   ├── Pagination.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetailView.jsx
│   │   ├── ProductGallery.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── RelatedProducts.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SelectField.jsx
│   │   └── SortDropdown.jsx
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── ProductNotes.jsx
│   │   ├── Products.jsx
│   │   └── Wishlist.jsx
│   │
│   ├── context/
│   │   ├── WishlistContext.jsx
│   │   └── wishlistContextValue.js
│   │
│   ├── hooks/
│   │   ├── useCatalogSummary.js
│   │   ├── useCategories.js
│   │   ├── useFetch.js
│   │   ├── useLocalStorage.js
│   │   ├── useNotes.js
│   │   ├── useProduct.js
│   │   ├── useProducts.js
│   │   ├── useRelatedProducts.js
│   │   └── useWishlist.js
│   │
│   ├── services/
│   │   └── productService.js
│   │
│   ├── utils/
│   │   ├── formatCategory.js
│   │   ├── formatCurrency.js
│   │   ├── notes.js
│   │   ├── productQuery.js
│   │   └── wishlist.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vercel.json
└── vite.config.js
```

### Pemisahan Tanggung Jawab

- `components/`: komponen antarmuka yang dapat digunakan kembali.
- `layouts/`: layout utama aplikasi.
- `pages/`: halaman yang terhubung dengan routing.
- `context/`: pengelolaan global state.
- `hooks/`: logika yang dapat digunakan kembali.
- `services/`: komunikasi dengan API eksternal.
- `utils/`: fungsi pembantu dan pengolahan data.
- `App.jsx`: definisi route aplikasi.
- `main.jsx`: entry point React dan provider aplikasi.
- `index.css`: design token dan styling aplikasi.

## 10. Desain UI dan Responsive Design

ProductHub menggunakan pendekatan desain **Modern Luxury** dengan tampilan minimalis, bersih, dan elegan.

### Identitas Visual

| Elemen | Nilai |
|---|---|
| Background utama | `#F7F5F0` |
| Card | Putih |
| Teks utama | `#1E293B` |
| Aksen | `#A68A64` |
| Border | `#E9E4DA` |

### Tipografi

- Inter digunakan untuk teks utama.
- Instrument Serif digunakan untuk judul.

Font dimuat melalui Google Fonts pada `index.html`.

### Responsive Design

Breakpoint yang digunakan:

- 960px: hero dan form catatan menjadi satu kolom.
- 760px: navbar mobile dan grid produk dua kolom.
- 720px: detail produk menjadi satu kolom.
- 480px: dropdown menyesuaikan lebar layar.

### Interaksi dan Aksesibilitas

- Hover pada kartu produk.
- Zoom gambar produk.
- Indikator menu aktif.
- Navigasi mobile.
- Animasi wishlist.
- Transisi perpindahan halaman.
- Dukungan `prefers-reduced-motion` untuk mengurangi animasi dan transisi sesuai preferensi perangkat.

## 11. Instalasi dan Menjalankan Aplikasi

### Prasyarat

- Node.js versi 20 atau lebih baru.
- npm.
- Koneksi internet untuk mengambil data dari DummyJSON.

### Langkah Instalasi

Clone repository:

```bash
git clone https://github.com/syamildh03-cmd/ProductHub.git
```

Masuk ke folder proyek:

```bash
cd ProductHub
```

Instal dependensi:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka alamat:

```text
http://localhost:5173
```

### Perintah Tambahan

Build aplikasi:

```bash
npm run build
```

Menjalankan preview hasil build:

```bash
npm run preview
```

Menjalankan lint:

```bash
npm run lint
```

## 12. Pengujian Aplikasi

Pengujian dilakukan secara manual pada aplikasi yang berjalan di lingkungan lokal menggunakan browser.

### 12.1 Hasil Pengujian Manual

| No. | Skenario Pengujian | Hasil |
|---|---|---|
| 1 | Membuka halaman utama | Berhasil |
| 2 | Mengambil data dari DummyJSON | Berhasil |
| 3 | Mencari produk menggunakan kata kunci `rolex` | Berhasil |
| 4 | Memfilter kategori Beauty | Berhasil |
| 5 | Mengurutkan harga dari rendah ke tinggi dan sebaliknya | Berhasil |
| 6 | Berpindah halaman pagination | Berhasil |
| 7 | Membuka detail produk melalui dynamic route | Berhasil |
| 8 | Refresh halaman detail produk | Berhasil |
| 9 | Menambahkan produk ke wishlist | Berhasil |
| 10 | Mempertahankan wishlist setelah refresh | Berhasil |
| 11 | Validasi dan penyimpanan catatan produk | Berhasil |
| 12 | Mempertahankan catatan setelah refresh | Berhasil |
| 13 | Membuka alamat yang tidak tersedia (404) | Berhasil |
| 14 | Memeriksa tampilan responsif menggunakan emulasi perangkat browser | Berhasil |

### 12.2 Verifikasi API

Endpoint berikut dibuka secara langsung melalui browser:

https://dummyjson.com/products?limit=0

Respons JSON menampilkan daftar produk dengan nilai `total` sebanyak **194 produk pada saat pengujian tanggal 24 November 2026**.

Data API juga berhasil digunakan pada aplikasi untuk menguji pencarian, filter kategori, sorting, dan pagination.

Jumlah produk dapat berubah mengikuti data yang disediakan oleh DummyJSON.

### 12.3 Hasil Build dan Lint

**Build**

Perintah:

```bash
npm run build
```

Hasil: **Berhasil**.

Vite berhasil melakukan proses transformasi modul dan menghasilkan folder `dist/` untuk kebutuhan produksi.

**Lint**

Perintah:

```bash
npm run lint
```

Pada komputer pengembang, proses lint belum dapat diselesaikan karena Windows Application Control memblokir native binary Oxlint (`oxlint.win32-x64-msvc.node`).

Kendala tersebut merupakan pembatasan eksekusi pada lingkungan Windows, sehingga hasil lint belum dapat dinyatakan berhasil pada komputer pengembang.

### 12.4 Batasan Pengujian

- Pengujian dilakukan pada browser lokal, bukan seluruh perangkat fisik.
- Responsivitas diperiksa melalui emulasi ukuran layar browser.
- Pengujian otomatis yang pernah dilakukan dalam lingkungan pengembangan tidak disertakan sebagai skrip yang dapat dijalankan ulang di repository ini.
- Pengujian deployment Vercel dan akses langsung melalui domain publik belum dilakukan pada saat dokumentasi ini disusun.
- Pengujian pemulihan koneksi internet dan kondisi API tidak tersedia belum diklaim berhasil dalam pengujian manual.

## 13. Deployment

### 13.1 Repository GitHub

Repository proyek:

https://github.com/syamildh03-cmd/ProductHub

Branch utama:

```text
main
```

Untuk mengirim perubahan terbaru ke GitHub:

```bash
git add .
git commit -m "docs: update project documentation"
git push
```

### 13.2 Deployment ke Vercel

Aplikasi disiapkan untuk deployment menggunakan Vercel.

Langkah deployment:

1. Masuk ke Vercel.
2. Pilih **Add New → Project**.
3. Hubungkan akun GitHub.
4. Impor repository `ProductHub`.
5. Pastikan framework preset terdeteksi sebagai Vite.
6. Periksa konfigurasi build berikut:

| Pengaturan | Nilai |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

7. Klik **Deploy**.

Tidak diperlukan environment variable khusus untuk konfigurasi aplikasi saat ini.

### 13.3 Konfigurasi SPA

File `vercel.json` digunakan untuk mengarahkan permintaan route aplikasi ke `index.html`.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Konfigurasi ini diperlukan agar halaman dynamic route seperti `/products/5` tetap dapat dibuka ketika URL diakses secara langsung atau browser di-refresh.

**Status deployment:** Konfigurasi deployment sudah disiapkan. URL produksi perlu ditambahkan setelah proses deployment Vercel berhasil dilakukan dan diverifikasi.

## 14. Catatan Teknis

### Mengapa semua produk diambil sekaligus?

Karena kebutuhan pencarian, filter kategori, sorting, dan pagination diproses di sisi klien. Data diambil melalui satu request daftar produk, kemudian diolah menggunakan fungsi pada `productQuery.js`.

### Mengapa menggunakan Context API?

Wishlist digunakan oleh beberapa bagian aplikasi. Context API membantu menyediakan data tersebut secara global tanpa harus meneruskan props melalui banyak komponen.

### Mengapa menggunakan localStorage?

Aplikasi tidak menggunakan backend atau database sendiri. `localStorage` digunakan agar wishlist dan catatan tetap tersimpan pada browser setelah halaman dimuat ulang.

### Mengapa harga menggunakan Rupiah?

Agar tampilan harga lebih mudah dipahami oleh pengguna Indonesia. Konversi menggunakan asumsi kurs tetap, bukan data nilai tukar secara real-time.

---

## 15. Panduan Presentasi

Estimasi durasi: ±3 menit.

**Pembukaan**

"ProductHub merupakan aplikasi katalog produk berbasis React. Aplikasi ini mengambil data dari API publik DummyJSON dan menyediakan fitur pencarian, filter, sorting, detail produk, wishlist, serta catatan produk."

**Routing**

"Saya menggunakan React Router untuk mengelola navigasi antarhalaman. Terdapat MainLayout dengan Outlet, sehingga navbar dan footer dapat digunakan bersama. Saya juga menggunakan dynamic route `/products/:id` untuk menampilkan detail produk berdasarkan ID."

**State Management**

"Pada aplikasi ini saya menerapkan lima jenis state. Local state menggunakan useState, global state menggunakan Context API untuk wishlist, server state menggunakan custom hook useFetch, URL state menggunakan useSearchParams, dan form state menggunakan controlled components."

**Data Fetching**

"Data produk diambil dari DummyJSON menggunakan Fetch API. Pemanggilan API dipisahkan di folder services. Saya juga menerapkan loading state, error handling, retry, dan AbortController."

**Arsitektur**

"Struktur proyek dipisahkan menjadi components, pages, layouts, hooks, context, services, dan utils. Tujuannya agar kode lebih terorganisasi, mudah dipelihara, dan logika aplikasi tidak bercampur dengan tampilan."

**Demo Aplikasi**

Urutan demonstrasi yang disarankan:

1. Buka halaman beranda.
2. Masuk ke katalog produk.
3. Cari produk menggunakan kata kunci.
4. Gunakan filter kategori.
5. Ubah urutan harga.
6. Buka detail produk.
7. Tambahkan produk ke wishlist.
8. Buka halaman wishlist.
9. Refresh halaman untuk memperlihatkan persistensi data.
10. Buka halaman catatan dan tunjukkan validasi form.

---

**ProductHub — Smart Product Catalog**

Dikembangkan sebagai proyek pembelajaran React untuk menerapkan konsep routing, state management, data fetching, dan application architecture.