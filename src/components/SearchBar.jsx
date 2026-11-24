import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="field field--search">
      <label htmlFor="product-search" className="sr-only">Cari produk</label>
      <Search size={18} aria-hidden="true" />
      <input
        id="product-search"
        type="search"
        placeholder="Cari nama produk"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
