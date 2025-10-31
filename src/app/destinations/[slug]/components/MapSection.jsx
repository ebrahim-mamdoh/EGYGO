import styles from '../DestinationDetails.module.css';

// Map section with embedded Google Maps
export default function MapSection({ location, destinationName }) {
  if (!location?.mapUrl) {
    return null;
  }

  // Convert Google Maps share URL to embeddable URL
  const getEmbeddableMapUrl = (url) => {
    try {
      // Extract coordinates or place ID from Google Maps URL
      if (url.includes('maps.app.goo.gl') || url.includes('goo.gl')) {
        // For shortened URLs, we'll use a search-based embed
        const searchQuery = encodeURIComponent(`${destinationName}, ${location.city}, ${location.country}`);
        return `https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${searchQuery}`;
      }
      
      // For regular Google Maps URLs, try to extract coordinates
      const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (coordMatch) {
        const [, lat, lng] = coordMatch;
        return `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&center=${lat},${lng}&zoom=15`;
      }
      
      // Fallback to search-based embed
      const searchQuery = encodeURIComponent(`${destinationName}, ${location.city}, ${location.country}`);
      return `https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${searchQuery}`;
    } catch (error) {
      // Fallback for any URL parsing errors
      const searchQuery = encodeURIComponent(`${destinationName}, ${location.city}, ${location.country}`);
      return `https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${searchQuery}`;
    }
  };

  const embedUrl = getEmbeddableMapUrl(location.mapUrl);

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>
          Location & Map
        </h2>
        
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className={styles.mapContainer}>
              {/* Embedded Map */}
              <iframe
                src={embedUrl}
                className={styles.mapFrame}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${destinationName}`}
              ></iframe>
              
              {/* Map Info */}
              <div className={styles.mapInfo}>
                <h3 className={styles.mapTitle}>
                  {destinationName}
                </h3>
                <p className={styles.mapLocation}>
                  📍 {location.city}, {location.country}
                </p>
                {location.mapUrl && (
                  <a 
                    href={location.mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary mt-2"
                  >
                    Open in Google Maps
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}