import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { IconMapPin, IconCalendar, IconClock } from '../../../components/ui/Icons'; 

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
        <div className="user-info">
          <div className="avatar">{user?.firstName?.charAt(0) || 'A'}</div>
          <div>
            <div className="name">{user?.firstName} {user?.lastName}</div>
            <div className="role">Administrator</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <button 
              className={activeTab === 'overview' ? 'active' : ''} 
              onClick={() => setActiveTab('overview')}
            >
              <IconMapPin size={18} /> Dashboard
            </button>
          </li>
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
          <li>
            <button 
              className={activeTab === 'doctors' ? 'active' : ''} 
              onClick={() => setActiveTab('doctors')}
            >
              <IconCalendar size={18} /> Doctors
            </button>
          </li>
          <li>
            <button 
              className={activeTab === 'services' ? 'active' : ''} 
              onClick={() => setActiveTab('services')}
            >
              <IconClock size={18} /> Services
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
