import useNotes from '../hooks/useNotes.js'
import NoteForm from '../components/NoteForm.jsx'
import NoteList from '../components/NoteList.jsx'

export default function ProductNotes() {
  const { notes, addNote, deleteNote } = useNotes()

  return (
    <section className="container page">
      <header className="page__header">
        <h1>Catatan produk</h1>
        <p className="muted">{notes.length} catatan tersimpan di perangkat ini</p>
      </header>

      <div className="notes-layout">
        <NoteForm onAdd={addNote} />
        <NoteList notes={notes} onRemove={deleteNote} />
      </div>
    </section>
  )
}
