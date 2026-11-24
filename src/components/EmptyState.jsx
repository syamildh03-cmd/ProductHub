import { PackageOpen } from 'lucide-react'

export default function EmptyState({ title, description, children }) {
  return (
    <div className="state-box">
      <PackageOpen size={32} aria-hidden="true" />
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {children}
    </div>
  )
}
