import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { IconMapPin, IconCalendar, IconClock } from '../../../components/ui/Icons'; 

export default function ReceptionistSidebar({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Receptionist</h2>
        <div 
          className={`user-info ${activeTab === 'profile' ? 'active-profile' : ''}`} 
          onClick={() => setActiveTab('profile')}
          style={{ cursor: 'pointer', padding: '10px', borderRadius: '8px', transition: 'background 0.2s' }}
        >
          <div className="avatar">{user?.firstName?.charAt(0) || 'R'}</div>
          <div>
            <div className="name">{user?.firstName} {user?.lastName}</div>
            <div className="role">Receptionist</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <button 
              className={activeTab === 'appointments' ? 'active' : ''} 
              onClick={() => setActiveTab('appointments')}
            >
              <IconCalendar size={18} /> Appointments
            </button>
          </li>
          <li>
            <button 
              className={activeTab === 'patients' ? 'active' : ''} 
              onClick={() => setActiveTab('patients')}
            >
              <IconCalendar size={18} /> Patients
            </button>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
        <Link to="/" className="btn-home">Return to Site</Link>
      </div>
    </aside>
  );
}
