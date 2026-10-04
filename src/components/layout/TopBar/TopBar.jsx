import { useState, useEffect } from 'react';
import {
  IconMapPin,
  IconClock,
  IconPhone,
  IconFacebook,
  IconInstagram,
  IconTwitter,
  IconYoutube,
} from '../../ui/Icons';
import { getClinicInfo } from '../../../services/clinicService';
import { CLINIC_DEFAULTS, SOCIAL_LINKS } from '../../../config/constants';
import './TopBar.css';

/**
 * Top Information Bar — slim bar at the very top of every page.
 *
 * Displays:
 *  📍 Clinic address
 *  🕐 Opening hours
 *  ☎  Phone number
 *  🚨 Emergency contact (if available)
 *  🔗 Social media icons
 *
 * Fetches data from backend `/api/v1/public/clinic`.
 * Falls back to CLINIC_DEFAULTS when backend is unavailable.
 */
export default function TopBar() {
  const [clinic, setClinic] = useState(CLINIC_DEFAULTS);

  useEffect(() => {
    let cancelled = false;

    async function fetchClinic() {
      try {
        const data = await getClinicInfo();
        if (!cancelled && data) {
          setClinic((prev) => ({ ...prev, ...data }));
        }
      } catch {
        // Backend unreachable — defaults are already set
      }
    }

    fetchClinic();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="top-bar" id="top-bar" role="banner">
      <div className="top-bar__container container">

        {/* ── Left: Contact information ── */}
        <div className="top-bar__info">

          {/* Address */}
          <span className="top-bar__item">
            <IconMapPin size={14} className="top-bar__icon" />
            <span>{clinic.address}</span>
          </span>

          <span className="top-bar__divider" aria-hidden="true" />

          {/* Opening Hours */}
          <span className="top-bar__item">
            <IconClock size={14} className="top-bar__icon" />
            <span>{clinic.openingHours}</span>
          </span>

          <span className="top-bar__divider" aria-hidden="true" />

          {/* Phone */}
          <span className="top-bar__item">
            <a href={`tel:${clinic.phone}`} aria-label={`Call us at ${clinic.phone}`}>
              <IconPhone size={14} className="top-bar__icon" />
              <span>{clinic.phone}</span>
            </a>
          </span>

          {/* Emergency Contact */}
          {clinic.emergencyContact && (
            <>
              <span className="top-bar__divider" aria-hidden="true" />
              <span className="top-bar__emergency">
                <span className="top-bar__emergency-dot" />
                <a
                  href={`tel:${clinic.emergencyContact}`}
                  aria-label={`Emergency: ${clinic.emergencyContact}`}
                >
                  Emergency: {clinic.emergencyContact}
                </a>
              </span>
            </>
          )}
        </div>

        {/* ── Right: Social media icons ── */}
        <div className="top-bar__social" aria-label="Social media links">
          <a
            href={SOCIAL_LINKS.facebook}
            className="top-bar__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <IconFacebook size={14} />
          </a>
          <a
            href={SOCIAL_LINKS.instagram}
            className="top-bar__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <IconInstagram size={14} />
          </a>
          <a
            href={SOCIAL_LINKS.twitter}
            className="top-bar__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <IconTwitter size={14} />
          </a>
          <a
            href={SOCIAL_LINKS.youtube}
            className="top-bar__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <IconYoutube size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
