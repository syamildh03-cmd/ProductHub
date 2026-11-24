import useFetch from './useFetch.js'
import { getCategories } from '../services/productService.js'

export default function useCategories() {
  const { data, loading, error } = useFetch('categories', (signal) => getCategories({ signal }))
  return { categories: data ?? [], loading, error }
}
