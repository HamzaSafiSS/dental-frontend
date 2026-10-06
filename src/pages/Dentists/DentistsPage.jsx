import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import DentistsSection from '../../components/sections/Dentists/DentistsSection';
import './DentistsPage.css';

export default function DentistsPage() {
  return (
    <PublicLayout>
      <main className="dentists-page">
        
        {/* Simple Page Header */}
        <header className="dentists-page__header">
          <div className="container">
            <h1 className="dentists-page__title">Our Dental Specialists</h1>
            <p className="dentists-page__subtitle">
              Meet our team of experienced, highly skilled, and compassionate dental professionals.
            </p>
          </div>
        </header>

        {/* Reuse the Dentists Section */}
        <div className="dentists-page__content">
          <DentistsSection />
        </div>

      </main>
    </PublicLayout>
  );
}
