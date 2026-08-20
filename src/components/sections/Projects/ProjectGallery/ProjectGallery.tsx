import styles from "./ProjectGallery.module.css";

interface ProjectGalleryProps {
  id: string;
  title: string;
  images: string[];
}

// Standalone, self-contained gallery: a cover thumbnail that opens a
// lightbox, with slide switching inside it. Both the open/close state and
// the active slide are pure CSS (checkbox + radio hack) — no client JS
// ships for this component, matching the rest of the site.
export function ProjectGallery({ id, title, images }: ProjectGalleryProps) {
  const slideName = `${id}-slide`;
  const slideId = (i: number) => `${slideName}-${i}`;

  return (
    <>
      <input type="checkbox" id={id} className={styles.galleryToggle} />

      <label htmlFor={id} className={styles.cover}>
        <img src={images[0]} alt={title} className={styles.coverImage} />
        <span className={styles.viewHint}>Ver galería</span>
      </label>

      <div className={styles.modal}>
        <label htmlFor={id} className={styles.overlay} />

        <div className={styles.modalContent}>
          <label htmlFor={id} className={styles.close} aria-label="Cerrar galería">
            ×
          </label>

          {images.map((_, i) => (
            <input
              key={slideId(i)}
              type="radio"
              name={slideName}
              id={slideId(i)}
              className={styles.slideRadio}
              defaultChecked={i === 0}
            />
          ))}

          <div className={styles.slides}>
            {images.map((image, i) => (
              <div key={slideId(i)} className={styles.slide}>
                <img
                  src={image}
                  alt={`${title} — foto ${i + 1}`}
                  className={styles.slideImage}
                />
                {images.length > 1 && (
                  <>
                    <label
                      htmlFor={slideId((i - 1 + images.length) % images.length)}
                      className={`${styles.slideNav} ${styles.slidePrev}`}
                      aria-label="Foto anterior"
                    >
                      ←
                    </label>
                    <label
                      htmlFor={slideId((i + 1) % images.length)}
                      className={`${styles.slideNav} ${styles.slideNext}`}
                      aria-label="Foto siguiente"
                    >
                      →
                    </label>
                  </>
                )}
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <div className={styles.thumbs}>
              {images.map((image, i) => (
                <label
                  key={slideId(i)}
                  htmlFor={slideId(i)}
                  className={styles.thumb}
                  aria-label={`Ver foto ${i + 1} de ${title}`}
                >
                  <img src={image} alt="" className={styles.thumbImage} />
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
