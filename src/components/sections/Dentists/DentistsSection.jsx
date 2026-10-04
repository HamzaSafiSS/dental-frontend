import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconArrowRight } from '../../ui/Icons';
import api from '../../../services/api';
import { UPLOADS_BASE_URL } from '../../../config/constants';
import './DentistsSection.css';

// Fallback mock data that perfectly matches the user requirements
const MOCK_DENTISTS = [
  {
    id: 'mock-1',
    firstName: 'Sarah',
    lastName: 'Ahmed',
    specialization: 'General & Cosmetic Dentist',
    qualification: 'DDS',
    experienceYears: '10+',
    languages: 'English, Arabic',
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop', // Professional female doctor placeholder
  },
  {
    id: 'mock-2',
    firstName: 'Michael',
    lastName: 'Chen',
    specialization: 'Orthodontist',
    qualification: 'DMD, MS',
    experienceYears: '8+',
    languages: 'English, Mandarin',
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop', // Professional male doctor placeholder
  },
  {
    id: 'mock-3',
    firstName: 'David',
    lastName: 'Smith',
    specialization: 'Pediatric Dentist',
    qualification: 'DDS',
    experienceYears: '12+',
    languages: 'English, Spanish',
    photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop', // Professional male doctor placeholder
  }
];

export default function DentistsSection() {
  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchDentists() {
      try {
        const response = await api.get('/public/doctors');
        if (!cancelled) {
          // If the backend returns data, use it. Otherwise use mock.
          const fetchedDoctors = response.data?.data?.content || [];
          setDentists(fetchedDoctors.length > 0 ? fetchedDoctors : MOCK_DENTISTS);
        }
      } catch (error) {
        if (!cancelled) {
          setDentists(MOCK_DENTISTS);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchDentists();
    return () => { cancelled = true; };
  }, []);

  if (loading) return null; // Simple hidden state while loading

  return (
    <section className="dentists-section" id="dentists">
      <div className="container">
        
        <div className="dentists-section__header">
          <span className="dentists-section__label">Our Experts</span>
          <h2 className="dentists-section__heading">Meet Our Experienced Dental Team</h2>
        </div>

        <div className="dentists-section__grid">
          {dentists.map((dentist) => {
            const fullName = `Dr. ${dentist.firstName} ${dentist.lastName}`;
            const photoSrc = dentist.photoUrl?.startsWith('http') 
              ? dentist.photoUrl 
              : dentist.photoUrl 
                ? `${UPLOADS_BASE_URL}${dentist.photoUrl}` 
                : 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop'; // Fallback if no photo
            
            return (
              <div className="dentist-card" key={dentist.id}>
                <div className="dentist-card__image-wrapper">
                  <img 
                    src={photoSrc}
                    alt={fullName} 
                    className="dentist-card__image"
                    loading="lazy"
                  />
                </div>
                
                <div className="dentist-card__content">
                  <h3 className="dentist-card__name">{fullName}</h3>
                  <div className="dentist-card__title">{dentist.specialization}</div>
                  
                  <div className="dentist-card__meta">
                    <div className="dentist-card__meta-item">
                      <strong>Qualifications:</strong> {dentist.qualification}
                    </div>
                    <div className="dentist-card__meta-item">
                      <strong>Experience:</strong> {dentist.experienceYears} years
                    </div>
                    {dentist.languages && (
                      <div className="dentist-card__meta-item">
                        <strong>Languages:</strong> {dentist.languages}
                      </div>
                    )}
                  </div>
                  
                  <Link to={`/dentists/${dentist.id}`} className="dentist-card__link" style={{ marginTop: 'auto' }}>
                    View Profile
                    <IconArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
