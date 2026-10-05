import { useAuth } from '../../../context/AuthContext';
import { 
  IconCalendar, IconCheck, IconClock, IconMapPin, IconPhone, IconMenu
} from '../../../components/ui/Icons';

export default function PatientSidebar({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth();
  
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <IconMenu size={18} /> },
    { id: 'appointments', label: 'Appointments', icon: <IconCalendar size={18} /> },
    { id: 'clinical', label: 'Clinical Records', icon: <IconCheck size={18} /> },
    { id: 'payments', label: 'Payments', icon: <IconClock size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <IconMapPin size={18} /> },
  ];

  const getInitials = () => {
    if (!user) return 'P';
    return `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`;
  };

  return (
    <aside className="patient-sidebar">
      <div className="patient-profile-summary">
        <div className="patient-avatar">
          {getInitials()}
        </div>
        <h3 style={{ margin: '8px 0 4px', fontSize: '18px', color: 'var(--color-heading)' }}>
          {user?.firstName} {user?.lastName}
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-light)' }}>{user?.email}</p>
      </div>

      <ul className="patient-sidebar-nav">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              className={`patient-nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <button className="patient-logout-btn" onClick={logout}>
        Log Out
      </button>
    </aside>
  );
}
