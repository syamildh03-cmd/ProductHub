import { useEffect, useState } from 'react'

// Hook generik untuk server state: data, loading, error, dan retry.
// `requestKey` mengidentifikasi permintaan; saat berubah, request baru dikirim
// dan request lama dibatalkan dengan AbortController.
export default function useFetch(requestKey, fetcher) {
  const [retryCount, setRetryCount] = useState(0)
  const [result, setResult] = useState({ key: null, data: null, error: null })
  const fullKey = `${requestKey}#${retryCount}`

  useEffect(() => {
    const controller = new AbortController()

    fetcher(controller.signal)
      .then((data) => setResult({ key: fullKey, data, error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return
        setResult({ key: fullKey, data: null, error: error.message })
      })

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullKey])

  const loading = result.key !== fullKey
  return {
    data: loading ? null : result.data,
    error: loading ? null : result.error,
    loading,
    retry: () => setRetryCount((count) => count + 1),
  }
}
