import { useMemo } from 'react'
import useFetch from './useFetch.js'
import { getProductsByCategory } from '../services/productService.js'

// Produk lain dari kategori yang sama (tanpa produk yang sedang dibuka).
export default function useRelatedProducts(category, currentId, count = 4) {
  const { data } = useFetch(`related:${category}`, (signal) => getProductsByCategory(category, { signal }))
  return useMemo(() => (data ?? []).filter((product) => product.id !== currentId).slice(0, count), [data, currentId, count])
}
