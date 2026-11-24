import { AlertTriangle, RotateCw } from 'lucide-react'

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state-box state-box--error" role="alert">
      <AlertTriangle size={32} aria-hidden="true" />
      <h2>Data gagal dimuat</h2>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn btn--primary" onClick={onRetry}>
          <RotateCw size={16} aria-hidden="true" /> Coba lagi
        </button>
      )}
    </div>
  )
}
