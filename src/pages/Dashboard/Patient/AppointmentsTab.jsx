import { useEffect, useState } from 'react';
import { getMyAppointments } from '../../../services/appointmentService';

export default function AppointmentsTab() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getMyAppointments(0, 50);
        setAppointments(res.data?.content || []);
      } catch (error) {
        console.error("Failed to load appointments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'COMPLETED': return <span className="badge badge-success">Completed</span>;
      case 'CANCELLED': return <span className="badge badge-error">Cancelled</span>;
      case 'CONFIRMED': return <span className="badge badge-info">Confirmed</span>;
      default: return <span className="badge badge-warning">{status}</span>;
    }
  };

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h2 className="dashboard-card-title">My Appointments</h2>
        <button 
          style={{ padding: '8px 16px', background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-md)' }}
          onClick={() => window.location.href='/book-appointment'}
        >
          Book New
        </button>
      </div>

      {loading ? (
        <p>Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p>You have no appointments history.</p>
      ) : (
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Service</th>
                <th>Doctor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(apt => (
                <tr key={apt.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{apt.appointmentDate}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>{apt.appointmentTime}</div>
                  </td>
                  <td>{apt.service?.name || 'Consultation'}</td>
                  <td>Dr. {apt.doctor?.user?.lastName}</td>
                  <td>{getStatusBadge(apt.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
