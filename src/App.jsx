import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/utils/ScrollToTop';
import HomePage from './pages/Home/HomePage';
import DentistsPage from './pages/Dentists/DentistsPage';
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

// Auth & Protected Routes
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/utils/ProtectedRoute';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';

// Dashboards
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import DoctorDashboard from './pages/Dashboard/DoctorDashboard';
import ReceptionistDashboard from './pages/Dashboard/ReceptionistDashboard';
import PatientDashboard from './pages/Dashboard/PatientDashboard';

/**
 * App — Root component with client-side routing.
 * New pages will be added as routes in upcoming phases.
 */
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/dentists" element={<DentistsPage />} />
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
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected Dashboards */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['DOCTOR']} />}>
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['RECEPTIONIST']} />}>
            <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['PATIENT']} />}>
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
          </Route>

          {/* Future routes:
            <Route path="/register" element={<RegisterPage />} />
          */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

