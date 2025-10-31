// Data source: /public/data/destinations.json — auto-mapped for cards
"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'; // Using axios as requested
import Link from 'next/link';
import Image from 'next/image';
import styles from './ExploreDestinations.module.css';

// --- MOCK DATA ---
// Used as a fallback if the API fetch fails or returns an empty array,
// ensuring the page always renders content matching the screenshot for development.

const MOCK_DESTINATIONS = [
  {
    slug: 'pyramids-of-giza',
    title: 'Pyramids of Giza',
    subtitle: 'Witness the majestic ancient wonders, a testament to pharaonic engineering and history.',
    imageUrl: '/images/destinations/pyramids-of-giza.png', // Assumed image path
  },
  {
    slug: 'khan-el-khalili',
    title: 'Khan el-Khalili Bazaar',
    subtitle: 'Immerse yourself in the vibrant atmosphere of Cairo\'s historic marketplace, rich with crafts and spices.',
    imageUrl: '/images/destinations/khan-el-khalili.png',
  },
  {
    slug: 'aswan-nile-cruise',
    title: 'Aswan Nile Cruise',
    subtitle: 'Experience serene luxury along the Nile, passing ancient temples and picturesque landscapes.',
    imageUrl: '/images/destinations/aswan-nile-cruise.png',
  },
  {
    slug: 'alexandria-library',
    title: 'Alexandria Library & Citadel',
    subtitle: 'Explore the modern marvel of the Bibliotheca Alexandrina and the historic Qaitbay Citadel.',
    imageUrl: '/images/destinations/alexandria-library.png',
  },
  {
    slug: 'luxor-temple',
    title: 'Luxor Temple Complex',
    subtitle: 'Step back in time among grand pylons, statues, and obelisks of one of Egypt\'s most significant sites.',
    imageUrl: '/images/destinations/luxor-temple.png',
  },
  {
    slug: 'dahab-blue-hole',
    title: 'Dahab Blue Hole',
    subtitle: 'Dive into the stunning underwater world of the Red Sea, a paradise for snorkelers and divers.',
    imageUrl: '/images/destinations/dahab-blue-hole.png',
  },
];

const MOCK_GOVERNORATES = [
  {
    name: 'Giza',
    shortDesc: 'Home of the Great Pyramids and Sphinx.',
    icon: '⛰️',
    colorClass: 'tileGiza',
  },
  {
    name: 'Cairo',
    shortDesc: 'Egypt\'s vibrant capital and largest city.',
    icon: '🕌',
    colorClass: 'tileCairo',
  },
  {
    name: 'Alexandria',
    shortDesc: 'The historic Pearl of the Mediterranean.',
    icon: '⚓',
    colorClass: 'tileAlexandria',
  },
  {
    name: 'Luxor',
    shortDesc: 'Ancient city known as the "World\'s Greatest Open-Air Museum."',
    icon: '☀️',
    colorClass: 'tileLuxor',
  },
  {
    name: 'Aswan',
    shortDesc: 'Scenic southern city on the Nile River, famous for its temples.',
    icon: '📍',
    colorClass: 'tileAswan',
  },
  {
    name: 'Sharm El Sheikh',
    shortDesc: 'Popular Red Sea resort city known for diving and beaches.',
    icon: '🌴',
    colorClass: 'tileSharm',
  },
];

// --- API Fetchers ---

/**
 * Data source: /public/data/destinations.json — auto-mapped for cards
 * For production: replace with real backend API endpoints
 */

//
// helper to generate slug
//
const makeSlug = (name = "") =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

//
// helper to normalize image path
//
const normalizeImagePath = (img = "") => {
  if (!img) return "/images/default-destination.jpg";
  if (img.startsWith("/")) return img;
  return "/" + img.replace(/^\.\.\/+/, "").replace(/^\/+/, "");
};

//
// fetchDestinations implementation
//
const fetchDestinations = async () => {
  try {
    const res = await axios.get("/data/destinations.json");
    const data = Array.isArray(res.data) ? res.data : [];

    const formatted = data.map((dest) => ({
      destinationId: dest.destinationId,
      slug: makeSlug(dest.name),
      title: dest.name,
      subtitle: dest.card?.shortDescription || "",
      imageUrl: normalizeImagePath(dest.card?.image),
    }));

    return formatted.length ? formatted : MOCK_DESTINATIONS;
  } catch (err) {
    console.warn("Could not load /data/destinations.json — using fallback MOCK.", err.message || err);
    return MOCK_DESTINATIONS;
  }
};

const fetchGovernorates = async () => {
  // TODO: Replace with your actual backend endpoint
  const endpoint = '/api/governorates';
  try {
    const { data } = await axios.get(endpoint);
    return data && data.length > 0 ? data : MOCK_GOVERNORATES;
  } catch (error) {
    // For development: if API endpoint doesn't exist (404) or any other error,
    // return mock data instead of throwing to provide a smooth development experience
    console.warn("API endpoint not available, using mock data:", error.message);
    return MOCK_GOVERNORATES;
  }
};

// --- Helper Components ---

/**
 * A simple loading placeholder.
 */
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center my-5">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

/**
 * A simple error message.
 */
const ErrorMessage = ({ message }) => (
  <div className="alert alert-danger" role="alert">
    {message || 'An error occurred while fetching data.'}
  </div>
);

/**
 * Renders a single destination card.
 */
const DestinationCard = ({ title, subtitle, imageUrl, slug }) => (
  <div className={`card h-100 border-0 ${styles.destinationCard}`}>
    <div className={styles.cardImageWrapper}>
      <Image
        src={imageUrl}
        alt={`View of ${title}`}
        width={400}
        height={250}
        className={`card-img-top ${styles.cardImage}`}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvdsaywAAAABJRU5ErkJggg==" // Simple grey blur
      />
      <div className={styles.cardImageOverlay}></div>
    </div>
    <div className={`card-body d-flex flex-column ${styles.cardBody}`}>
      <h5 className={`card-title fw-bold ${styles.cardTitle}`}>{title}</h5>
      <p className={`card-text ${styles.cardText} mb-3`}>{subtitle}</p>
      <Link
        href={`/destinations/${slug}`}
        className={`mt-auto align-self-start ${styles.ctaLink}`}
      >
        View Guides &gt;
      </Link>
    </div>
  </div>
);

/**
 * Renders a single governorate tile.
 */
const GovernorateTile = ({ name, shortDesc, icon, colorClass }) => {
  const tileColorClass = styles[colorClass] || styles.tileDefault;

  return (
    <div className={`text-center p-3 rounded-3 h-100 ${styles.governorateTile} ${tileColorClass}`}>
      <div className={styles.tileIcon} aria-hidden="true">
        {icon}
      </div>
      <h5 className={`fw-bold ${styles.tileTitle}`}>{name}</h5>
      <p className={styles.tileDesc}>{shortDesc}</p>
    </div>
  );
};

// --- Page Component ---

/**
 * NOTE: For React Query to work, you must wrap your layout or page
 * in a <QueryClientProvider> in a parent component.
 */
export default function ExploreDestinations() {
  const {
    data: destinationsData,
    isLoading: isLoadingDestinations,
    isError: isErrorDestinations,
  } = useQuery({
    queryKey: ['destinations'],
    queryFn: fetchDestinations,
  });

  const {
    data: governoratesData,
    isLoading: isLoadingGovernorates,
    isError: isErrorGovernorates,
  } = useQuery({
    queryKey: ['governorates'],
    queryFn: fetchGovernorates,
  });

  // Since fetch functions now handle fallbacks internally,
  // we can directly use the returned data
  const destinations = destinationsData || MOCK_DESTINATIONS;
  const governorates = governoratesData || MOCK_GOVERNORATES;

  const isLoading = isLoadingDestinations || isLoadingGovernorates;

  return (
    <>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Explore Egypt's Top Destinations
            </h1>
            <p className={styles.heroSubtitle}>
              Discover the timeless wonders and hidden gems of Egypt, from ancient monuments to pristine beaches
            </p>
          </div>
        </div>
      </section>

      <div className="container my-4 my-md-5">
        {/* Section 1: Popular Destinations */}
        <section className={`mb-5 ${styles.section}`}>
          <h2 className={styles.sectionTitle}>
            Popular Destinations
          </h2>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="row g-4">
              {destinations.map((dest) => (
                <div className="col-lg-4 col-md-6 mb-4" key={dest.slug}>
                  <DestinationCard {...dest} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Section 2: Explore Governorates */}
        <section className={`mt-4 pt-md-3 ${styles.section}`}>
          <h2 className={styles.sectionTitle}>
            Explore Egyptian Governorates
          </h2>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="row g-4">
              {governorates.map((gov) => (
                <div className="col-lg-4 col-md-6 mb-4" key={gov.name}>
                  <GovernorateTile {...gov} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

/*
 * COPILOT CHANGES SUMMARY:
 * - Modified fetchDestinations() to read from /data/destinations.json
 * - Added makeSlug() helper for URL-friendly slug generation
 * - Added normalizeImagePath() helper for image path handling
 * - Updated Link href from /guides/ to /destinations/
 * - Removed queryKeyHash properties from useQuery calls
 * - Added data source comment at top of file
 *
 * MANUAL VERIFICATION CHECKLIST:
 * □ Page loads without console errors
 * □ Cards render with image, title, subtitle
 * □ Clicking a card navigates to /destinations/{slug}
 * □ If JSON missing or invalid, MOCK_DESTINATIONS renders
 */