import { Link } from 'react-router-dom';
import { CLINIC_DEFAULTS } from '../../../config/constants';
import { 
  IconMapPin, 
  IconPhone, 
  IconMail, 
  IconClock 
} from '../../ui/Icons';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        
        {/* Footer Top Grid */}
        <div className="footer-grid">
          
          {/* Column 1: Brand & Description */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5.5c-1.5-2-4-2.5-5.5-1S4 7 5.5 9.5C7 12 12 19 12 19s5-7 6.5-9.5S15 2 13.5 3.5 13.5 7.5 12 5.5z" />
                </svg>
              </div>
              <div className="footer-logo-text">
                <span className="footer-logo-name">Bright Smiles</span>
                <span className="footer-logo-tagline">Dental Care</span>
              </div>
            </Link>
            <p className="footer-desc">
              Providing compassionate, comprehensive, and advanced dental care for the entire family in a comfortable and modern environment.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link" aria-label="Facebook">FB</a>
              <a href="#" className="social-link" aria-label="Instagram">IG</a>
              <a href="#" className="social-link" aria-label="Twitter">TW</a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/dentists">Dentists</Link></li>
              <li><Link to="/patient-info">Patients</Link></li>
              <li><Link to="/faqs">FAQs</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Dental Services */}
          <div className="footer-col">
            <h4 className="footer-heading">Dental Services</h4>
            <ul className="footer-links">
              <li><Link to="/services/general-dentistry">General Dentistry</Link></li>
              <li><Link to="/services/pediatric-dentistry">Pediatric Dentistry</Link></li>
              <li><Link to="/services/cosmetic-dentistry">Cosmetic Dentistry</Link></li>
              <li><Link to="/services/dental-implants">Implants</Link></li>
              <li><Link to="/services/orthodontics">Orthodontics</Link></li>
              <li><Link to="/services/preventive-care">Preventive Care</Link></li>
              <li><Link to="/emergency">Emergency Care</Link></li>
            </ul>
          </div>

          {/* Column 4: Patient Information */}
          <div className="footer-col">
            <h4 className="footer-heading">Patient Info</h4>
            <ul className="footer-links">
              <li><Link to="/patient-info#new-patients">New Patients</Link></li>
              <li><Link to="/patient-info#forms">Patient Forms</Link></li>
              <li><Link to="/insurance">Insurance</Link></li>
              <li><Link to="/insurance#payment-options">Payment Options</Link></li>
              <li><Link to="/faqs">FAQs</Link></li>
            </ul>
          </div>

          {/* Column 5: Contact Info */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact-list">
              <li>
                <IconMapPin size={16} className="contact-icon" />
                <span>{CLINIC_DEFAULTS.address}</span>
              </li>
              <li>
                <IconPhone size={16} className="contact-icon" />
                <a href={`tel:${CLINIC_DEFAULTS.phone}`}>{CLINIC_DEFAULTS.phone}</a>
              </li>
              <li>
                <IconMail size={16} className="contact-icon" />
                <a href={`mailto:${CLINIC_DEFAULTS.email}`}>{CLINIC_DEFAULTS.email}</a>
              </li>
              <li>
                <IconClock size={16} className="contact-icon" />
                <span>
                  Mon-Fri: 8:00 AM - 6:00 PM<br/>
                  Sat: 9:00 AM - 2:00 PM<br/>
                  Sun: Closed
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {currentYear} Bright Smiles Dental Care. All Rights Reserved.
          </div>
          <div className="footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="separator">|</span>
            <Link to="/terms-of-service">Terms of Service</Link>
            <span className="separator">|</span>
            <Link to="/accessibility">Accessibility</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
