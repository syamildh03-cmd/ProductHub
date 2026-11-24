import { useState } from 'react'
import { Plus } from 'lucide-react'
import { NOTE_CATEGORIES, TITLE_MAX_LENGTH, validateNote } from '../utils/notes.js'

const EMPTY_VALUES = { title: '', description: '', category: '' }

export default function NoteForm({ onAdd }) {
  // Form state: controlled components
  const [values, setValues] = useState(EMPTY_VALUES)
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState('')

  // Error diturunkan dari nilai form, baru ditampilkan setelah percobaan kirim pertama.
  const errors = submitted ? validateNote(values) : {}

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setFeedback('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    if (Object.keys(validateNote(values)).length > 0) return

    onAdd(values)
    setValues(EMPTY_VALUES)
    setSubmitted(false)
    setFeedback('Catatan berhasil ditambahkan.')
  }

  const describe = (name) => (errors[name] ? `${name}-error` : undefined)

  return (
    <form className="note-form" onSubmit={handleSubmit} noValidate>
      <h2>Tambah catatan</h2>

      <div className="field">
        <label htmlFor="note-title">Judul</label>
        <input
          id="note-title"
          name="title"
          type="text"
          value={values.title}
          maxLength={TITLE_MAX_LENGTH + 20}
          onChange={handleChange}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={describe('title')}
        />
        {errors.title && <p id="title-error" className="field__error" role="alert">{errors.title}</p>}
      </div>

      <div className="field">
        <label htmlFor="note-category">Kategori</label>
        <select
          id="note-category"
          name="category"
          value={values.category}
          onChange={handleChange}
          aria-invalid={Boolean(errors.category)}
          aria-describedby={describe('category')}
        >
          <option value="">Pilih kategori</option>
          {NOTE_CATEGORIES.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {errors.category && <p id="category-error" className="field__error" role="alert">{errors.category}</p>}
      </div>

      <div className="field">
        <label htmlFor="note-description">Deskripsi</label>
        <textarea
          id="note-description"
          name="description"
          rows={4}
          value={values.description}
          onChange={handleChange}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={describe('description')}
        />
        {errors.description && <p id="description-error" className="field__error" role="alert">{errors.description}</p>}
      </div>

      <button type="submit" className="btn btn--primary">
        <Plus size={16} aria-hidden="true" /> Tambah catatan
      </button>
      <p className="note-form__status" role="status">{feedback}</p>
    </form>
  )
}
