import { createContext, useCallback, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'
import {
  WISHLIST_STORAGE_KEY,
  addItem,
  removeItem,
  hasItem,
  isValidWishlist,
} from '../utils/wishlist.js'

export const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [stored, setStored] = useLocalStorage(WISHLIST_STORAGE_KEY, [])
  // Data localStorage bisa rusak/diubah manual, jadi divalidasi dulu.
  const items = useMemo(() => (isValidWishlist(stored) ? stored : []), [stored])

  const addToWishlist = useCallback(
    (product) => setStored((current) => addItem(isValidWishlist(current) ? current : [], product)),
    [setStored],
  )
  const removeFromWishlist = useCallback(
    (id) => setStored((current) => removeItem(isValidWishlist(current) ? current : [], id)),
    [setStored],
  )
  const isInWishlist = useCallback((id) => hasItem(items, id), [items])

  const value = useMemo(
    () => ({ items, count: items.length, addToWishlist, removeFromWishlist, isInWishlist }),
    [items, addToWishlist, removeFromWishlist, isInWishlist],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
