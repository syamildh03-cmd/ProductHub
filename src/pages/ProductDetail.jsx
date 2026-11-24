import { useParams } from 'react-router-dom'

export default function ProductDetail() {
  const { id } = useParams()
  return (
    <section className="container page">
      <h1>Detail produk #{id}</h1>
    </section>
  )
}
