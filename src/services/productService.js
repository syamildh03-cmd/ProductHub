// Seluruh pemanggilan API DummyJSON dipusatkan di sini.
const BASE_URL = 'https://dummyjson.com'
const LIST_FIELDS = 'id,title,description,category,price,discountPercentage,rating,stock,brand,thumbnail'

async function request(path, { signal } = {}) {
  let response
  try {
    response = await fetch(`${BASE_URL}${path}`, { signal })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.')
  }

  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? 'Data yang diminta tidak ditemukan.'
        : `Server mengembalikan kesalahan (${response.status}). Coba lagi nanti.`,
    )
  }

  try {
    return await response.json()
  } catch {
    throw new Error('Respons server tidak dapat dibaca.')
  }
}

// limit=0 meminta seluruh produk, sehingga search, sort, dan pagination
// bisa digabung di sisi klien (API tidak mendukung kombinasi semuanya).
export async function getProducts({ signal } = {}) {
  const data = await request(`/products?limit=0&select=${LIST_FIELDS}`, { signal })
  return data.products
}

export async function getProductsByCategory(category, { signal } = {}) {
  const data = await request(
    `/products/category/${encodeURIComponent(category)}?limit=0&select=${LIST_FIELDS}`,
    { signal },
  )
  return data.products
}

export async function getProductById(id, { signal } = {}) {
  return request(`/products/${encodeURIComponent(id)}`, { signal })
}

export async function getCategories({ signal } = {}) {
  return request('/products/categories', { signal }) // [{ slug, name, url }]
}
