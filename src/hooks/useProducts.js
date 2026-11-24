import { useMemo } from 'react'
import useFetch from './useFetch.js'
import { getProducts, getProductsByCategory } from '../services/productService.js'
import { filterByName, sortProducts, paginate } from '../utils/productQuery.js'

// Mengambil produk (opsional per kategori), lalu menerapkan search, sort,
// dan pagination dari nilai yang berasal dari URL query.
export default function useProducts({ search = '', category = '', sort = '', page = 1 } = {}) {
  const { data, loading, error, retry } = useFetch(
    `products:${category || 'all'}`,
    (signal) => (category ? getProductsByCategory(category, { signal }) : getProducts({ signal })),
  )

  const view = useMemo(() => {
    const filtered = sortProducts(filterByName(data ?? [], search), sort)
    return { total: filtered.length, ...paginate(filtered, page) }
  }, [data, search, sort, page])

  return {
    products: view.items,
    total: view.total,
    totalPages: view.totalPages,
    currentPage: view.currentPage,
    loading,
    error,
    retry,
  }
}
