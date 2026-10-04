import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import ServicesSection from '../../components/sections/Services/ServicesSection';
import './ServicesPage.css';

export default function ServicesPage() {
  return (
    <PublicLayout>
      <main className="services-page">
        
        {/* Simple Page Header */}
        <header className="services-page__header">
          <div className="container">
            <h1 className="services-page__title">Our Dental Services</h1>
            <p className="services-page__subtitle">
              Comprehensive, compassionate, and state-of-the-art dental care for you and your family.
            </p>
          </div>
        </header>

        {/* Reuse the Services Section from the Home Page */}
        <div className="services-page__content">
          <ServicesSection />
        </div>

      </main>
    </PublicLayout>
  );
}
