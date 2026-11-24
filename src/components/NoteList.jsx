import { Trash2 } from 'lucide-react'
import EmptyState from './EmptyState.jsx'

const dateFormat = new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' })

export default function NoteList({ notes, onRemove }) {
  if (notes.length === 0) {
    return <EmptyState title="Belum ada catatan" description="Tulis catatan pertama Anda lewat formulir." />
  }

  return (
    <ul className="note-list">
      {notes.map((note) => (
        <li key={note.id} className="note-card">
          <div className="note-card__head">
            <h3>{note.title}</h3>
            <button
              type="button"
              className="icon-btn"
              aria-label={`Hapus catatan ${note.title}`}
              onClick={() => onRemove(note.id)}
            >
              <Trash2 size={16} aria-hidden="true" />
            </button>
          </div>
          <p className="note-card__meta">
            <span className="tag tag--light">{note.category}</span>
            {note.createdAt && <time dateTime={note.createdAt}>{dateFormat.format(new Date(note.createdAt))}</time>}
          </p>
          <p className="note-card__body">{note.description}</p>
        </li>
      ))}
    </ul>
  )
}
