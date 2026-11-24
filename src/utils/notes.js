// Logika murni Product Notes (validasi dan operasi data), mudah diuji.
export const NOTES_STORAGE_KEY = 'producthub:notes'
export const NOTE_CATEGORIES = ['Ide produk', 'Perbandingan', 'Rencana beli', 'Ulasan', 'Lainnya']
export const TITLE_MIN_LENGTH = 3
export const TITLE_MAX_LENGTH = 80

export function validateNote({ title, description, category }) {
  const errors = {}
  const trimmedTitle = title.trim()

  if (trimmedTitle.length < TITLE_MIN_LENGTH) {
    errors.title = `Judul minimal ${TITLE_MIN_LENGTH} karakter.`
  } else if (trimmedTitle.length > TITLE_MAX_LENGTH) {
    errors.title = `Judul maksimal ${TITLE_MAX_LENGTH} karakter.`
  }
  if (!description.trim()) errors.description = 'Deskripsi wajib diisi.'
  if (!NOTE_CATEGORIES.includes(category)) errors.category = 'Pilih salah satu kategori.'
  return errors
}

export function createNote({ title, description, category }, id, createdAt) {
  return { id, title: title.trim(), description: description.trim(), category, createdAt }
}

export function isValidNotes(value) {
  return (
    Array.isArray(value) &&
    value.every((note) => note && typeof note.id === 'string' && typeof note.title === 'string' && typeof note.description === 'string')
  )
}

export function removeNote(notes, id) {
  return notes.filter((note) => note.id !== id)
}
