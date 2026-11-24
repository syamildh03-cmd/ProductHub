import { useCallback, useMemo } from 'react'
import useLocalStorage from './useLocalStorage.js'
import { NOTES_STORAGE_KEY, createNote, isValidNotes, removeNote } from '../utils/notes.js'

export default function useNotes() {
  const [stored, setStored] = useLocalStorage(NOTES_STORAGE_KEY, [])
  const notes = useMemo(() => (isValidNotes(stored) ? stored : []), [stored])

  const addNote = useCallback(
    (values) => {
      const id = globalThis.crypto?.randomUUID?.() ?? `note-${Date.now()}`
      const note = createNote(values, id, new Date().toISOString())
      setStored((current) => [note, ...(isValidNotes(current) ? current : [])]) // terbaru di atas
    },
    [setStored],
  )

  const deleteNote = useCallback(
    (id) => setStored((current) => removeNote(isValidNotes(current) ? current : [], id)),
    [setStored],
  )

  return { notes, addNote, deleteNote }
}
