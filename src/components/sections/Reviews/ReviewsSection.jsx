import { Link } from 'react-router-dom';
import { IconArrowRight } from '../../ui/Icons';
import './ReviewsSection.css';

const REVIEWS_PREVIEW = [
  {
    id: 1,
    rating: 5,
    text: "The entire team made my visit comfortable and stress-free. I've always had anxiety about the dentist, but Dr. Ahmed was incredibly gentle and explained everything perfectly.",
    name: "Sarah T.",
    location: "Addis Ababa",
    treatment: "General Dentistry"
  },
  {
    id: 2,
    rating: 5,
    text: "Absolutely fantastic experience. My kids usually hate going to the dentist, but the pediatric team here is phenomenal. They actually asked when we can go back!",
    name: "Michael B.",
    location: "Addis Ababa",
    treatment: "Pediatric Dentistry"
  },
  {
    id: 3,
    rating: 5,
    text: "I got porcelain veneers done and I couldn't be happier with the results. The attention to detail and the level of care is unmatched. Highly recommend!",
    name: "Elena M.",
    location: "Addis Ababa",
    treatment: "Cosmetic Dentistry"
  }
];

export default function ReviewsSection() {
  return (
    <section className="reviews-section section">
      <div className="container">
        <div className="reviews-section-header">
          <div className="section-title-wrapper">
            <span className="section-badge">Patient Testimonials</span>
            <h2 className="section-title">Trusted by Patients and Families</h2>
          </div>
          <Link to="/reviews" className="btn btn-outline-primary view-all-btn">
            Read All Reviews <IconArrowRight size={16} />
          </Link>
        </div>

        <div className="reviews-grid">
          {REVIEWS_PREVIEW.map((review, idx) => (
            <div 
              key={review.id} 
              className="review-card animation-fade-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="review-stars">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <blockquote className="review-text">
                "{review.text}"
              </blockquote>
              <div className="review-meta">
                <div className="review-author">
                  <span className="review-name">{review.name}</span>
                  {review.location && <span className="review-location"> • {review.location}</span>}
                </div>
                {review.treatment && (
                  <div className="review-treatment">
                    Treatment: <span>{review.treatment}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <div className="reviews-section-footer-mobile">
          <Link to="/reviews" className="btn btn-outline-primary btn-block">
            Read All Reviews <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
