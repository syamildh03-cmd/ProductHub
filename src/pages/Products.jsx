import { useSearchParams } from 'react-router-dom'
import { FilterX } from 'lucide-react'
import useProducts from '../hooks/useProducts.js'
import useCategories from '../hooks/useCategories.js'
import { parsePage } from '../utils/productQuery.js'
import SearchBar from '../components/SearchBar.jsx'
import FilterDropdown from '../components/FilterDropdown.jsx'
import SortDropdown from '../components/SortDropdown.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import Pagination from '../components/Pagination.jsx'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function Products() {
  // URL state: /products?search=phone&category=smartphones&sort=price-asc&page=2
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const category = searchParams.get('category') ?? ''
  const sort = searchParams.get('sort') ?? ''
  const page = parsePage(searchParams.get('page'))

  const { products, total, totalPages, currentPage, loading, error, retry } = useProducts({ search, category, sort, page })
  const { categories } = useCategories()

  const hasActiveFilter = Boolean(search || category || sort)

  // Ubah satu/lebih parameter; kosong berarti dihapus. Selain `page`, perubahan mengembalikan ke halaman 1.
  const updateParams = (changes, { replace = false } = {}) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)))
    if (!('page' in changes)) next.delete('page')
    setSearchParams(next, { replace })
  }

  const resetFilters = () => setSearchParams({})
  const changePage = (nextPage) => {
    updateParams({ page: nextPage > 1 ? String(nextPage) : '' })
    window.scrollTo({ top: 0 })
  }

  const resetButton = (
    <button type="button" className="btn" onClick={resetFilters}>
      <FilterX size={16} aria-hidden="true" /> Reset filter
    </button>
  )

  return (
    <section className="container page">
      <header className="page__header">
        <h1>Katalog produk</h1>
        <p className="muted" aria-live="polite">
          {loading ? 'Memuat produk…' : `${total} produk ditemukan`}
        </p>
      </header>

      <div className="toolbar">
        <SearchBar value={search} onChange={(value) => updateParams({ search: value }, { replace: true })} />
        <FilterDropdown categories={categories} value={category} onChange={(value) => updateParams({ category: value })} />
        <SortDropdown value={sort} onChange={(value) => updateParams({ sort: value })} />
        {hasActiveFilter && resetButton}
      </div>

      {loading && <Loading label="Memuat produk…" />}
      {!loading && error && <ErrorMessage message={error} onRetry={retry} />}
      {!loading && !error && products.length === 0 && (
        <EmptyState title="Produk tidak ditemukan" description="Coba kata kunci lain atau ubah kategori.">
          {hasActiveFilter && resetButton}
        </EmptyState>
      )}
      {!loading && !error && products.length > 0 && (
        <>
          <ProductGrid products={products} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
        </>
      )}
    </section>
  )
}
