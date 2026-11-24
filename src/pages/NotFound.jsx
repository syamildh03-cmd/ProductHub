import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container page not-found">
      <h1>Halaman tidak ditemukan</h1>
      <p>Alamat yang Anda buka tidak ada atau sudah dipindahkan.</p>
      <Link to="/" className="btn btn--primary">Kembali ke beranda</Link>
    </section>
  )
}
