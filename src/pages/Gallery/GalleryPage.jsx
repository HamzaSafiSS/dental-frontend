import { useState, useRef, useEffect } from 'react';
import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import './GalleryPage.css';

/**
 * Image comparison slider component
 */
function BeforeAfterSlider({ beforeImage, afterImage, alt, title }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleDrag = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let clientX = e.clientX;
    
    // Support for touch events
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
    }

    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    const handleMouseMove = (e) => handleDrag(e);
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove, { passive: false });
    window.addEventListener('touchend', handleMouseUp);
  };

  return (
    <div className="comparison-card">
      {title && <h3 className="comparison-title">{title}</h3>}
      <div 
        className="comparison-container" 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* After Image (Background) */}
        <div className="comparison-image comparison-after">
          <img src={afterImage} alt={`After ${alt}`} draggable="false" />
          <span className="comparison-label label-after">AFTER</span>
        </div>

        {/* Before Image (Foreground, clipped) */}
        <div 
          className="comparison-image comparison-before"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img src={beforeImage} alt={`Before ${alt}`} draggable="false" />
          <span className="comparison-label label-before">BEFORE</span>
        </div>

        {/* Slider Handle */}
        <div 
          className="comparison-slider" 
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="slider-handle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

const CATEGORIES = [
  'All',
  'Cosmetic Dentistry',
  'Whitening',
  'Veneers',
  'Orthodontics',
  'Restorative Dentistry',
  'Implants'
];

// Placeholder fallback images since we don't have actual patient photos.
// In a real scenario, use actual patient photos with consent.
const GALLERY_DATA = [
  {
    id: 1,
    category: 'Whitening',
    title: 'Professional Teeth Whitening',
    before: '/images/gallery/item1-before.jpg', 
    after: '/images/gallery/item1-after.jpg'
  },
  {
    id: 2,
    category: 'Veneers',
    title: 'Porcelain Veneers',
    before: '/images/gallery/item2-before.jpg', 
    after: '/images/gallery/item2-after.jpg'
  },
  {
    id: 3,
    category: 'Orthodontics',
    title: 'Invisalign Treatment (8 Months)',
    before: '/images/gallery/item3-before.jpg',
    after: '/images/gallery/item3-after.jpg'
  },
  {
    id: 4,
    category: 'Implants',
    title: 'Single Tooth Implant',
    before: '/images/gallery/item4-before.jpg',
    after: '/images/gallery/item4-after.jpg'
  },
  {
    id: 5,
    category: 'Cosmetic Dentistry',
    title: 'Complete Smile Makeover',
    before: '/images/gallery/item5-before.jpg',
    after: '/images/gallery/item5-after.jpg'
  },
  {
    id: 6,
    category: 'Restorative Dentistry',
    title: 'Dental Crowns & Bridges',
    before: '/images/gallery/item6-before.jpg',
    after: '/images/gallery/item6-after.jpg'
  }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredData = activeCategory === 'All' 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(item => item.category === activeCategory);

  return (
    <PublicLayout>
      <div className="gallery-page">
        {/* Header */}
        <header className="gallery-hero">
          <div className="gallery-hero-bg"></div>
          <div className="container gallery-hero-content">
            <span className="gallery-hero-badge">Patient Results</span>
            <h1>Before & After Gallery</h1>
            <p className="subtitle">
              Real results from real patients. See how our specialized treatments can transform your smile.
            </p>
            <p className="consent-note">* All images are shared with explicit patient consent.</p>
          </div>
        </header>

        <main className="container gallery-main">
          {/* Categories Filter */}
          <div className={`gallery-filters ${isVisible ? 'fade-in-up' : ''}`}>
            {CATEGORIES.map(category => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="gallery-grid">
            {filteredData.map((item, index) => (
              <div 
                key={item.id} 
                className={`gallery-item ${isVisible ? 'fade-in-up' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BeforeAfterSlider 
                  beforeImage={item.before} 
                  afterImage={item.after} 
                  alt={item.title} 
                  title={item.title} 
                />
              </div>
            ))}
          </div>
          
          {filteredData.length === 0 && (
            <div className="gallery-empty">
              <h3>No images available for this category yet.</h3>
              <p>Check back later or view all categories to see our results.</p>
            </div>
          )}
        </main>
      </div>
    </PublicLayout>
  );
}
