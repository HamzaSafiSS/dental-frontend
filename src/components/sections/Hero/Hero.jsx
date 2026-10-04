import { Link } from 'react-router-dom';
import { IconArrowRight } from '../../ui/Icons';
import './Hero.css';

/**
 * Trust indicator icons
 */
function IconTech({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

function IconDentist({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconChild({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3" />
      <path d="M12 22V8" />
      <path d="M5 11l7-3 7 3" />
      <path d="M8 22l4-8 4 8" />
    </svg>
  );
}

function IconHeart({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconStar({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__container container">
        
        {/* ── Left: Text Content ── */}
        <div className="hero__content">
          <div className="hero__label">Healthy Smile. Healthy You.</div>
          <h1 className="hero__heading">
            Exceptional Dental Care for the <em>Whole Family</em>
          </h1>
          <p className="hero__description">
            Modern, comfortable and personalized dental care for children, teenagers and adults.
          </p>
          
          <div className="hero__buttons">
            <Link to="/book-appointment" className="hero__btn-primary">
              Book an Appointment
              <IconArrowRight size={18} className="hero__btn-arrow" />
            </Link>
            <Link to="/services" className="hero__btn-secondary">
              Explore Our Services
              <IconArrowRight size={18} className="hero__btn-arrow" />
            </Link>
          </div>
        </div>

        {/* ── Right: Image ── */}
        <div className="hero__image-wrapper">
          <div className="hero__image-accent" aria-hidden="true" />
          <div className="hero__image-frame">
            <img 
              src="/images/hero-dental.jpg" 
              alt="Dentist treating a smiling patient in a modern dental clinic" 
              className="hero__image"
              width="800"
              height="600"
            />
          </div>
          
          {/* Floating Badge */}
          <div className="hero__float-badge">
            <div className="hero__float-badge-icon">
              <IconStar size={20} />
            </div>
            <div className="hero__float-badge-text">
              <span className="hero__float-badge-number">4.9/5</span>
              <span className="hero__float-badge-label">Patient Rating</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── Bottom: Trust Indicators ── */}
      <div className="hero__trust">
        <div className="hero__trust-container container">
          
          <div className="hero__trust-item">
            <div className="hero__trust-icon">
              <IconTech size={20} />
            </div>
            <div className="hero__trust-text">
              <span className="hero__trust-label">Modern Technology</span>
              <span className="hero__trust-sublabel">Advanced dental equipment</span>
            </div>
          </div>

          <div className="hero__trust-item">
            <div className="hero__trust-icon">
              <IconDentist size={20} />
            </div>
            <div className="hero__trust-text">
              <span className="hero__trust-label">Experienced Dentists</span>
              <span className="hero__trust-sublabel">Highly qualified team</span>
            </div>
          </div>

          <div className="hero__trust-item">
            <div className="hero__trust-icon">
              <IconChild size={20} />
            </div>
            <div className="hero__trust-text">
              <span className="hero__trust-label">Child-Friendly Care</span>
              <span className="hero__trust-sublabel">Gentle pediatric dentistry</span>
            </div>
          </div>

          <div className="hero__trust-item">
            <div className="hero__trust-icon">
              <IconHeart size={20} />
            </div>
            <div className="hero__trust-text">
              <span className="hero__trust-label">Comfortable Environment</span>
              <span className="hero__trust-sublabel">Stress-free experience</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
