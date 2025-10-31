import Image from 'next/image';
import styles from '../DestinationDetails.module.css';

// Gallery section with responsive image grid
export default function GallerySection({ gallery, destinationName }) {
  if (!gallery || gallery.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>
          Photo Gallery
        </h2>
        
        <div className={styles.galleryGrid}>
          {gallery.map((imageSrc, index) => (
            <div key={index} className={styles.galleryImageWrapper}>
              <Image
                src={imageSrc}
                alt={`${destinationName} gallery image ${index + 1}`}
                fill
                className={styles.galleryImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}