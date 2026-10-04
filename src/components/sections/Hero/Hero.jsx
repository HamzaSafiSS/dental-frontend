import { Link } from 'react-router-dom';
import { IconArrowRight } from '../../ui/Icons';
import './Hero.css';

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
    </section>
  );
}
