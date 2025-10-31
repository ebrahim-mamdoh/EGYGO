'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from '../DestinationDetails.module.css';

// Hero section component with title, description, image and CTA
export default function HeroSection({ 
  title, 
  heroDescription, 
  heroImage, 
  cta, 
  destinationName 
}) {
  const [imageError, setImageError] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState(heroImage);

  // Handle image load error
  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      // Try to fall back to a default image
      setCurrentImageSrc('/images/default-destination.svg');
    }
  };

  return (
    <section className={styles.heroSection}>
      {/* Background Image */}
      <div className={styles.heroImageWrapper}>
        {currentImageSrc && (
          <Image
            src={currentImageSrc}
            alt={`Hero image of ${destinationName}`}
            fill
            className={styles.heroImage}
            priority
            sizes="100vw"
            onError={handleImageError}
          />
        )}
        {/* Fallback gradient background if no image */}
        {!currentImageSrc && (
          <div 
            className={styles.heroImage}
            style={{
              background: 'linear-gradient(135deg, #0A2342, #00797C)',
              width: '100%',
              height: '100%'
            }}
          />
        )}
      </div>
      
      {/* Overlay for better text readability */}
      <div className={styles.heroOverlay}></div>
      
      {/* Hero Content */}
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {title}
          </h1>
          <p className={styles.heroDescription}>
            {heroDescription}
          </p>
          <a 
            href="#overview" 
            className={styles.heroCta}
            aria-label={`${cta} for ${destinationName}`}
          >
            {cta}
          </a>
        </div>
      </div>
    </section>
  );
}