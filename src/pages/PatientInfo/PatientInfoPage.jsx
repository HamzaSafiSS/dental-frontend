import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import { 
  IconCheck, 
  IconCalendar, 
  IconClock, 
  IconPhone,
  IconArrowRight 
} from '../../components/ui/Icons';
import './PatientInfoPage.css';

/**
 * PatientInfoPage — Important patient-focused page.
 * Includes information on new patients, registration, preparation,
 * the first visit process, and online forms.
 */
export default function PatientInfoPage() {
  return (
    <PublicLayout>
      <div className="patient-info-page">
        {/* Premium Page Header */}
        <header className="patient-info-hero">
          <div className="patient-info-hero-bg">
             <div className="patient-info-hero-overlay"></div>
          </div>
          <div className="container patient-info-hero-content">
            <span className="patient-info-hero-badge">Patient Resources</span>
            <h1>Patient Information</h1>
            <p className="subtitle">Everything you need to know before, during, and after your visit to Bright Smiles Dental Care.</p>
          </div>
        </header>

        <div className="container patient-info-container">
          <div className="patient-info-content">
            
            {/* New Patients Section */}
            <section className="info-section" id="new-patients">
              <h2>New Patients</h2>
              <p>
                Welcome to Bright Smiles Dental Care! We are thrilled to have you join our dental family. 
                Our goal is to make your first visit—and every visit after—as comfortable and stress-free as possible.
              </p>

              <div className="info-grid">
                <div className="info-card">
                  <div className="info-card-icon">
                    <IconCheck size={24} />
                  </div>
                  <h3>What to Bring</h3>
                  <ul>
                    <li>Your valid photo ID (Driver's License or Passport)</li>
                    <li>Current dental insurance card</li>
                    <li>List of current medications and dosages</li>
                    <li>Previous dental X-rays (if available)</li>
                  </ul>
                </div>
                
                <div className="info-card">
                  <div className="info-card-icon">
                    <IconClock size={24} />
                  </div>
                  <h3>Arrival Instructions</h3>
                  <ul>
                    <li>Arrive 15 minutes early to complete any remaining paperwork.</li>
                    <li>Check in with our friendly front desk receptionists.</li>
                    <li>Relax in our comfortable waiting area with complimentary beverages.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Registration & Insurance */}
            <section className="info-section bg-light" id="insurance">
              <div className="split-content">
                <div className="split-text">
                  <h2>Registration & Medical History</h2>
                  <p>
                    For your convenience, we recommend filling out your registration and medical history forms online before your appointment. This allows us to review your health background in advance and tailor our care to your specific needs.
                  </p>
                </div>
                <div className="split-text">
                  <h2>Insurance Information</h2>
                  <p>
                    We accept most major dental insurance plans. Our administrative team will help you maximize your benefits and provide a clear estimate of any out-of-pocket costs prior to your treatment. Please bring your most recent insurance card.
                  </p>
                </div>
              </div>
            </section>

            {/* Your First Visit Process */}
            <section className="info-section process-section">
              <h2>Your First Visit</h2>
              <p className="section-description">We believe in transparent, comprehensive care. Here is what you can expect during your initial consultation:</p>
              
              <div className="process-timeline">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Check-in</h3>
                    <p>Quick registration and health history review.</p>
                  </div>
                </div>
                <div className="process-connector"><IconArrowRight size={20} /></div>
                
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Consultation</h3>
                    <p>Discuss your goals and concerns with the dentist.</p>
                  </div>
                </div>
                <div className="process-connector"><IconArrowRight size={20} /></div>
                
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Examination</h3>
                    <p>Comprehensive exam including necessary digital X-rays.</p>
                  </div>
                </div>
                <div className="process-connector"><IconArrowRight size={20} /></div>
                
                <div className="process-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h3>Diagnosis</h3>
                    <p>Clear explanation of your oral health status.</p>
                  </div>
                </div>
                <div className="process-connector"><IconArrowRight size={20} /></div>
                
                <div className="process-step">
                  <div className="step-number">5</div>
                  <div className="step-content">
                    <h3>Treatment Discussion</h3>
                    <p>Personalized treatment plan tailored for you.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Before & After Care */}
            <section className="info-section">
              <div className="care-instructions">
                <div className="care-box before-care">
                  <h2>Before Your Appointment</h2>
                  <ul>
                    <li>Confirm your appointment via text or email.</li>
                    <li>Continue taking prescribed medications unless instructed otherwise.</li>
                    <li>Brush and floss before arriving.</li>
                    <li>Write down any questions or concerns you want to discuss.</li>
                  </ul>
                </div>
                
                <div className="care-box after-care">
                  <h2>After Your Appointment</h2>
                  <ul>
                    <li>Follow any specific post-treatment instructions provided.</li>
                    <li>Avoid eating or drinking immediately if you had a fluoride treatment.</li>
                    <li>Schedule your next follow-up or routine visit before leaving.</li>
                    <li>Contact us immediately if you experience unexpected pain or complications.</li>
                  </ul>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar / Forms */}
          <aside className="patient-info-sidebar">
            <div className="forms-widget" id="forms">
              <h2>Patient Forms</h2>
              <p>Save time by completing your forms online before your visit.</p>
              
              <div className="forms-buttons">
                <button className="btn btn-outline-primary form-btn">
                  <span>New Patient Form</span>
                  <IconArrowRight size={16} />
                </button>
                <button className="btn btn-outline-primary form-btn">
                  <span>Medical History Form</span>
                  <IconArrowRight size={16} />
                </button>
                <button className="btn btn-outline-primary form-btn">
                  <span>Consent Form</span>
                  <IconArrowRight size={16} />
                </button>
                <button className="btn btn-outline-primary form-btn">
                  <span>Insurance Information</span>
                  <IconArrowRight size={16} />
                </button>
              </div>
              <p className="forms-note">All submitted data is encrypted and HIPAA compliant.</p>
            </div>

            <div className="contact-widget">
              <h2>Need Help?</h2>
              <p>If you have any questions about our forms or what to expect, give us a call.</p>
              <a href="tel:+1234567890" className="contact-widget-link">
                <IconPhone size={20} />
                (123) 456-7890
              </a>
              <a href="/book-appointment" className="btn btn-primary mt-4">
                <IconCalendar size={16} /> Book Appointment
              </a>
            </div>
          </aside>
        </div>
      </div>
    </PublicLayout>
  );
}
