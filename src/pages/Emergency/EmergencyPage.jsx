import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import { 
  IconPhone, 
  IconCalendar, 
  IconClock, 
  IconMapPin 
} from '../../components/ui/Icons';
import { CLINIC_DEFAULTS } from '../../config/constants';
import './EmergencyPage.css';

const EMERGENCY_SITUATIONS = [
  { id: 1, title: 'Severe Toothache', desc: 'Intense, unyielding pain that prevents sleep or normal activities.' },
  { id: 2, title: 'Broken or Chipped Tooth', desc: 'A significantly cracked or fractured tooth, especially if painful or sharp.' },
  { id: 3, title: 'Dental Injury/Knocked Out Tooth', desc: 'Keep the tooth moist and get to the clinic within 30 minutes if possible.' },
  { id: 4, title: 'Facial Swelling', desc: 'Swelling in the face, jaw, or gums indicating a potential serious infection.' },
  { id: 5, title: 'Lost Filling or Crown', desc: 'Leaves the tooth vulnerable and often highly sensitive to temperature.' },
  { id: 6, title: 'Uncontrollable Dental Bleeding', desc: 'Heavy bleeding from the gums or mouth that does not stop with pressure.' }
];

export default function EmergencyPage() {
  return (
    <PublicLayout>
      <div className="emergency-page">
        {/* Header Alert */}
        <header className="emergency-header">
          <div className="container">
            <div className="emergency-alert-icon">⚠️</div>
            <h1>Need Urgent Dental Care?</h1>
            <p className="subtitle">
              Don't wait if you're in pain. We reserve time in our daily schedule to handle dental emergencies promptly.
            </p>
            <div className="emergency-actions">
              <a href={`tel:${CLINIC_DEFAULTS.phone}`} className="btn btn-white btn-lg pulse-animation">
                <IconPhone size={20} /> Call Now: {CLINIC_DEFAULTS.phone}
              </a>
              <Link to="/book-appointment" className="btn btn-outline-white btn-lg">
                <IconCalendar size={20} /> Request Emergency Appointment
              </Link>
            </div>
          </div>
        </header>

        <main className="container emergency-container">
          
          <div className="emergency-layout">
            <div className="emergency-content">
              <h2>Common Dental Emergencies</h2>
              <p className="emergency-desc">
                If you are experiencing any of the following symptoms, please contact our clinic immediately. Delaying treatment for a dental emergency can lead to permanent damage or more extensive and expensive treatment later.
              </p>
              
              <div className="emergency-grid">
                {EMERGENCY_SITUATIONS.map((sit, idx) => (
                  <div key={sit.id} className="emergency-card animation-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <h3>{sit.title}</h3>
                    <p>{sit.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="emergency-sidebar">
              <div className="emergency-contact-box">
                <h3>Emergency Contact</h3>
                <div className="contact-detail">
                  <IconPhone size={24} className="text-red" />
                  <div>
                    <strong>Direct Line</strong>
                    <a href={`tel:${CLINIC_DEFAULTS.phone}`}>{CLINIC_DEFAULTS.phone}</a>
                  </div>
                </div>
                <div className="contact-detail">
                  <IconClock size={24} className="text-red" />
                  <div>
                    <strong>Clinic Hours</strong>
                    <span>{CLINIC_DEFAULTS.openingHours}</span>
                    <p className="text-sm mt-1">If calling after hours, listen to our voicemail for the on-call dentist's emergency number.</p>
                  </div>
                </div>
                <div className="contact-detail">
                  <IconMapPin size={24} className="text-red" />
                  <div>
                    <strong>Location</strong>
                    <span>{CLINIC_DEFAULTS.address}</span>
                  </div>
                </div>
              </div>
              
              <div className="emergency-warning bg-light">
                <h4>Medical Emergency?</h4>
                <p>If you are experiencing difficulty breathing, swallowing, or severe bleeding that will not stop, please call <strong>911</strong> or go to your nearest hospital emergency room immediately.</p>
              </div>
            </aside>
          </div>

        </main>
      </div>
    </PublicLayout>
  );
}
