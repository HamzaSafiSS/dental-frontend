import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import Hero from '../../components/sections/Hero/Hero';
import TrustStrip from '../../components/sections/TrustStrip/TrustStrip';
import ServicesSection from '../../components/sections/Services/ServicesSection';
import './HomePage.css';

/**
 * HomePage — Main landing page for the dental clinic.
 * Sections will be added phase by phase.
 *
 * Current sections:
 *  ✅ Section 1 — Top Information Bar (via PublicLayout)
 *  ✅ Section 2 — Navigation Bar (via PublicLayout)
 *  ✅ Section 3 — Hero
 *  ✅ Section 4 — Trust Strip
 *  ✅ Section 5 — Dental Services
 *  🔜 ... and more
 */
export default function HomePage() {
  return (
    <PublicLayout>
      <div className="home-page">
        <Hero />
        <TrustStrip />
        <ServicesSection />
      </div>
    </PublicLayout>
  );
}
