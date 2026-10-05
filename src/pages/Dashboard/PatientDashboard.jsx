import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PatientSidebar from './Patient/PatientSidebar';
import OverviewTab from './Patient/OverviewTab';
import AppointmentsTab from './Patient/AppointmentsTab';
import ClinicalRecordsTab from './Patient/ClinicalRecordsTab';
import PaymentsTab from './Patient/PaymentsTab';
import NotificationsTab from './Patient/NotificationsTab';
import './PatientDashboard.css';

export default function PatientDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'appointments': return <AppointmentsTab />;
      case 'clinical': return <ClinicalRecordsTab />;
      case 'payments': return <PaymentsTab />;
      case 'notifications': return <NotificationsTab />;
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
    <div className="patient-dashboard">
      <PatientSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="patient-main">
        <div className="dashboard-header">
          <h1>{getGreeting()}, {user?.firstName}!</h1>
          <p>Welcome to your personal patient portal.</p>
        </div>
        
        <div className="dashboard-content">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}
