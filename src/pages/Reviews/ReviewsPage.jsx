import { useState } from 'react';
import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import { submitGuestReview } from '../../services/reviewService';
import './ReviewsPage.css';

const INITIAL_REVIEWS_DATA = [
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
  },
  {
    id: 4,
    rating: 5,
    text: "Had a dental emergency on a weekend and they fitted me in immediately. Professional, fast, and completely painless root canal.",
    name: "David K.",
    location: "Addis Ababa",
    treatment: "Emergency Care"
  },
  {
    id: 5,
    rating: 5,
    text: "Invisalign treatment was smooth from start to finish. The clinic is modern, clean, and the staff is always welcoming.",
    name: "Amina Y.",
    location: "Addis Ababa",
    treatment: "Orthodontics"
  },
  {
    id: 6,
    rating: 5,
    text: "Top-notch service! From the front desk to the dental chair, everyone is professional and friendly. Best clinic in the city.",
    name: "John D.",
    location: "Addis Ababa",
    treatment: "Cleaning"
  }
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS_DATA);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    rating: 5,
    name: '',
    location: '',
    treatment: '',
    text: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRating = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitGuestReview({
        name: formData.name.trim() || 'Anonymous',
        rating: formData.rating,
        comment: formData.text,
        treatment: formData.treatment || null,
      });

      const newReview = {
        id: Date.now(),
        ...formData,
        name: formData.name.trim() || 'Anonymous'
      };

      setReviews(prev => [newReview, ...prev]);
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsFormOpen(false);
        setIsSuccess(false);
        setFormData({
          rating: 5,
          name: '',
          location: '',
          treatment: '',
          text: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Failed to submit review:', error);
      setIsSubmitting(false);
      alert('Failed to submit your review. Please try again.');
    }
  };

  return (
    <PublicLayout>
      <div className="reviews-page">
        {/* Header */}
        <header className="reviews-header">
          <div className="container">
            <span className="reviews-badge">Patient Testimonials</span>
            <h1>Trusted by Patients and Families</h1>
            <p className="subtitle">
              Don't just take our word for it. Read what our wonderful patients have to say about their experience with us.
            </p>
          </div>
        </header>

        <main className="container reviews-container">
          
          {/* Reviews Grid */}
          <div className="reviews-grid">
            {reviews.map((review, idx) => (
              <div 
                key={review.id} 
                className="review-card animation-fade-up"
                style={{ animationDelay: `${(idx % 6) * 0.1}s` }} // Prevent massive delays on new reviews
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

          {/* CTA / Form Section */}
          <div className="reviews-cta-wrapper" id="leave-review">
            {!isFormOpen ? (
              <div className="reviews-cta">
                <h2>Are you a satisfied patient?</h2>
                <p>We would love to hear about your experience with our team.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setIsFormOpen(true)}
                >
                  Leave a Review
                </button>
              </div>
            ) : (
              <div className="review-form-container animation-fade-up">
                {isSuccess ? (
                  <div className="review-success">
                    <div className="success-icon-wrapper">
                      <span>✓</span>
                    </div>
                    <h2>Thank you for your feedback!</h2>
                    <p>Your review has been successfully submitted and helps us improve our care.</p>
                  </div>
                ) : (
                  <form className="review-form" onSubmit={handleSubmit}>
                    <h2>Leave a Review</h2>
                    <p>Share your experience with Bright Smiles Dental Care.</p>
                    
                    <div className="form-group rating-group">
                      <label>Rating</label>
                      <div className="rating-selector">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            className={`star-btn ${formData.rating >= star ? 'active' : ''}`}
                            onClick={() => handleRating(star)}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Your Name (or Initial)</label>
                        <input 
                          type="text" 
                          name="name" 
                          className="form-control" 
                          value={formData.name} 
                          onChange={handleChange} 
                          placeholder="e.g. Sarah T."
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Location (Optional)</label>
                        <input 
                          type="text" 
                          name="location" 
                          className="form-control" 
                          value={formData.location} 
                          onChange={handleChange} 
                          placeholder="e.g. Addis Ababa"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Treatment Type (Optional)</label>
                      <select 
                        name="treatment" 
                        className="form-control" 
                        value={formData.treatment} 
                        onChange={handleChange}
                      >
                        <option value="">-- Select Treatment --</option>
                        <option value="General Dentistry">General Dentistry</option>
                        <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                        <option value="Orthodontics">Orthodontics</option>
                        <option value="Pediatric Dentistry">Pediatric Dentistry</option>
                        <option value="Dental Implants">Dental Implants</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Emergency Care">Emergency Care</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Your Review</label>
                      <textarea 
                        name="text" 
                        className="form-control textarea" 
                        rows="4" 
                        value={formData.text} 
                        onChange={handleChange}
                        placeholder="Tell us about your visit..."
                        required
                      ></textarea>
                    </div>

                    <div className="form-actions">
                      <button 
                        type="button" 
                        className="btn btn-outline-primary"
                        onClick={() => setIsFormOpen(false)}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isSubmitting || !formData.text}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </PublicLayout>
  );
}
