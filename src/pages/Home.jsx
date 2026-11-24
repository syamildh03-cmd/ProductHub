import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import useCatalogSummary from '../hooks/useCatalogSummary.js'
import useCategories from '../hooks/useCategories.js'
import useWishlist from '../hooks/useWishlist.js'
import ProductGrid from '../components/ProductGrid.jsx'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 11) return 'Selamat pagi'
  if (hour < 15) return 'Selamat siang'
  if (hour < 19) return 'Selamat sore'
  return 'Selamat malam'
}

export default function Home() {
  const [greeting] = useState(getGreeting)
  const { totalProducts, featured, loading, error, retry } = useCatalogSummary(4)
  const { categories } = useCategories()
  const { count: wishlistCount } = useWishlist()

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <p className="hero__greeting">{greeting}, selamat datang di ProductHub</p>
          <h1>Cari produk yang pas, simpan yang paling Anda suka.</h1>
          <p className="hero__lead">
            Jelajahi katalog produk, saring berdasarkan kategori, urutkan sesuai harga, dan kumpulkan favorit Anda dalam satu tempat.
          </p>
          <Link to="/products" className="btn btn--primary btn--lg">
            Buka katalog <ArrowRight size={18} aria-hidden="true" />
          </Link>

          <dl className="stats">
            <div><dt>Produk</dt><dd>{loading ? '…' : totalProducts}</dd></div>
            <div><dt>Kategori</dt><dd>{categories.length || '…'}</dd></div>
            <div><dt>Wishlist Anda</dt><dd>{wishlistCount}</dd></div>
          </dl>
        </div>
      </section>

      <section className="container section" aria-labelledby="featured-title">
        <header className="section__header">
          <h2 id="featured-title">Produk unggulan</h2>
          <Link to="/products" className="text-link">Lihat semua</Link>
        </header>
        {loading && <Loading label="Memuat produk unggulan…" />}
        {!loading && error && <ErrorMessage message={error} onRetry={retry} />}
        {!loading && !error && <ProductGrid products={featured} />}
      </section>

      {categories.length > 0 && (
        <section className="container section" aria-labelledby="category-title">
          <header className="section__header">
            <h2 id="category-title">Telusuri kategori</h2>
          </header>
          <ul className="chips">
            {categories.slice(0, 12).map((category) => (
              <li key={category.slug}>
                <Link to={`/products?category=${encodeURIComponent(category.slug)}`} className="chip">
                  {category.name}
                </Link>
              </li>
            ))}
            <li><Link to="/products" className="chip chip--more">Semua kategori</Link></li>
          </ul>
        </section>
      )}
    </>
  )
}
