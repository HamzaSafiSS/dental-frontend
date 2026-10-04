import { 
  IconCalendar, 
  IconEmergency 
} from '../../ui/Icons';
import './TrustStrip.css';

// Reusing some of the icons previously created in Hero
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

export default function TrustStrip() {
  return (
    <section className="trust-strip">
      <div className="container">
        <h2 className="trust-strip__heading">Your Smile Is Our Priority</h2>
        
        <div className="trust-strip__container">
          <div className="trust-strip__item">
            <div className="trust-strip__icon">
              <IconDentist size={22} />
            </div>
            <span className="trust-strip__text">Experienced Dental Team</span>
          </div>

          <div className="trust-strip__item">
            <div className="trust-strip__icon">
              <IconTech size={22} />
            </div>
            <span className="trust-strip__text">Modern Equipment</span>
          </div>

          <div className="trust-strip__item">
            <div className="trust-strip__icon">
              <IconChild size={22} />
            </div>
            <span className="trust-strip__text">Family-Friendly Care</span>
          </div>

          <div className="trust-strip__item">
            <div className="trust-strip__icon">
              <IconCalendar size={22} />
            </div>
            <span className="trust-strip__text">Flexible Appointments</span>
          </div>

          <div className="trust-strip__item">
            <div className="trust-strip__icon">
              <IconEmergency size={22} />
            </div>
            <span className="trust-strip__text">Emergency Dental Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
