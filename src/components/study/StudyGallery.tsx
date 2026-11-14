import type { StudyImage } from '../../lib/work'

/** Product screens at full page width, each with the alt text it was captured for. */
export function StudyGallery({ images }: { images: StudyImage[] }) {
  if (!images.length) return null

  return (
    <section className="study-gallery-block">
      <h2>Screens</h2>
      <div className="study-gallery">
        {images.map((image) => (
          <figure key={image.src} className={image.src.endsWith('/m.webp') ? 'is-phone' : undefined}>
            <img src={image.src} alt={image.alt} loading="lazy" />
            <figcaption>{image.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
