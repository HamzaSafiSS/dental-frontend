import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { register } from '../../services/authService';
import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import './LoginPage.css'; // Reusing login page styles

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }
    
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login', { state: { from: location.state?.from } });
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="login-page">
        <div className="login-container animation-fade-up" style={{ maxWidth: '550px' }}>
          <div className="login-header">
            <h1>Create an Account</h1>
            <p>Join us to book appointments and manage your dental health.</p>
          </div>
          
          {error && <div className="login-alert error-alert">{error}</div>}
          {success && (
            <div className="login-alert" style={{ backgroundColor: '#def7ec', color: '#03543f', border: '1px solid #84e1bc' }}>
              Registration successful! Redirecting to login...
            </div>
          )}
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="John" 
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label>Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Doe" 
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email"
                placeholder="john@example.com" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                placeholder="+1 (555) 000-0000" 
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password"
                placeholder="Create a password (min 8 chars)" 
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword"
                placeholder="Confirm your password" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary btn-block login-btn" disabled={isLoading || success}>
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
