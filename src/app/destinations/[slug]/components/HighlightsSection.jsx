import styles from '../DestinationDetails.module.css';

// Highlights section with feature cards
export default function HighlightsSection({ highlights }) {
  // Icons for different highlights (you can customize these)
  const getHighlightIcon = (index) => {
    const icons = ['✨', '🏛️', '🎯', '🌟', '📸', '🗺️'];
    return icons[index % icons.length];
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>
          Highlights & Features
        </h2>
        
        <div className={styles.highlightsGrid}>
          {highlights.map((highlight, index) => (
            <div key={index} className={styles.highlightCard}>
              <div className={styles.highlightIcon}>
                {getHighlightIcon(index)}
              </div>
              <p className={styles.highlightText}>
                {highlight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}