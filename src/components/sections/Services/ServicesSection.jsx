import { Link } from 'react-router-dom';
import { IconArrowRight } from '../../ui/Icons';
import './ServicesSection.css';

const SERVICES_DATA = [
  {
    title: 'General Dentistry',
    description: 'Routine examinations, cleanings, fillings and preventive care.',
    slug: 'general-dentistry',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Pediatric Dentistry',
    description: 'Gentle dental care designed specifically for children.',
    slug: 'pediatric-dentistry',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4a4 4 0 0 1 4 4v2H8V8a4 4 0 0 1 4-4z" />
        <path d="M6 10v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10" />
        <path d="M10 14h4" />
      </svg>
    ),
  },
  {
    title: 'Cosmetic Dentistry',
    description: 'Teeth whitening, veneers, bonding and smile enhancement.',
    slug: 'cosmetic-dentistry',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: 'Dental Implants',
    description: 'Replacement of missing teeth with natural-looking dental implants.',
    slug: 'dental-implants',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Orthodontics',
    description: 'Braces and clear aligners for straighter teeth.',
    slug: 'orthodontics',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    title: 'Preventive Dentistry',
    description: 'Regular examinations, fluoride treatments and oral-health education.',
    slug: 'preventive-dentistry',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
      </svg>
    ),
  },
  {
    title: 'Restorative Dentistry',
    description: 'Crowns, bridges, fillings and restoration of damaged teeth.',
    slug: 'restorative-dentistry',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: 'Emergency Dentistry',
    description: 'Urgent treatment for dental pain, broken teeth and dental injuries.',
    slug: 'emergency-dentistry',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section className="services-section" id="services">
      <div className="container">
        
        {/* Header */}
        <div className="services-section__header">
          <span className="services-section__label">Our Expertise</span>
          <h2 className="services-section__heading">
            Comprehensive Dental Care for Every Smile
          </h2>
          <p className="services-section__description">
            We provide a full spectrum of dental services including preventive, restorative, cosmetic, and emergency care to keep your smile healthy and beautiful.
          </p>
        </div>

        {/* Grid */}
        <div className="services-section__grid">
          {SERVICES_DATA.map((service) => (
            <Link 
              to={`/services/${service.slug}`} 
              key={service.slug}
              className="service-card"
            >
              <div className="service-card__icon-wrapper">
                {service.icon}
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
              <span className="service-card__link">
                Learn More
                <IconArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="services-section__footer">
          <Link to="/services" className="services-section__btn">
            View All Dental Services
            <IconArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}
