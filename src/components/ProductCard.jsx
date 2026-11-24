import { Link } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import useWishlist from '../hooks/useWishlist.js'
import { formatCurrency } from '../utils/formatCurrency.js'

export default function ProductCard({ product }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const saved = isInWishlist(product.id)
  const discount = Math.round(product.discountPercentage ?? 0)

  const toggleWishlist = () => (saved ? removeFromWishlist(product.id) : addToWishlist(product))

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card__link">
        <div className="product-card__media">
          <img src={product.thumbnail} alt={product.title} loading="lazy" />
          {discount >= 1 && <span className="product-card__discount">{`-${discount}%`}</span>}
        </div>
        <div className="product-card__body">
          <p className="product-card__meta">{product.brand ?? product.category}</p>
          <h3>{product.title}</h3>
          <div className="product-card__foot">
            <span className="price">{formatCurrency(product.price)}</span>
            <span className="rating">
              <Star size={14} aria-hidden="true" /> {product.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>
      <button
        type="button"
        className={`wish-btn${saved ? ' is-active' : ''}`}
        aria-pressed={saved}
        aria-label={saved ? `Hapus ${product.title} dari wishlist` : `Tambahkan ${product.title} ke wishlist`}
        onClick={toggleWishlist}
      >
        <Heart size={18} fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
      </button>
    </article>
  )
}
