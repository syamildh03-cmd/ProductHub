import useRelatedProducts from '../hooks/useRelatedProducts.js'
import ProductGrid from './ProductGrid.jsx'

export default function RelatedProducts({ category, currentId, backTo }) {
  const products = useRelatedProducts(category, currentId)
  if (products.length === 0) return null

  return (
    <section className="related" aria-labelledby="related-title">
      <h2 id="related-title">Produk serupa</h2>
      <ProductGrid products={products} backTo={backTo} />
    </section>
  )
}
