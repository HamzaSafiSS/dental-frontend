import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from './Admin/AdminSidebar';
import OverviewTab from './Admin/OverviewTab';
import DoctorsTab from './Admin/DoctorsTab';
import ServicesTab from './Admin/ServicesTab';
import PatientsTab from './Admin/PatientsTab';
import AppointmentsTab from './Admin/AppointmentsTab';
import ReceptionistsTab from './Admin/ReceptionistsTab';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'doctors':
        return <DoctorsTab />;
      case 'receptionists':
        return <ReceptionistsTab />;
      case 'services':
        return <ServicesTab />;
      case 'patients':
        return <PatientsTab />;
      case 'appointments':
        return <AppointmentsTab />;
      case 'overview':
      default:
        return <OverviewTab user={user} onTabChange={setActiveTab} />;
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
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="admin-main">
        <div className="dashboard-header">
          <h1>{getGreeting()}, {user?.firstName}!</h1>
          <p>Welcome to the Bright Smiles Admin Control Panel.</p>
        </div>
        
        <div className="dashboard-content">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}
