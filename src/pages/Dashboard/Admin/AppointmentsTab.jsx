import { useState, useEffect } from 'react';
import { getAllAppointments } from '../../../services/appointmentService';

export default function AppointmentsTab() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getAllAppointments(0, 50);
        setAppointments(res.data?.content || []);
      } catch (error) {
        console.error("Failed to load appointments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDING': return { bg: '#fef9c3', text: '#854d0e' };
      case 'CONFIRMED': return { bg: '#dbeafe', text: '#1e40af' };
      case 'COMPLETED': return { bg: '#dcfce7', text: '#166534' };
      case 'CANCELLED': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  return (
    <div className="dashboard-card animation-fade-up">
      <div className="dashboard-card-header">
        <h2 className="dashboard-card-title">Manage Appointments</h2>
      </div>

      {loading ? (
        <div style={{ padding: '24px' }}>Loading appointments...</div>
      ) : appointments.length === 0 ? (
        <div style={{ padding: '24px' }}>No appointments found.</div>
      ) : (
        <div className="data-table-wrapper" style={{ padding: '0 24px 24px', overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%', minWidth: '800px', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ padding: '12px 8px' }}>Date & Time</th>
                <th style={{ padding: '12px 8px' }}>Patient</th>
                <th style={{ padding: '12px 8px' }}>Doctor</th>
                <th style={{ padding: '12px 8px' }}>Service</th>
                <th style={{ padding: '12px 8px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(a => {
                const colors = getStatusColor(a.status);
                return (
                  <tr key={a.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 500 }}>
                      {new Date(a.appointmentDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                    </td>
                    <td style={{ padding: '12px 8px' }}>{a.patientName}</td>
                    <td style={{ padding: '12px 8px' }}>Dr. {a.doctorName}</td>
                    <td style={{ padding: '12px 8px' }}>{a.serviceName}</td>
                    <td style={{ padding: '12px 8px' }}>
                      <span className="badge" style={{ padding: '4px 8px', borderRadius: '4px', background: colors.bg, color: colors.text, fontSize: '0.8rem', fontWeight: 600 }}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
