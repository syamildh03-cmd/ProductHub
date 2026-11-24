import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, backTo }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} backTo={backTo} />
      ))}
    </div>
  )
}
