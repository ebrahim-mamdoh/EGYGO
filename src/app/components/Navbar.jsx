'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Scroll behavior logic
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        
        // Show navbar when at top or scrolling up
        if (currentScrollY < lastScrollY || currentScrollY < 10) {
          setIsVisible(true);
        } else {
          // Hide navbar when scrolling down and past threshold
          setIsVisible(false);
          // Close mobile menu when scrolling down
          setIsMenuOpen(false);
        }
        
        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar, { passive: true });
      
      // Cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  // Helper function to check if a link is active
  const isActiveLink = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  // Navigation links configuration
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/ExploreDestinations', label: 'Explore Destinations' },
    { href: '/Governorate', label: 'Governorate' },
    { href: '/AboutUs', label: 'About Us' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav 
      className={`${styles.navbar} ${!isVisible ? styles.navbarHidden : ''}`} 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="HIGH PEAKS - Go to homepage">
          HIGH PEAKS
        </Link>

        {/* Desktop Navigation Links */}
        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                isActiveLink(link.href) ? styles.activeLink : ''
              }`}
              aria-current={isActiveLink(link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Book Now Button */}
        <Link href="/auth/login" className={styles.bookNowBtn} aria-label="Book your trip now">
          Book Now
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.mobileNavLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileNavLink} ${
                isActiveLink(link.href) ? styles.activeMobileLink : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
              aria-current={isActiveLink(link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/auth/login"
            className={styles.mobileBookNowBtn}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Book your trip now"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;