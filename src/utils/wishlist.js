// Logika murni wishlist (tanpa React) agar mudah diuji.
export const WISHLIST_STORAGE_KEY = 'producthub:wishlist'

// Hanya menyimpan data yang dibutuhkan kartu produk di halaman Wishlist.
export function toWishlistItem(product) {
  const { id, title, price, discountPercentage, rating, category, brand, thumbnail } = product
  return { id, title, price, discountPercentage, rating, category, brand, thumbnail }
}

export function isValidWishlist(value) {
  return Array.isArray(value) && value.every((item) => item && typeof item.id === 'number')
}

export function addItem(items, product) {
  if (items.some((item) => item.id === product.id)) return items
  return [...items, toWishlistItem(product)]
}

export function removeItem(items, id) {
  return items.filter((item) => item.id !== id)
}

export function hasItem(items, id) {
  return items.some((item) => item.id === id)
}
