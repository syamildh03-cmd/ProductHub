import { useMemo } from 'react'
import useFetch from './useFetch.js'
import { getProducts } from '../services/productService.js'
import { topRated } from '../utils/productQuery.js'

// Ringkasan katalog untuk beranda: jumlah produk dan produk unggulan.
export default function useCatalogSummary(featuredCount = 4) {
  const { data, loading, error, retry } = useFetch('products:all', (signal) => getProducts({ signal }))
  const featured = useMemo(() => topRated(data ?? [], featuredCount), [data, featuredCount])
  return { totalProducts: data?.length ?? 0, featured, loading, error, retry }
}
