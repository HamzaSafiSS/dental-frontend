import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import { 
  IconCheck, 
  IconArrowRight, 
  IconPhone,
  IconCalendar
} from '../../components/ui/Icons';
import './InsurancePaymentPage.css';

const ACCEPTED_INSURANCE = [
  'Delta Dental',
  'Cigna',
  'MetLife',
  'Aetna',
  'Blue Cross Blue Shield',
  'Guardian',
  'UnitedHealthcare',
  'Humana'
];

const PAYMENT_OPTIONS = [
  { id: 'insurance', name: 'Dental Insurance', desc: 'Direct billing to most major providers.' },
  { id: 'cash', name: 'Cash', desc: 'Accepted in-clinic for all services.' },
  { id: 'card', name: 'Credit / Debit Card', desc: 'Visa, Mastercard, and American Express.' },
  { id: 'bank', name: 'Bank Transfer', desc: 'Secure direct deposits.' },
  { id: 'mobile', name: 'Mobile Payment', desc: 'Apple Pay, Google Pay, and local mobile wallets.' }
];

export default function InsurancePaymentPage() {
  return (
    <PublicLayout>
      <div className="finance-page">
        {/* Header */}
        <header className="finance-header">
          <div className="container">
            <span className="finance-badge">Financial Information</span>
            <h1>Insurance & Payment</h1>
            <p className="subtitle">
              We believe quality dental care should be accessible. Here's everything you need to know about our payment options and insurance policies.
            </p>
          </div>
        </header>

        <main className="container finance-container">
          
          {/* Insurance Section */}
          <section className="finance-section">
            <div className="finance-content-block">
              <h2>Accepted Insurance Providers</h2>
              <p className="section-desc">
                We are proud to be in-network with many major dental insurance providers. Our experienced administrative team will gladly help you navigate your benefits, file claims on your behalf, and maximize your coverage.
              </p>
              
              <div className="insurance-grid">
                {ACCEPTED_INSURANCE.map((provider, idx) => (
                  <div key={idx} className="insurance-card animation-fade-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className="check-icon"><IconCheck size={20} /></div>
                    <span>{provider}</span>
                  </div>
                ))}
              </div>
              
              <div className="insurance-note">
                <p><strong>Don't see your provider?</strong> We accept many other plans not listed here. Please contact our office with your insurance details to verify your coverage.</p>
              </div>
            </div>
          </section>

          {/* Payment Options Section */}
          <section className="finance-section bg-light" id="payment-options">
            <div className="finance-content-block">
              <h2>Payment Options</h2>
              <p className="section-desc">
                For out-of-pocket costs, co-pays, or patients without insurance, we offer a variety of flexible payment methods to suit your needs.
              </p>
              
              <div className="payment-grid">
                {PAYMENT_OPTIONS.map((option, idx) => (
                  <div key={option.id} className="payment-card animation-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <h3>{option.name}</h3>
                    <p>{option.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Treatment Costs & CTA Section */}
          <section className="finance-section cost-section">
            <div className="cost-card animation-fade-up">
              <h2>Treatment Costs</h2>
              <div className="cost-content">
                <p>
                  We are committed to full transparency regarding the cost of your dental care. Rather than showing potentially misleading fixed prices, we want to ensure you get an accurate estimate.
                </p>
                <div className="cost-highlight">
                  Treatment costs vary depending on your individual needs. Contact us for a consultation and a personalized treatment estimate before any work begins.
                </div>
                
                <div className="cost-actions">
                  <Link to="/contact" className="btn btn-primary btn-lg">
                    <IconPhone size={20} /> Ask About Treatment Costs
                  </Link>
                  <Link to="/book-appointment" className="btn btn-outline-primary btn-lg">
                    <IconCalendar size={20} /> Book a Consultation
                  </Link>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </PublicLayout>
  );
}
