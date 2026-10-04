import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import Hero from '../../components/sections/Hero/Hero';
import './HomePage.css';

/**
 * HomePage — Main landing page for the dental clinic.
 * Sections will be added phase by phase.
 *
 * Current sections:
 *  ✅ Section 1 — Top Information Bar (via PublicLayout)
 *  ✅ Section 2 — Navigation Bar (via PublicLayout)
 *  ✅ Section 3 — Hero + Book Appointment + Trust Indicators
 *  🔜 Section 4 — Dental Services
 *  🔜 ... and more
 */
export default function HomePage() {
  return (
    <PublicLayout>
      <div className="home-page">
        <Hero />
      </div>
    </PublicLayout>
  );
}
