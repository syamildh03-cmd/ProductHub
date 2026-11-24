import { useState } from 'react'

export default function ProductGallery({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0) // local state
  return (
    <div className="gallery">
      <div className="gallery__main">
        <img src={images[activeIndex]} alt={`${title} — foto ${activeIndex + 1}`} />
      </div>
      {images.length > 1 && (
        <ul className="gallery__thumbs">
          {images.map((src, index) => (
            <li key={src}>
              <button
                type="button"
                className={index === activeIndex ? 'is-active' : ''}
                aria-label={`Tampilkan foto ${index + 1}`}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
