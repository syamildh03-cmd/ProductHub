import { Link } from 'react-router-dom'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {CURRENT_YEAR} ProductHub. Data produk dari DummyJSON.</p>
        <nav aria-label="Navigasi footer">
          <Link to="/products">Katalog</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/notes">Catatan</Link>
        </nav>
      </div>
    </footer>
  )
}
