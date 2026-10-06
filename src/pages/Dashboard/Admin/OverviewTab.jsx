import { useState, useEffect } from 'react';
import { getDashboardStats } from '../../../services/dashboardService';

export default function OverviewTab({ user, onTabChange }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (error) {
        console.error("Failed to load admin stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-overview-tab">
      <div className="stats-grid">
        <div className="stat-card animation-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="stat-card-title">Total Patients</div>
          <div className="stat-card-value">{loading ? '-' : stats?.totalPatients || 0}</div>
        </div>
        <div className="stat-card animation-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="stat-card-title">Active Doctors</div>
          <div className="stat-card-value">{loading ? '-' : stats?.totalDoctors || 0}</div>
        </div>
        <div className="stat-card animation-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="stat-card-title">Today's Revenue</div>
          <div className="stat-card-value">{loading ? '-' : `$${stats?.todayRevenue || 0}`}</div>
        </div>
        <div className="stat-card animation-fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="stat-card-title">Monthly Revenue</div>
          <div className="stat-card-value">{loading ? '-' : `$${stats?.monthRevenue || 0}`}</div>
        </div>
      </div>

      <div className="dashboard-card animation-fade-up" style={{ animationDelay: '0.5s', marginTop: '24px' }}>
        <div className="dashboard-card-header">
          <h2 className="dashboard-card-title">Quick Actions</h2>
        </div>
        <div className="quick-actions-grid">
          <button className="btn btn-outline-primary" onClick={() => onTabChange('doctors')}>
            Manage Doctors
          </button>
          <button className="btn btn-outline-primary" onClick={() => onTabChange('services')}>
            Manage Services
          </button>
          <button className="btn btn-outline-primary" onClick={() => window.location.href='/book-appointment'}>
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
