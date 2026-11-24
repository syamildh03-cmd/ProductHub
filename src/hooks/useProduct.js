import useFetch from './useFetch.js'
import { getProductById } from '../services/productService.js'

export default function useProduct(id) {
  const { data, loading, error, retry } = useFetch(`product:${id}`, (signal) =>
    getProductById(id, { signal }),
  )
  return { product: data, loading, error, retry }
}
