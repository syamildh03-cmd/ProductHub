import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getPageItems } from '../utils/productQuery.js'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <nav className="pagination" aria-label="Halaman produk">
      <button type="button" className="btn" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        <ChevronLeft size={16} aria-hidden="true" /> Sebelumnya
      </button>
      <ul>
        {getPageItems(currentPage, totalPages).map((item, index) =>
          item === '…' ? (
            <li key={`gap-${index}`} aria-hidden="true">…</li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={`btn btn--page${item === currentPage ? ' is-current' : ''}`}
                aria-current={item === currentPage ? 'page' : undefined}
                aria-label={`Halaman ${item}`}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ul>
      <button type="button" className="btn" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Berikutnya <ChevronRight size={16} aria-hidden="true" />
      </button>
    </nav>
  )
}
