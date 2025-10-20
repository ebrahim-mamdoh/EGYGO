"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const storyRef = useRef(null);
  const footerRef = useRef(null);

  const scrollToStory = () => storyRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToFooter = () => footerRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
    <div dir="rtl" className={styles.maincontainer}>

 
      {/* ===== NAVBAR ===== */}
      <header>
        <nav className={`navbar navbar-expand-lg navbar-dark bg-transparent ${styles.navbar}`}>
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className={`navbar-nav ms-auto align-items-center gap-3 ${styles.navLinks}`}>
                <li className="nav-item">

                  <button className={`btn ${styles.bookNow}`} onClick={() => router.push('/login')}>
                    BOOK NOW
                  </button>
                </li>
                <li className="nav-item"><a className={"nav-link"} href="#">Blog</a></li>
                <li className="nav-item"><a className={"nav-link"} href="#">Services</a></li>
                <li className="nav-item"><a className={"nav-link"} href="#">About</a></li>
                <li className="nav-item"><a className={"nav-link"} href="#">Home</a></li>

              </ul>
            </div>
            <div>
              <a className="navbar-brand fw-bold" href="#">EGYGO</a>
              <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
            </div>

          </div>
        </nav>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className={styles.heroSection}>
        <div className={`container  ${styles.heroContent}`}>

          <h1>EXPLORE</h1>
          <h1>THE MOUNTAIN</h1>
          <p>Live your dream and explore</p>
          <button className={`btn btn-outline-light ${styles.exploreBtn}`} onClick={scrollToStory}>
            Explore More
          </button>
        </div>
      </section>

      {/* ===== STORY SECTION ===== */}
      <section ref={storyRef} className={`${styles.storySection} py-5`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center">
            </div>

            <div className="col-md-6 mb-4 mb-md-0 ">
              <div className={styles.storyText}>
                <h2>Hiking the Ancient Pine Forest</h2>
                <div className={styles.metaInfo}>
                  <span>📅 Date</span>
                  <span>🕒 Time</span>

                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam turpis odio integer vitae porta mattis. Vel, blandit enim diam est. Aliquam, lobortis dui neque nisl quis pellentesque porttitor. A nulla eget sed pellentesque nisl semper elit enim. Felis at tincidunt consequat mattis egestas egestas sapien sed. Sollicitudin sed habitasse amet ac libero nibh et viverra. Purus feugiat ac sit venenatis, faucibus fringilla sed netus sit.
                  dignissim habitasse lectus sit consectetur. Parturient varius curabitur aliquam nisl malesuada sit non.</p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className={`${styles.servicesSection} text-center py-5`}>
        <div className="container">
          <h2 className="mb-4">Our Services</h2>
          <div className="row gy-4">
            <div className="col-md-4" >
              <div className={styles.serviceCard}>
                <Image src="/images/CustomGuided.jpeg" alt='Trekking/Mountaineering' className="rounded-circle mb-3" width={150} height={150} />
                <h4>Guided Tours</h4>
                <p>Explore Egypt’s iconic landmarks with expert local guides who bring history to life.</p>
              </div>
            </div>

            <div className="col-md-4" >
              <div className={styles.serviceCard}>
                <Image src="/images/AdventureActivities.jpeg" alt='Trekking/Mountaineering' className="rounded-circle mb-3" width={150} height={150} />
     <h4>Cultural & Adventure Activities</h4>
    <p>Experience desert safaris, Nile cruises, and authentic Egyptian traditions.</p>
              </div>
            </div>

            <div className="col-md-4" >
              <div className={styles.serviceCard}>
                <Image src="/images/Transportation.jpeg" alt='Trekking/Mountaineering ' className="rounded-circle mb-3" width={150} height={150} />
               <h4>Travel & Transport</h4>
    <p>Seamless travel support — from hotel bookings to private transport across Egypt.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.waveDivider}></div>
      </section>
      {/* ===== Divider SECTION ===== */}
      <section className={styles.sectionDivider}></section>

      {/* ===== GUIDE & TRAILS SECTION ===== */}
      <section className={`${styles.guideTrailsSection} py-5`}>
        <div className="container">
          <div className="row gy-4">
            <div className="col-md-6">
              <h3>Trails</h3>
              <ul className={styles.trailsList}>
                <li>Guide 1: Expert in ancient Egyptian history and museum tours.</li>
    <li>Guide 2: Specialized in desert adventures and cultural experiences.</li>
    <li>Guide 3: Fluent in multiple languages, making travel effortless for international guests.</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h3>Guide</h3>
              <div className={styles.guideCard}>
                <div>
                  <h5>John Doe</h5>
                  <p>One of my favourite place to take picture</p>
                </div>
                <Image src="/images/gide2.png" alt='Trekking/Mountaineering' className="rounded-circle mb-3" width={70} height={70} />
              </div>
              <div className={styles.guideCard}>
                <div>
                  <h5>Lina Darja</h5>
                  <p>Expert in mountain trekking.</p>
                </div>
                <Image src="/images/gide1.png" alt='Trekking/Mountaineering' className="rounded-circle mb-3" width={70} height={70} />
              </div>
            </div>

          </div>
          <div className="text-center mt-4">
            <button className={`btn ${styles.seeMoreBtn}`} onClick={scrollToFooter}>See More</button>
          </div>
        </div>
      </section>
      {/* ===== Divider SECTION ===== */}
      <section className={styles.sectionDivider2}></section>

      {/* ===== FOOTER ===== */}
      <footer ref={footerRef} className={`${styles.footer} py-4`}>
        <div className="container text-center text-md-start">
          <div className="row align-items-center">

            <div className="col-md-6 text-md-end">
              <div className={`d-flex justify-content-center gap-3 mb-3 mb-md-0 ${styles.footerLinks}`}>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Blog</a></div>

            </div>

            <div className="col-md-6 mb-3 mb-md-0">
              <div>
                <Image src="/images/footerLogo.jpg" alt="Logo" width={250} height={100} />
              </div>
            </div>
          </div>
        </div>
      </footer>
         </div>
    </>
  );
}
