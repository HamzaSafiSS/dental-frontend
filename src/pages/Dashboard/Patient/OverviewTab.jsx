import { useEffect, useState } from 'react';
import { getPatientProfile } from '../../../services/patientService';
import { getMyAppointments } from '../../../services/appointmentService';
import { IconCalendar, IconClock, IconCheck } from '../../../components/ui/Icons';

export default function OverviewTab({ user, onTabChange }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const aptRes = await getMyAppointments(0, 5);
        setAppointments(aptRes.data?.content || []);
      } catch (error) {
        console.error("Error fetching overview data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOverviewData();
  }, []);

  const upcomingAppointments = appointments.filter(a => new Date(a.appointmentDate) >= new Date() && a.status !== 'CANCELLED');
  const nextAppointment = upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;

  return (
    <div className="overview-tab">
      <div className="overview-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-icon"><IconCalendar size={24} /></div>
          <div className="stat-info">
            <h3>Upcoming Appointments</h3>
            <p>{upcomingAppointments.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><IconCheck size={24} /></div>
          <div className="stat-info">
            <h3>Past Visits</h3>
            <p>{appointments.filter(a => a.status === 'COMPLETED').length}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <h2 className="dashboard-card-title">Next Appointment</h2>
          <button style={{ color: 'var(--color-primary)', fontWeight: 600 }} onClick={() => onTabChange('appointments')}>
            View All
          </button>
        </div>
        
        {loading ? (
          <p>Loading...</p>
        ) : nextAppointment ? (
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px', background: 'var(--color-blue-pale)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ background: 'var(--color-white)', padding: '12px 20px', borderRadius: 'var(--radius-md)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                {new Date(nextAppointment.appointmentDate).toLocaleString('default', { month: 'short' })}
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-heading)' }}>
                {new Date(nextAppointment.appointmentDate).getDate()}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '18px', marginBottom: '4px', color: 'var(--color-heading)' }}>
                {nextAppointment.service?.name || 'General Checkup'}
              </h4>
              <p style={{ color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <IconClock size={14} /> {nextAppointment.appointmentTime} 
                <span style={{ margin: '0 8px' }}>|</span> 
                Dr. {nextAppointment.doctor?.user?.lastName || 'Assigned Doctor'}
              </p>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-light)' }}>
            <p>No upcoming appointments.</p>
            <button 
              style={{ marginTop: '16px', padding: '10px 20px', background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-md)' }}
              onClick={() => window.location.href='/book-appointment'}
            >
              Book Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
