import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  IconMenu,
  IconX,
  IconChevronDown,
  IconPhone,
  IconCalendar,
  IconMapPin,
  IconClock,
} from '../../ui/Icons';
import { CLINIC_DEFAULTS } from '../../../config/constants';
import './Navbar.css';

/**
 * Navbar — Main navigation bar.
 *
 * Features:
 *  - Sticky on scroll with shadow
 *  - Desktop: Logo + Nav links + Dropdowns + CTA
 *  - Mobile: Logo + Phone + CTA + Hamburger → Slide-out panel
 */

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  {
    label: 'Services',
    path: '/services',
    dropdown: [
      { label: 'All Services', path: '/services' },
      { label: 'General Dentistry', path: '/services/general-dentistry' },
      { label: 'Cosmetic Dentistry', path: '/services/cosmetic-dentistry' },
      { label: 'Dental Implants', path: '/services/dental-implants' },
      { label: 'Orthodontics', path: '/services/orthodontics' },
      { label: 'Preventive Care', path: '/services/preventive-care' },
    ],
  },
  { label: 'Dentists', path: '/dentists' },
  {
    label: 'Patients',
    path: '/patient-info',
    dropdown: [
      { label: 'Patient Information', path: '/patient-info' },
      { label: 'New Patients', path: '/new-patients' },
      { label: 'Insurance & Payment', path: '/insurance' },
      { label: 'FAQs', path: '/faqs' },
    ],
  },
  { label: 'Before & After', path: '/gallery' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // ── Scroll listener for sticky shadow ──
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Close mobile menu on route change ──
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // ── Lock body scroll when mobile menu is open ──
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`}
        id="main-nav"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar__container container">

          {/* ── Logo ── */}
          <Link to="/" className="navbar__logo" aria-label="Bright Smiles Dental Care — Home">
            <div className="navbar__logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5.5c-1.5-2-4-2.5-5.5-1S4 7 5.5 9.5C7 12 12 19 12 19s5-7 6.5-9.5S15 2 13.5 3.5 13.5 7.5 12 5.5z" />
              </svg>
            </div>
            <div className="navbar__logo-text">
              <span className="navbar__logo-name">Bright Smiles</span>
              <span className="navbar__logo-tagline">Dental Care</span>
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="navbar__nav">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div className="navbar__dropdown" key={link.label}>
                  <Link
                    to={link.path}
                    className={`navbar__link navbar__dropdown-trigger${isActive(link.path) ? ' navbar__link--active' : ''}`}
                  >
                    {link.label}
                    <IconChevronDown size={14} />
                  </Link>
                  <div className="navbar__dropdown-menu">
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className="navbar__dropdown-item"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`navbar__link${isActive(link.path) ? ' navbar__link--active' : ''}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* ── Desktop CTA ── */}
          <Link to="/book-appointment" className="navbar__cta">
            <IconCalendar size={15} />
            Book Appointment
          </Link>

          {/* ── Mobile Controls ── */}
          <div className="navbar__mobile-actions">
            <a
              href={`tel:${CLINIC_DEFAULTS.phone}`}
              className="navbar__mobile-phone"
              aria-label="Call us"
            >
              <IconPhone size={18} />
            </a>
            <Link to="/book-appointment" className="navbar__mobile-cta">
              <IconCalendar size={14} />
              <span>Book</span>
            </Link>
            <button
              className="navbar__hamburger"
              onClick={toggleMobile}
              aria-label="Open menu"
              aria-expanded={isMobileOpen}
            >
              <IconMenu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Overlay ── */}
      <div
        className={`navbar__mobile-overlay${isMobileOpen ? ' navbar__mobile-overlay--open' : ''}`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* ── Mobile Slide-out Menu ── */}
      <div
        className={`navbar__mobile-menu${isMobileOpen ? ' navbar__mobile-menu--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header */}
        <div className="navbar__mobile-header">
          <Link to="/" className="navbar__logo" onClick={closeMobile}>
            <div className="navbar__logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5.5c-1.5-2-4-2.5-5.5-1S4 7 5.5 9.5C7 12 12 19 12 19s5-7 6.5-9.5S15 2 13.5 3.5 13.5 7.5 12 5.5z" />
              </svg>
            </div>
            <div className="navbar__logo-text">
              <span className="navbar__logo-name">Bright Smiles</span>
              <span className="navbar__logo-tagline">Dental Care</span>
            </div>
          </Link>
          <button
            className="navbar__mobile-close"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="navbar__mobile-nav">
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              <Link
                to={link.path}
                className={`navbar__mobile-link${isActive(link.path) ? ' navbar__mobile-link--active' : ''}`}
                onClick={closeMobile}
              >
                {link.label}
              </Link>
              {link.dropdown && (
                <>
                  {link.dropdown
                    .filter((sub) => sub.path !== link.path)
                    .map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className="navbar__mobile-sub-link"
                        onClick={closeMobile}
                      >
                        {sub.label}
                      </Link>
                    ))}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Footer with CTA + Contact */}
        <div className="navbar__mobile-footer">
          <Link
            to="/book-appointment"
            className="navbar__mobile-footer-cta"
            onClick={closeMobile}
          >
            <IconCalendar size={18} />
            Book an Appointment
          </Link>
          <div className="navbar__mobile-info">
            <div className="navbar__mobile-info-item">
              <IconPhone size={14} />
              <a href={`tel:${CLINIC_DEFAULTS.phone}`}>{CLINIC_DEFAULTS.phone}</a>
            </div>
            <div className="navbar__mobile-info-item">
              <IconClock size={14} />
              <span>{CLINIC_DEFAULTS.openingHours}</span>
            </div>
            <div className="navbar__mobile-info-item">
              <IconMapPin size={14} />
              <span>{CLINIC_DEFAULTS.address}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
