import styles from '../DestinationDetails.module.css';

// Overview section with destination details and quick facts sidebar
export default function OverviewSection({ overview, quickFacts, location }) {
  return (
    <section id="overview" className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>
          {overview.title}
        </h2>
        
        <div className="row">
          {/* Main Content */}
          <div className="col-lg-8 col-md-7">
            <div className={styles.overviewContent}>
              {overview.content.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          {/* Quick Facts Sidebar */}
          <div className="col-lg-4 col-md-5">
            <div className={styles.quickFactsCard}>
              <h3 className={styles.quickFactsTitle}>
                Quick Facts
              </h3>
              
              {/* Location */}
              {location?.city && (
                <div className={styles.factItem}>
                  <span className={styles.factLabel}>Location</span>
                  <span className={styles.factValue}>
                    {location.city}, {location.country}
                  </span>
                </div>
              )}
              
              {/* Capital */}
              {quickFacts?.capital && (
                <div className={styles.factItem}>
                  <span className={styles.factLabel}>Capital</span>
                  <span className={styles.factValue}>{quickFacts.capital}</span>
                </div>
              )}
              
              {/* Population */}
              {quickFacts?.population && (
                <div className={styles.factItem}>
                  <span className={styles.factLabel}>Population</span>
                  <span className={styles.factValue}>{quickFacts.population}</span>
                </div>
              )}
              
              {/* Language */}
              {quickFacts?.language && (
                <div className={styles.factItem}>
                  <span className={styles.factLabel}>Language</span>
                  <span className={styles.factValue}>{quickFacts.language}</span>
                </div>
              )}
              
              {/* Currency */}
              {quickFacts?.currency && (
                <div className={styles.factItem}>
                  <span className={styles.factLabel}>Currency</span>
                  <span className={styles.factValue}>{quickFacts.currency}</span>
                </div>
              )}
              
              {/* Best Time to Visit */}
              {quickFacts?.bestTimeToVisit && (
                <div className={styles.factItem}>
                  <span className={styles.factLabel}>Best Time</span>
                  <span className={styles.factValue}>{quickFacts.bestTimeToVisit}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}