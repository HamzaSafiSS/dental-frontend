import { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import { IconChevronDown, IconPhone } from '../../components/ui/Icons';
import './FaqPage.css';

const FAQ_DATA = [
  {
    category: 'Appointments',
    questions: [
      {
        q: 'How do I book an appointment?',
        a: 'You can book an appointment easily through our online booking system, by calling our office during business hours, or by stopping by the clinic in person.'
      },
      {
        q: 'Can I choose my dentist?',
        a: 'Absolutely! When booking online or over the phone, simply let us know which dentist you prefer to see. We will do our best to accommodate your request based on their availability.'
      },
      {
        q: 'Can I reschedule?',
        a: 'Yes, you can reschedule your appointment. We kindly ask for at least 24 hours notice so that we can offer the time slot to another patient.'
      },
      {
        q: 'What happens if I miss an appointment?',
        a: 'Missed appointments without 24-hour prior notice may be subject to a cancellation fee. We understand emergencies happen, so please call us as soon as possible if you cannot make it.'
      }
    ]
  },
  {
    category: 'New Patients',
    questions: [
      {
        q: 'What should I bring?',
        a: 'Please bring a valid photo ID, your current dental insurance card, and a list of any medications you are currently taking.'
      },
      {
        q: 'How early should I arrive?',
        a: 'We recommend arriving 15 minutes prior to your scheduled appointment time to complete any necessary paperwork and get settled in.'
      },
      {
        q: 'Do I need to complete forms?',
        a: 'Yes. To save time, you can find our new patient forms on our Patient Information page and fill them out online before you arrive.'
      }
    ]
  },
  {
    category: 'Treatments',
    questions: [
      {
        q: 'How often should I visit the dentist?',
        a: 'The American Dental Association recommends a routine checkup and cleaning every six months. However, your dentist may recommend more frequent visits based on your specific oral health needs.'
      },
      {
        q: 'Is teeth whitening safe?',
        a: 'Yes, professional teeth whitening is a very safe procedure when supervised by a dentist. We use specialized products designed to minimize sensitivity and protect your enamel.'
      },
      {
        q: 'How long do implants take?',
        a: 'The dental implant process can take anywhere from 3 to 6 months. This allows time for the implant to properly fuse with your jawbone before the final crown is attached.'
      }
    ]
  },
  {
    category: 'Children',
    questions: [
      {
        q: 'When should my child first visit the dentist?',
        a: 'We recommend scheduling your child’s first visit within six months of their first tooth appearing, or no later than their first birthday.'
      },
      {
        q: 'How often should children have dental checkups?',
        a: 'Just like adults, children should visit the dentist every six months for routine checkups and cleanings.'
      }
    ]
  },
  {
    category: 'Payment',
    questions: [
      {
        q: 'Do you accept insurance?',
        a: 'Yes, we are in-network with many major dental insurance providers. Visit our Insurance & Payment page or call our office to verify if we accept your specific plan.'
      },
      {
        q: 'What payment methods are available?',
        a: 'We accept cash, major credit/debit cards, bank transfers, and mobile payments (like Apple Pay and Google Pay). We also offer flexible financing options for out-of-pocket costs.'
      }
    ]
  }
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState(FAQ_DATA[0].category);
  const [openQuestionIndex, setOpenQuestionIndex] = useState(0);

  const currentCategoryData = FAQ_DATA.find(c => c.category === activeCategory);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setOpenQuestionIndex(0); // Reset open question when switching categories
  };

  const toggleQuestion = (index) => {
    setOpenQuestionIndex(prev => (prev === index ? null : index));
  };

  return (
    <PublicLayout>
      <div className="faq-page">
        {/* Header */}
        <header className="faq-header">
          <div className="container">
            <span className="faq-badge">Help Center</span>
            <h1>Frequently Asked Questions</h1>
            <p className="subtitle">
              Find answers to common questions about our services, appointments, and policies.
            </p>
          </div>
        </header>

        <main className="container faq-container">
          <div className="faq-layout">
            
            {/* Sidebar Categories */}
            <aside className="faq-sidebar">
              <h3>Categories</h3>
              <ul className="faq-categories">
                {FAQ_DATA.map(cat => (
                  <li key={cat.category}>
                    <button 
                      className={`category-btn ${activeCategory === cat.category ? 'active' : ''}`}
                      onClick={() => handleCategoryClick(cat.category)}
                    >
                      {cat.category}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="faq-contact-card">
                <h4>Still have questions?</h4>
                <p>We're here to help. Contact our support team for more information.</p>
                <Link to="/contact" className="btn btn-outline-primary btn-block mb-3">
                  Contact Us
                </Link>
                <a href="tel:+1234567890" className="phone-link">
                  <IconPhone size={16} /> (123) 456-7890
                </a>
              </div>
            </aside>

            {/* FAQ Accordion */}
            <div className="faq-content">
              <h2 className="faq-category-title">{activeCategory} Questions</h2>
              
              <div className="faq-accordion">
                {currentCategoryData.questions.map((item, idx) => {
                  const isOpen = openQuestionIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`faq-item ${isOpen ? 'open' : ''}`}
                    >
                      <button 
                        className="faq-question" 
                        onClick={() => toggleQuestion(idx)}
                        aria-expanded={isOpen}
                      >
                        <span className="question-text">{item.q}</span>
                        <span className="faq-icon">
                          <IconChevronDown size={20} />
                        </span>
                      </button>
                      <div className="faq-answer-wrapper" style={{ height: isOpen ? 'auto' : 0 }}>
                        <div className="faq-answer">
                          <p>{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </main>
      </div>
    </PublicLayout>
  );
}
