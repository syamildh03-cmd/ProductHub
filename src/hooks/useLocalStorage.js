import { useEffect, useState } from 'react'

// useState yang tersinkron dengan localStorage (aman jika storage tidak tersedia).
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage penuh atau diblokir: aplikasi tetap berjalan tanpa persistensi.
    }
  }, [key, value])

  return [value, setValue]
}
