import { Link } from 'react-router-dom'
import useWishlist from '../hooks/useWishlist.js'
import ProductGrid from '../components/ProductGrid.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function Wishlist() {
  const { items, count } = useWishlist()

  return (
    <section className="container page">
      <header className="page__header">
        <h1>Wishlist</h1>
        <p className="muted">{count} produk tersimpan</p>
      </header>

      {count === 0 ? (
        <EmptyState title="Wishlist masih kosong" description="Tekan ikon hati pada produk untuk menyimpannya di sini.">
          <Link to="/products" className="btn btn--primary">Jelajahi katalog</Link>
        </EmptyState>
      ) : (
        <ProductGrid products={items} />
      )}
    </section>
  )
}
