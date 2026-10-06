import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ReceptionistSidebar from './Receptionist/ReceptionistSidebar';
import AppointmentsTab from './Admin/AppointmentsTab';
import PatientsTab from './Admin/PatientsTab';
import ProfileTab from './Admin/ProfileTab';
import './AdminDashboard.css'; // Reusing admin dashboard styles

export default function ReceptionistDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('appointments');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'patients':
        return <PatientsTab />;
      case 'profile':
        return <ProfileTab />;
      case 'appointments':
      default:
        return <AppointmentsTab />;
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="admin-dashboard">
      <ReceptionistSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="admin-main">
        <div className="dashboard-header">
          <h1>{getGreeting()}, {user?.firstName}!</h1>
          <p>Welcome to the Bright Smiles Receptionist Dashboard.</p>
        </div>
        
        <div className="dashboard-content">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}
