// Slug kategori DummyJSON (mis. "mens-shirts") -> teks tampilan ("Mens Shirts").
export function formatCategory(slug = '') {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}
