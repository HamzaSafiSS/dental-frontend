import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/utils/ScrollToTop';
import HomePage from './pages/Home/HomePage';
import DentistProfilePage from './pages/Dentists/DentistProfilePage';
import ServiceDetailPage from './pages/Services/ServiceDetailPage';
import ServicesPage from './pages/Services/ServicesPage';
import PatientInfoPage from './pages/PatientInfo/PatientInfoPage';

/**
 * App — Root component with client-side routing.
 * New pages will be added as routes in upcoming phases.
 */
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/dentists/:id" element={<DentistProfilePage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/patient-info" element={<PatientInfoPage />} />
        {/* Future routes:
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/dentists" element={<DentistsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book-appointment" element={<BookAppointmentPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        */}
      </Routes>
    </Router>
  );
}
