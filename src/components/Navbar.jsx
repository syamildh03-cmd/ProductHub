import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Boxes, Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/products', label: 'Produk' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/notes', label: 'Catatan' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          <Boxes size={22} aria-hidden="true" />
          <span>ProductHub</span>
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav id="primary-nav" className={`navbar__links${menuOpen ? ' is-open' : ''}`} aria-label="Navigasi utama">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} onClick={closeMenu}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
