import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container page not-found">
      <p className="not-found__code" aria-hidden="true">404</p>
      <h1>Halaman tidak ditemukan</h1>
      <p className="muted">Alamat yang Anda buka tidak ada atau sudah dipindahkan.</p>
      <div className="not-found__actions">
        <Link to="/" className="btn btn--primary">Kembali ke beranda</Link>
        <Link to="/products" className="btn">Buka katalog</Link>
      </div>
    </section>
  )
}
