import { Link } from 'react-router-dom'
import { ArrowLeft, Heart, Star } from 'lucide-react'
import useWishlist from '../hooks/useWishlist.js'
import ProductGallery from './ProductGallery.jsx'
import { formatCurrency } from '../utils/formatCurrency.js'

function getStockLabel(stock) {
  if (stock <= 0) return 'Stok habis'
  if (stock < 10) return `Stok menipis (${stock} tersisa)`
  return `Stok tersedia (${stock})`
}

export default function ProductDetailView({ product, backTo }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const saved = isInWishlist(product.id)
  const discount = Math.round(product.discountPercentage ?? 0)
  const images = product.images?.length ? product.images : [product.thumbnail]

  return (
    <article className="detail">
      <Link to={backTo} className="back-link">
        <ArrowLeft size={16} aria-hidden="true" /> Kembali ke katalog
      </Link>

      <div className="detail__layout">
        <ProductGallery images={images} title={product.title} />

        <div className="detail__info">
          <p className="muted">{product.brand ? `${product.brand} · ` : ''}{product.category}</p>
          <h1>{product.title}</h1>
          <p className="rating rating--lg">
            <Star size={16} aria-hidden="true" /> {product.rating.toFixed(1)} rating
          </p>

          <p className="detail__price">
            <span className="price">{formatCurrency(product.price)}</span>
            {discount >= 1 && <span className="tag tag--dark">Diskon {discount}%</span>}
          </p>

          <p className="detail__desc">{product.description}</p>

          <dl className="detail__facts">
            <div><dt>Kategori</dt><dd>{product.category}</dd></div>
            <div><dt>Brand</dt><dd>{product.brand ?? '—'}</dd></div>
            <div><dt>Stok</dt><dd>{getStockLabel(product.stock)}</dd></div>
            <div><dt>Diskon</dt><dd>{discount >= 1 ? `${discount}%` : 'Tidak ada'}</dd></div>
          </dl>

          <button
            type="button"
            className={`btn ${saved ? '' : 'btn--primary'}`}
            aria-pressed={saved}
            onClick={() => (saved ? removeFromWishlist(product.id) : addToWishlist(product))}
          >
            <Heart size={16} fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
            {saved ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
          </button>
        </div>
      </div>
    </article>
  )
}
