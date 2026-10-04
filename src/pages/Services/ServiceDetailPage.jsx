import { useParams, Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import { IconCheck } from '../../components/ui/Icons';
import './ServiceDetailPage.css';

const MOCK_SERVICES = {
  'dental-implants': {
    name: 'Dental Implants',
    heroTitle: 'Restore Your Smile With Dental Implants',
    whatIsIt: 'Dental implants are artificial tooth roots made of titanium that provide a permanent base for fixed or removable replacement teeth. They are the closest you can get to healthy, natural teeth, allowing you to live the way you want to—confidently eating, smiling, and engaging in daily activities.',
    whoNeedsIt: 'Implants are an ideal solution for adults who have lost one or more teeth due to injury, periodontal disease, or other reasons. Good candidates should have healthy gums and enough bone to hold the implant, as well as a commitment to good oral hygiene and regular dental visits.',
    benefits: [
      'Natural appearance and feel',
      'Improved speech and chewing',
      'Long-term tooth replacement',
      'Prevents bone loss',
      'Improved self-confidence'
    ],
    timeline: [
      { title: 'Consultation', desc: 'Comprehensive exam, 3D imaging, and a customized treatment plan.' },
      { title: 'Planning', desc: 'Determining the exact placement of the implant for optimal stability.' },
      { title: 'Implant Placement', desc: 'The titanium post is surgically placed into the jawbone.' },
      { title: 'Restoration', desc: 'After healing, a custom-made crown is attached to the implant.' }
    ],
    whatToExpect: 'The implant process requires multiple visits over several months. Most of that time is devoted to healing and waiting for the growth of new bone in your jaw (osseointegration). Depending on your specific condition, certain steps can sometimes be combined. We provide profound local anesthesia during the placement, making the procedure virtually painless.',
    faqs: [
      {
        question: 'Are dental implants painful?',
        answer: 'Most patients report that the procedure is less painful than a tooth extraction. We use local anesthesia during the surgery, and mild soreness afterward can usually be managed with over-the-counter pain medication.'
      },
      {
        question: 'How long do implants last?',
        answer: 'With proper care, oral hygiene, and regular dental checkups, dental implants can last a lifetime.'
      },
      {
        question: 'Am I a candidate for implants?',
        answer: 'Most adults in good general health are candidates. The primary requirement is having adequate bone in your jaw to support the implant.'
      }
    ],
    related: [
      { name: 'Crowns', slug: 'crowns' },
      { name: 'Bridges', slug: 'bridges' },
      { name: 'Restorative Dentistry', slug: 'restorative-dentistry' }
    ]
  }
};

const DEFAULT_SERVICE = {
  name: 'Dental Treatment',
  heroTitle: 'Comprehensive Dental Care for Your Smile',
  whatIsIt: 'We provide state-of-the-art treatment tailored to your specific dental needs to ensure a healthy, beautiful smile.',
  whoNeedsIt: 'Anyone looking to improve or maintain their oral health can benefit from our personalized treatment plans.',
  benefits: [
    'Professional and gentle care',
    'Modern techniques',
    'Long-lasting results',
    'Improved oral health'
  ],
  timeline: [
    { title: 'Consultation', desc: 'We evaluate your oral health and discuss your goals.' },
    { title: 'Treatment Plan', desc: 'A customized plan is created specifically for you.' },
    { title: 'Procedure', desc: 'The treatment is carried out using the latest technology.' },
    { title: 'Follow-up', desc: 'We monitor your recovery and ensure optimal results.' }
  ],
  whatToExpect: 'You can expect a comfortable, stress-free experience. Our team will guide you through every step of the process and answer any questions you may have.',
  faqs: [
    {
      question: 'Do you accept insurance?',
      answer: 'We accept most major dental insurance plans. Please contact our office to verify your specific coverage.'
    },
    {
      question: 'How do I schedule an appointment?',
      answer: 'You can schedule an appointment by calling our office directly or using our online booking system.'
    }
  ],
  related: [
    { name: 'General Dentistry', slug: 'general-dentistry' },
    { name: 'Cosmetic Dentistry', slug: 'cosmetic-dentistry' }
  ]
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  
  // Use specific mock data if available, otherwise fallback to generic structure
  const data = MOCK_SERVICES[slug] || { ...DEFAULT_SERVICE, name: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) };

  return (
    <PublicLayout>
      <main className="service-detail">
        
        {/* ── Hero ── */}
        <div className="service-detail__hero">
          <div className="container">
            <span className="service-detail__hero-label">{data.name}</span>
            <h1 className="service-detail__hero-heading">{data.heroTitle}</h1>
          </div>
        </div>

        <div className="container service-detail__container">
          
          {/* ── Main Content ── */}
          <article className="service-detail__main">
            
            <section className="service-detail__section">
              <h2>What Are {data.name}?</h2>
              <p>{data.whatIsIt}</p>
            </section>

            <section className="service-detail__section">
              <h2>Who May Need {data.name}?</h2>
              <p>{data.whoNeedsIt}</p>
            </section>

            <section className="service-detail__section">
              <h2>Benefits</h2>
              <div className="service-detail__benefits">
                {data.benefits.map((benefit, idx) => (
                  <div key={idx} className="service-detail__benefit-item">
                    <div className="service-detail__benefit-icon">
                      <IconCheck size={20} />
                    </div>
                    {benefit}
                  </div>
                ))}
              </div>
            </section>

            <section className="service-detail__section">
              <h2>Treatment Process</h2>
              <div className="service-detail__timeline">
                {data.timeline.map((step, idx) => (
                  <div key={idx} className="service-detail__timeline-item">
                    <div className="service-detail__timeline-step">{idx + 1}</div>
                    <div className="service-detail__timeline-content">
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="service-detail__section">
              <h2>What to Expect</h2>
              <p>{data.whatToExpect}</p>
            </section>

            <section className="service-detail__section">
              <h2>Frequently Asked Questions</h2>
              <div className="service-detail__faq">
                {data.faqs.map((faq, idx) => (
                  <details key={idx}>
                    <summary>{faq.question}</summary>
                    <div className="service-detail__faq-content">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

          </article>

          {/* ── Sidebar ── */}
          <aside className="service-detail__sidebar">
            
            {/* CTA Widget */}
            <div className="service-detail__sidebar-widget service-detail__cta-widget">
              <h3>Ready to Transform Your Smile?</h3>
              <p>Book a consultation today to see if {data.name.toLowerCase()} are right for you.</p>
              <Link to="/book-appointment" className="service-detail__btn-light">
                Schedule a Consultation
              </Link>
            </div>

            {/* Related Services Widget */}
            <div className="service-detail__sidebar-widget">
              <h3>Related Services</h3>
              <div className="service-detail__related-list">
                {data.related.map((service, idx) => (
                  <Link 
                    key={idx} 
                    to={`/services/${service.slug}`} 
                    className="service-detail__related-link"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </main>
    </PublicLayout>
  );
}
