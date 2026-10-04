import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import './HomePage.css';

/**
 * HomePage — Main landing page for the dental clinic.
 * Sections will be added phase by phase.
 *
 * Current sections:
 *  ✅ Section 1 — Top Information Bar (via PublicLayout)
 *  🔜 Section 2 — Navigation Bar
 *  🔜 Section 3 — Hero + Book Appointment
 *  🔜 Section 4 — Trust Indicators
 *  🔜 Section 5 — Dental Services
 *  🔜 ... and more
 */
export default function HomePage() {
  return (
    <PublicLayout>
      <div className="home-page">

        {/* Temporary: visual confirmation that TopBar + layout works */}
        <section className="home-placeholder">
          <div className="home-placeholder__badge">
            <span className="home-placeholder__badge-dot" />
            Building Phase by Phase
          </div>
          <h1>Bright Smiles Dental Care</h1>
          <p>
            The Top Information Bar is live above. More homepage sections
            will be added in the upcoming phases.
          </p>
        </section>

      </div>
    </PublicLayout>
  );
}
