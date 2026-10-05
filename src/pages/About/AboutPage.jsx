import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import AboutSection from '../../components/sections/About/AboutSection';
import WhyChooseUsSection from '../../components/sections/WhyChooseUs/WhyChooseUsSection';
import DentistsSection from '../../components/sections/Dentists/DentistsSection';
import './AboutPage.css';

export default function AboutPage() {
  return (
    <PublicLayout>
      <main className="about-page">
        
        <header className="about-page__header">
          <div className="container">
            <h1 className="about-page__title">About Us</h1>
            <p className="about-page__subtitle">
              Learn more about our mission, our clinic, and our commitment to your dental health.
            </p>
          </div>
        </header>

        <div className="about-page__content">
          <AboutSection />
          <WhyChooseUsSection />
          <DentistsSection />
        </div>

      </main>
    </PublicLayout>
  );
}
