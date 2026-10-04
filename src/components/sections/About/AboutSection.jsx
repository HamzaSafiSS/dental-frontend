import { Link } from 'react-router-dom';
import { IconArrowRight } from '../../ui/Icons';
import './AboutSection.css';

function IconCheck({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function AboutSection() {
  const checkItems = [
    'Experienced and caring dental team',
    'Modern diagnostic technology',
    'Comfortable and welcoming environment',
    'Personalized treatment plans',
    'Family-focused dental care'
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-section__container container">
        
        {/* ── Left: Image ── */}
        <div className="about-section__image-col">
          <div className="about-section__image-bg" aria-hidden="true" />
          <div className="about-section__image-wrapper">
            <img 
              src="/images/about-clinic.jpg" 
              alt="Bright Smiles Dental Care team in a modern treatment room" 
              className="about-section__image"
              loading="lazy"
            />
          </div>
        </div>

        {/* ── Right: Content ── */}
        <div className="about-section__content">
          <span className="about-section__label">About The Clinic</span>
          <h2 className="about-section__heading">Your Smile Is Our Top Priority</h2>
          
          <p className="about-section__description">
            At Bright Smiles Dental Care, we believe everyone deserves a healthy, confident smile. 
            Our modern clinic serves patients of all ages, from young children to seniors, 
            with a philosophy centered on compassionate, gentle, and highly personalized care. 
            We combine state-of-the-art dental technology with a warm, welcoming atmosphere to ensure 
            every visit is as comfortable and stress-free as possible.
          </p>

          <ul className="about-section__list" aria-label="Why choose us checklist">
            {checkItems.map((item, index) => (
              <li key={index} className="about-section__list-item">
                <span className="about-section__check">
                  <IconCheck />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <Link to="/about" className="about-section__btn">
            Learn More About Us
            <IconArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}
