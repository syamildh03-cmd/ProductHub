import { useContext } from 'react'
import { WishlistContext } from '../context/WishlistContext.jsx'

export default function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist harus dipakai di dalam <WishlistProvider>.')
  }
  return context
}
