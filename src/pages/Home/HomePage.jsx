import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import Hero from '../../components/sections/Hero/Hero';
import TrustStrip from '../../components/sections/TrustStrip/TrustStrip';
import ServicesSection from '../../components/sections/Services/ServicesSection';
import AboutSection from '../../components/sections/About/AboutSection';
import WhyChooseUsSection from '../../components/sections/WhyChooseUs/WhyChooseUsSection';
import FamilyCareSection from '../../components/sections/FamilyCare/FamilyCareSection';
import DentistsSection from '../../components/sections/Dentists/DentistsSection';
import './HomePage.css';

/**
 * HomePage — Main landing page for the dental clinic.
 * Sections will be added phase by phase.
 *
 * Current sections:
 *  ✅ Section 1 — Top Information Bar
 *  ✅ Section 2 — Navigation Bar
 *  ✅ Section 3 — Hero
 *  ✅ Section 4 — Trust Strip
 *  ✅ Section 5 — Dental Services
 *  ✅ Section 6 — About the Clinic
 *  ✅ Section 7 — Why Choose Us
 *  ✅ Section 8 — Family Care
 *  ✅ Section 9 — Meet Our Dentists
 */
export default function HomePage() {
  return (
    <PublicLayout>
      <div className="home-page">
        <Hero />
        <TrustStrip />
        <ServicesSection />
        <AboutSection />
        <WhyChooseUsSection />
        <FamilyCareSection />
        <DentistsSection />
      </div>
    </PublicLayout>
  );
}
