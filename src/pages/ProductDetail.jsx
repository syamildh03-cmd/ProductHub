import { useLocation, useParams } from 'react-router-dom'
import useProduct from '../hooks/useProduct.js'
import ProductDetailView from '../components/ProductDetailView.jsx'
import RelatedProducts from '../components/RelatedProducts.jsx'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const location = useLocation()
  const { product, loading, error, retry } = useProduct(id)
  // Kembali ke katalog dengan filter terakhir (dikirim ProductCard lewat state).
  const backTo = location.state?.from ?? '/products'

  return (
    <section className="container page">
      {loading && <Loading label="Memuat detail produk…" />}
      {!loading && error && <ErrorMessage message={error} onRetry={retry} />}
      {!loading && !error && product && <ProductDetailView key={product.id} product={product} backTo={backTo} />}
      {!loading && !error && product && (
        <RelatedProducts category={product.category} currentId={product.id} backTo={backTo} />
      )}
    </section>
  )
}
