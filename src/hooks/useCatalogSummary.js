import { useMemo } from 'react'
import useFetch from './useFetch.js'
import { getProducts } from '../services/productService.js'
import { topRated, topDiscounted } from '../utils/productQuery.js'

// Ringkasan katalog untuk beranda: jumlah produk dan produk unggulan.
export default function useCatalogSummary(featuredCount = 4) {
  const { data, loading, error, retry } = useFetch('products:all', (signal) => getProducts({ signal }))
  const featured = useMemo(() => topRated(data ?? [], featuredCount), [data, featuredCount])
  const deals = useMemo(() => topDiscounted(data ?? [], 4, featured.map((p) => p.id)), [data, featured])
  return { totalProducts: data?.length ?? 0, featured, deals, loading, error, retry }
}
