import { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import { 
  IconPhone, 
  IconMapPin, 
  IconClock, 
  IconMail 
} from '../../components/ui/Icons';
import './ContactPage.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      
      // Reset success state after a few seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <PublicLayout>
      <div className="contact-page">
        {/* Header */}
        <header className="contact-header">
          <div className="container">
            <span className="contact-badge">Get in Touch</span>
            <h1>Contact Us</h1>
            <p className="subtitle">
              We're here to answer your questions and help you schedule your next visit. Reach out to us via phone, email, or by visiting our clinic.
            </p>
          </div>
        </header>

        <main className="container contact-container">
          
          {/* Emergency Banner */}
          <div className="contact-emergency-banner animation-fade-up">
            <div className="emergency-banner-content">
              <div className="emergency-icon">⚠️</div>
              <div className="emergency-text">
                <h2>Experiencing a Dental Emergency?</h2>
                <p>We provide urgent care for severe toothaches, broken teeth, and other emergencies.</p>
              </div>
            </div>
            <div className="emergency-actions">
              <a href="tel:+251000000000" className="btn btn-white pulse-animation">
                Call Now: +251 XXX XXX XXX
              </a>
              <Link to="/emergency" className="btn btn-outline-white">
                View Emergency Info
              </Link>
            </div>
          </div>

          <div className="contact-layout">
            {/* Left Column: Info & Hours */}
            <div className="contact-info-col">
              
              <div className="info-card animation-fade-up" style={{ animationDelay: '0.1s' }}>
                <h3>Contact Information</h3>
                <ul className="info-list">
                  <li>
                    <IconMapPin size={24} className="info-icon" />
                    <div>
                      <strong>Address</strong>
                      <p>123 Smile Way<br />Addis Ababa, Ethiopia</p>
                    </div>
                  </li>
                  <li>
                    <IconPhone size={24} className="info-icon" />
                    <div>
                      <strong>Phone</strong>
                      <p><a href="tel:+251000000000">+251 XXX XXX XXX</a></p>
                    </div>
                  </li>
                  <li>
                    <IconMail size={24} className="info-icon" />
                    <div>
                      <strong>Email</strong>
                      <p><a href="mailto:info@clinicname.com">info@clinicname.com</a></p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="info-card animation-fade-up" style={{ animationDelay: '0.2s' }}>
                <h3>Opening Hours</h3>
                <ul className="hours-list">
                  <li>
                    <span>Monday &ndash; Friday</span>
                    <span>8:00 AM &ndash; 6:00 PM</span>
                  </li>
                  <li>
                    <span>Saturday</span>
                    <span>9:00 AM &ndash; 2:00 PM</span>
                  </li>
                  <li className="closed">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Right Column: Contact Form */}
            <div className="contact-form-col animation-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="form-card">
                <h2>Send Us a Message</h2>
                <p>Fill out the form below and our team will get back to you as soon as possible.</p>
                
                {isSuccess ? (
                  <div className="form-success">
                    <div className="success-icon">✓</div>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. We will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Name</label>
                        <input 
                          type="text" 
                          name="name" 
                          className="form-control" 
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          className="form-control" 
                          placeholder="Your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Email</label>
                        <input 
                          type="email" 
                          name="email" 
                          className="form-control" 
                          placeholder="Your email address"
                          value={formData.email}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Subject</label>
                        <input 
                          type="text" 
                          name="subject" 
                          className="form-control" 
                          placeholder="How can we help?"
                          value={formData.subject}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Message</label>
                      <textarea 
                        name="message" 
                        className="form-control textarea" 
                        placeholder="Write your message here..."
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary btn-submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="contact-map-section animation-fade-up" style={{ animationDelay: '0.4s' }}>
            <h2>Find Us</h2>
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126115.11523450946!2d38.70247614051016!3d9.010793444005273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1714488392110!5m2!1sen!2sus" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic Location Map"
              ></iframe>
            </div>
          </div>

        </main>
      </div>
    </PublicLayout>
  );
}
