// Fungsi murni untuk search, sort, dan pagination (mudah diuji).
export const PAGE_SIZE = 12

export const SORT_OPTIONS = [
  { value: '', label: 'Urutan bawaan' },
  { value: 'name-asc', label: 'Nama A–Z' },
  { value: 'name-desc', label: 'Nama Z–A' },
  { value: 'price-asc', label: 'Harga terendah' },
  { value: 'price-desc', label: 'Harga tertinggi' },
]

export function filterByName(products, search) {
  const keyword = search.trim().toLowerCase()
  if (!keyword) return products
  return products.filter((product) => product.title.toLowerCase().includes(keyword))
}

export function sortProducts(products, sort) {
  const sorters = {
    'name-asc': (a, b) => a.title.localeCompare(b.title),
    'name-desc': (a, b) => b.title.localeCompare(a.title),
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
  }
  const sorter = sorters[sort]
  return sorter ? [...products].sort(sorter) : products
}

export function parsePage(value) {
  const page = Number.parseInt(value, 10)
  return Number.isNaN(page) || page < 1 ? 1 : page
}

export function paginate(items, page, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const currentPage = Math.min(parsePage(page), totalPages)
  const start = (currentPage - 1) * pageSize
  return { items: items.slice(start, start + pageSize), totalPages, currentPage }
}

// Daftar nomor halaman untuk Pagination, mis. [1, '…', 4, 5, 6, '…', 20].
export function getPageItems(currentPage, totalPages) {
  const pages = [...new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1])]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b)
  return pages.flatMap((page, index) =>
    index > 0 && page - pages[index - 1] > 1 ? ['…', page] : [page],
  )
}

export function topRated(products, count) {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, count)
}

export function topDiscounted(products, count, excludeIds = []) {
  return products
    .filter((product) => !excludeIds.includes(product.id))
    .sort((a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0))
    .slice(0, count)
}
