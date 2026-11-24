import { Link } from 'react-router-dom'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__about">
          <p className="footer__brand">ProductHub</p>
          <p>Katalog produk pilihan: cari, bandingkan, dan simpan favorit Anda di satu tempat.</p>
        </div>
        <nav aria-label="Navigasi footer: jelajahi">
          <p className="footer__title">Jelajahi</p>
          <Link to="/">Beranda</Link>
          <Link to="/products">Katalog produk</Link>
        </nav>
        <nav aria-label="Navigasi footer: koleksi saya">
          <p className="footer__title">Koleksi saya</p>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/notes">Catatan produk</Link>
        </nav>
      </div>
      <div className="container footer__bottom">
        <p>© {CURRENT_YEAR} ProductHub</p>
        <p>Data produk dari DummyJSON</p>
      </div>
    </footer>
  )
}
