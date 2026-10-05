import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/utils/ScrollToTop';
import HomePage from './pages/Home/HomePage';
import DentistProfilePage from './pages/Dentists/DentistProfilePage';
import ServiceDetailPage from './pages/Services/ServiceDetailPage';
import ServicesPage from './pages/Services/ServicesPage';
import PatientInfoPage from './pages/PatientInfo/PatientInfoPage';
import BookAppointmentPage from './pages/BookAppointment/BookAppointmentPage';
import GalleryPage from './pages/Gallery/GalleryPage';
import ReviewsPage from './pages/Reviews/ReviewsPage';
import InsurancePaymentPage from './pages/InsurancePayment/InsurancePaymentPage';
import EmergencyPage from './pages/Emergency/EmergencyPage';
import FaqPage from './pages/Faq/FaqPage';
import ContactPage from './pages/Contact/ContactPage';
import BlogPage from './pages/Blog/BlogPage';
import BlogDetailPage from './pages/Blog/BlogDetailPage';
import AboutPage from './pages/About/AboutPage';

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
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/insurance" element={<InsurancePaymentPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/faqs" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Future routes:
          <Route path="/dentists" element={<DentistsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        */}
      </Routes>
    </Router>
  );
}
