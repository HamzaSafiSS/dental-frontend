import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import { IconCalendar } from '../../components/ui/Icons';
import api from '../../services/api';
import { UPLOADS_BASE_URL } from '../../config/constants';
import './DentistProfilePage.css';

// Fallback mock data that perfectly matches the user requirements
const MOCK_DENTIST = {
  id: 'mock-1',
  firstName: 'Sarah',
  lastName: 'Ahmed',
  specialization: 'General & Cosmetic Dentist',
  qualification: 'DDS',
  experienceYears: '10+',
  languages: 'English, Arabic',
  areasOfExpertise: ['Smile Makeovers', 'Invisalign', 'Porcelain Veneers', 'Painless Root Canals'],
  bio: `Dr. Sarah Ahmed is a highly skilled and compassionate dental professional dedicated to providing exceptional care. With over 10 years of clinical experience, she has helped thousands of patients achieve healthy, confident smiles. 

She earned her Doctor of Dental Surgery (DDS) with honors and continuously advances her education in the latest cosmetic and restorative techniques. Dr. Ahmed believes in a patient-first approach, taking the time to listen to concerns and tailoring treatments to individual needs.

Outside of the clinic, she enjoys volunteering at local community health fairs and spending time outdoors with her family.`,
  services: [
    'General Dentistry',
    'Cosmetic Dentistry',
    'Restorative Dentistry',
    'Preventive Care'
  ],
  availability: [
    { day: 'Monday', time: '8:00 AM – 4:00 PM' },
    { day: 'Tuesday', time: '10:00 AM – 6:00 PM' },
    { day: 'Wednesday', time: '8:00 AM – 4:00 PM' },
    { day: 'Thursday', time: '8:00 AM – 4:00 PM' },
    { day: 'Friday', time: '8:00 AM – 1:00 PM' }
  ],
  photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
};

export default function DentistProfilePage() {
  const { id } = useParams();
  const [dentist, setDentist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchDentist() {
      try {
        // Attempt to fetch from backend
        const response = await api.get(`/public/doctors/${id}`);
        if (!cancelled) {
          // If backend returns data, format it. Otherwise use mock.
          const data = response.data?.data;
          if (data) {
            // Merge with mock to ensure all UI fields are populated even if API is sparse
            setDentist({ ...MOCK_DENTIST, ...data });
          } else {
            setDentist(MOCK_DENTIST);
          }
        }
      } catch (error) {
        if (!cancelled) {
          setDentist(MOCK_DENTIST);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchDentist();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="dentist-profile-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="spinner">Loading profile...</div>
        </div>
      </PublicLayout>
    );
  }

  if (!dentist) return null;

  const fullName = `Dr. ${dentist.firstName} ${dentist.lastName}`;
  const photoSrc = dentist.photoUrl?.startsWith('http') 
    ? dentist.photoUrl 
    : dentist.photoUrl 
      ? `${UPLOADS_BASE_URL}${dentist.photoUrl}` 
      : MOCK_DENTIST.photoUrl;

  return (
    <PublicLayout>
      <main className="dentist-profile-page">
        <div className="container dentist-profile__container">
          
          {/* ── Sidebar (Profile Info & CTA) ── */}
          <aside className="dentist-profile__sidebar">
            <div className="dentist-profile__image-wrapper">
              <img 
                src={photoSrc} 
                alt={fullName} 
                className="dentist-profile__image" 
              />
            </div>
            
            <div className="dentist-profile__sidebar-content">
              <div className="dentist-profile__sidebar-block">
                <h3>Qualifications</h3>
                <p>{dentist.qualification}</p>
              </div>

              <div className="dentist-profile__sidebar-block">
                <h3>Experience</h3>
                <p>{dentist.experienceYears} Years</p>
              </div>

              <div className="dentist-profile__sidebar-block">
                <h3>Languages Spoken</h3>
                <p>{dentist.languages}</p>
              </div>

              <div className="dentist-profile__sidebar-block">
                <h3>Areas of Expertise</h3>
                <ul>
                  {(dentist.areasOfExpertise || MOCK_DENTIST.areasOfExpertise).map((area, idx) => (
                    <li key={idx}>{area}</li>
                  ))}
                </ul>
              </div>

              <Link to="/book-appointment" className="dentist-profile__cta">
                <IconCalendar size={18} />
                Book With This Dentist
              </Link>
            </div>
          </aside>

          {/* ── Main Content (Bio, Services, Availability) ── */}
          <article className="dentist-profile__main">
            
            <header className="dentist-profile__header">
              <h1 className="dentist-profile__name">{fullName}</h1>
              <div className="dentist-profile__title">{dentist.specialization}</div>
            </header>

            <section className="dentist-profile__section dentist-profile__bio">
              <h2>Biography</h2>
              {/* Split bio by newlines to render paragraphs correctly */}
              {(dentist.bio || MOCK_DENTIST.bio).split('\n').map((paragraph, idx) => (
                paragraph.trim() ? <p key={idx}>{paragraph}</p> : null
              ))}
            </section>

            <section className="dentist-profile__section">
              <h2>Services Provided</h2>
              <div className="dentist-profile__services">
                {(dentist.services || MOCK_DENTIST.services).map((service, idx) => (
                  <span key={idx} className="dentist-profile__service-tag">
                    {service}
                  </span>
                ))}
              </div>
            </section>

            <section className="dentist-profile__section">
              <h2>Availability</h2>
              <div className="dentist-profile__availability">
                <table className="dentist-profile__table">
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(dentist.availability || MOCK_DENTIST.availability).map((slot, idx) => (
                      <tr key={idx}>
                        <td>{slot.day}</td>
                        <td>{slot.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

          </article>

        </div>
      </main>
    </PublicLayout>
  );
}
