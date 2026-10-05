import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../services/authService';
import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import './LoginPage.css'; // Reusing login page styles

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="login-page">
        <div className="login-container animation-fade-up">
          <div className="login-header">
            <h1>Reset Password</h1>
            <p>Enter your email address and we'll send you a link to reset your password.</p>
          </div>
          
          {error && <div className="login-alert error-alert">{error}</div>}
          {success && (
            <div className="login-alert" style={{ backgroundColor: '#def7ec', color: '#03543f', border: '1px solid #84e1bc' }}>
              If an account exists with that email, a password reset link has been sent.
            </div>
          )}
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary btn-block login-btn" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Remembered your password? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
