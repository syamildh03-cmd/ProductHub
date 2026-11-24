import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'

// Kotak pencarian dengan draft lokal. Mengikat <input> langsung ke URL membuat
// ketikan cepat hilang (pembaruan URL router tertunda, input dikembalikan ke nilai lama).
// Draft dikirim ke URL setelah jeda singkat; perubahan URL dari luar
// (reset filter, tombol back/forward) menyinkronkan kembali kotak pencarian.
export default function SearchBar({ value, onChange, delay = 250 }) {
  const [draft, setDraft] = useState(value)
  const lastSynced = useRef(value)

  useEffect(() => {
    if (draft === lastSynced.current) return undefined
    const timer = setTimeout(() => {
      lastSynced.current = draft
      onChange(draft)
    }, delay)
    return () => clearTimeout(timer)
  }, [draft, onChange, delay])

  useEffect(() => {
    if (value !== lastSynced.current) {
      lastSynced.current = value
      setDraft(value)
    }
  }, [value])

  return (
    <div className="field field--search">
      <label htmlFor="product-search" className="sr-only">Cari produk</label>
      <Search size={18} aria-hidden="true" />
      <input
        id="product-search"
        type="search"
        placeholder="Cari nama produk"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
    </div>
  )
}
