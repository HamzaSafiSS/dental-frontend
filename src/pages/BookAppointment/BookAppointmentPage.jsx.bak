import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import { 
  IconCalendar, 
  IconCheck, 
  IconArrowRight, 
  IconMapPin, 
  IconPhone 
} from '../../components/ui/Icons';
import { CLINIC_DEFAULTS } from '../../config/constants';
import { submitGuestAppointment } from '../../services/appointmentService';
import { useAuth } from '../../context/AuthContext';
import './BookAppointmentPage.css';

const SERVICES = [
  'General Dentistry',
  'Cleaning',
  'Cosmetic Dentistry',
  'Orthodontics',
  'Pediatric Dentistry',
  'Dental Implants',
  'Emergency',
  'Consultation',
  'Other'
];

const DENTISTS = [
  { id: 'any', name: 'Any Available Dentist' },
  { id: '1', name: 'Dr. Sarah Ahmed (General & Cosmetic)' },
  { id: '2', name: 'Dr. Michael Chen (Orthodontist)' },
  { id: '3', name: 'Dr. Emily Davis (Pediatric)' }
];

const TIME_SLOTS = [
  '9:00 AM',
  '10:00 AM',
  '11:30 AM',
  '2:00 PM',
  '4:00 PM'
];

export default function BookAppointmentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    dentistId: '',
    dentistName: '',
    date: '',
    time: '',
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    patientType: 'new',
    contactMethod: 'phone',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('bookingState');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed.formData);
      setStep(parsed.step);
      sessionStorage.removeItem('bookingState');
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
        patientType: 'existing'
      }));
    }
  }, [user]);

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => {
    if (user && step === 6) {
      setStep(4);
    } else {
      setStep(s => s - 1);
    }
  };

  const handleExistingPatient = () => {
    sessionStorage.setItem('bookingState', JSON.stringify({ formData, step: 6 }));
    navigate('/login', { state: { from: location } });
  };
  
  const handleNewPatient = () => {
    sessionStorage.setItem('bookingState', JSON.stringify({ formData, step: 6 }));
    navigate('/register', { state: { from: location } });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (service) => {
    setFormData(prev => ({ ...prev, service }));
    handleNext();
  };

  const handleDentistSelect = (dentistId, dentistName) => {
    setFormData(prev => ({ ...prev, dentistId, dentistName }));
    handleNext();
  };

  const handleTimeSelect = (time) => {
    setFormData(prev => ({ ...prev, time }));
    if (user) {
      setStep(6);
    } else {
      setStep(5);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    
    try {
      await submitGuestAppointment(formData);
      setIsConfirmed(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong while submitting your request. Please call us directly.';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render Steps ──
  const renderStep1 = () => (
    <div className="booking-step animation-fade-in">
      <h2>Step 1: Select Service</h2>
      <p className="booking-step-desc">What type of dental care do you need today?</p>
      <div className="service-grid">
        {SERVICES.map(svc => (
          <button 
            key={svc} 
            className={`selection-card ${formData.service === svc ? 'selected' : ''}`}
            onClick={() => handleServiceSelect(svc)}
          >
            <span>{svc}</span>
            <IconArrowRight size={16} />
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="booking-step animation-fade-in">
      <h2>Step 2: Select Dentist</h2>
      <p className="booking-step-desc">Do you have a preferred provider?</p>
      <div className="dentist-grid">
        {DENTISTS.map(d => (
          <button 
            key={d.id} 
            className={`selection-card ${formData.dentistId === d.id ? 'selected' : ''}`}
            onClick={() => handleDentistSelect(d.id, d.name)}
          >
            <div className="dentist-card-info">
              {d.id !== 'any' && <div className="dentist-avatar">{d.name.charAt(4)}</div>}
              {d.id === 'any' && <div className="dentist-avatar any">A</div>}
              <span>{d.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="booking-step animation-fade-in">
      <h2>Step 3: Select Date</h2>
      <p className="booking-step-desc">When would you like to come in?</p>
      <div className="date-picker-wrapper">
        <label htmlFor="date">Preferred Date</label>
        <input 
          type="date" 
          id="date"
          name="date" 
          className="form-control"
          value={formData.date}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]} // Today
        />
        <button 
          className="btn btn-primary mt-4" 
          onClick={handleNext}
          disabled={!formData.date}
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="booking-step animation-fade-in">
      <h2>Step 4: Select Time</h2>
      <p className="booking-step-desc">Available slots for {formData.date}</p>
      <div className="time-grid">
        {TIME_SLOTS.map(t => (
          <button 
            key={t}
            className={`selection-card time-card ${formData.time === t ? 'selected' : ''}`}
            onClick={() => handleTimeSelect(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="booking-step animation-fade-in">
      <h2>Step 5: Patient Authentication</h2>
      <p className="booking-step-desc">Are you a new patient?</p>
      <div className="form-group full-width" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', gap: '15px', flexDirection: 'column', maxWidth: '300px' }}>
          <button className="btn btn-primary" onClick={handleNewPatient}>
            Yes, I am a new patient
          </button>
          <button className="btn btn-outline-primary" onClick={handleExistingPatient}>
            No, I am an existing patient
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="booking-step animation-fade-in">
      <h2>Step 6: Reason for Visit</h2>
      <p className="booking-step-desc">Please briefly describe the reason for your appointment so we can best prepare for your visit.</p>
      
      <div className="form-group">
        <textarea 
          name="reason" 
          className="form-control textarea" 
          rows="5"
          value={formData.reason}
          onChange={handleChange}
          placeholder="I have a toothache... / I need a routine checkup..."
        ></textarea>
      </div>

      <div className="booking-summary">
        <h3>Appointment Summary</h3>
        <ul>
          <li><strong>Service:</strong> {formData.service}</li>
          <li><strong>Dentist:</strong> {formData.dentistName}</li>
          <li><strong>Date:</strong> {formData.date}</li>
          <li><strong>Time:</strong> {formData.time}</li>
        </ul>
      </div>

      {errorMsg && (
        <div className="form-error-banner" style={{ marginTop: '20px' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <button 
        className={`btn btn-primary mt-6 btn-block ${isSubmitting ? 'loading' : ''}`}
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting Request...' : 'Submit Request'}
      </button>
    </div>
  );

  const renderConfirmation = () => (
    <div className="confirmation-view animation-fade-in">
      <div className="success-icon-wrapper">
        <IconCheck size={48} className="success-icon" />
      </div>
      <h2>Your Appointment Request Has Been Received</h2>
      <p className="confirmation-msg">
        Thank you, {formData.fullName}. We have received your request and will contact you shortly via {formData.contactMethod} to confirm.
      </p>

      <div className="confirmation-details">
        <div className="detail-row">
          <span>Date</span>
          <strong>{formData.date}</strong>
        </div>
        <div className="detail-row">
          <span>Time</span>
          <strong>{formData.time}</strong>
        </div>
        <div className="detail-row">
          <span>Dentist</span>
          <strong>{formData.dentistName}</strong>
        </div>
        <div className="detail-row">
          <span>Service</span>
          <strong>{formData.service}</strong>
        </div>
      </div>

      <div className="clinic-contact-info">
        <div className="contact-item">
          <IconPhone size={20} />
          <span>{CLINIC_DEFAULTS.phone}</span>
        </div>
        <div className="contact-item">
          <IconMapPin size={20} />
          <span>{CLINIC_DEFAULTS.address}</span>
        </div>
      </div>

      <div className="confirmation-actions">
        <Link to="/" className="btn btn-outline-primary">Return Home</Link>
        <Link to="/patient-info" className="btn btn-primary">View Patient Resources</Link>
      </div>
    </div>
  );

  return (
    <PublicLayout>
      <div className="book-appointment-page">
        {/* Header */}
        <header className="booking-header">
          <div className="container">
            <h1>Book Your Appointment</h1>
            <p>Schedule a visit with our specialists in just a few clicks.</p>
          </div>
        </header>

        <main className="container booking-container">
          {!isConfirmed ? (
            <div className="booking-form-wrapper">
              {/* Progress Bar */}
              <div className="booking-progress">
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${((step - 1) / 5) * 100}%` }}></div>
                </div>
                <div className="progress-labels">
                  <span>Step {step} of 6</span>
                  {step > 1 && (
                    <button className="btn-back" onClick={handlePrev}>
                      Back
                    </button>
                  )}
                </div>
              </div>

              {/* Form Steps */}
              <div className="booking-form-content">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
                {step === 5 && renderStep5()}
                {step === 6 && renderStep6()}
              </div>
            </div>
          ) : (
            renderConfirmation()
          )}
        </main>
      </div>
    </PublicLayout>
  );
}
