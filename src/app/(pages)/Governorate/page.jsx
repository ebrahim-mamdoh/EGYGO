// =====================
// File: app/governorate/page.jsx
// =====================

import fs from "fs/promises";
import path from "path";
import GovernorateClient from "./GovernorateClient";
import styles from "./Governorate.module.css";

export const metadata = {
  title: "Explore Egypt by Governorate",
};

export default async function Governorate() {
  // ✅ SSR: Read local JSON mock data
  const filePath = path.join(process.cwd(), "public", "data", "guides.json");
  let guides = [];

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    guides = JSON.parse(raw);
  } catch (err) {
    console.error("❌ Failed to read guides.json", err);
    guides = [];
  }

  return (
    <main className={styles.pageContainer}>
      <section className={`container ${styles.inner}`}>
        <header className={styles.header}>
          <h1>Explore Egypt by Governorate</h1>
          <p className={styles.subtitle}>
            Discover local guides in various regions across Egypt. Select a
            governorate to see available guides and embark on an unforgettable
            journey.
          </p>
        </header>

        {/* Client Interactive Section */}
        <GovernorateClient initialGuides={guides} />
      </section>
    </main>
  );
}
