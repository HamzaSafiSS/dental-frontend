import { useState, useEffect } from 'react';
import { getAllDoctors } from '../../../services/doctorService';

export default function DoctorsTab() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getAllDoctors(0, 50);
        setDoctors(res.data?.content || []);
      } catch (error) {
        console.error("Failed to load doctors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="dashboard-card animation-fade-up">
      <div className="dashboard-card-header">
        <h2 className="dashboard-card-title">Manage Doctors</h2>
      </div>

      {loading ? (
        <div style={{ padding: '24px' }}>Loading doctors...</div>
      ) : doctors.length === 0 ? (
        <div style={{ padding: '24px' }}>No doctors found.</div>
      ) : (
        <div className="data-table-wrapper" style={{ padding: '0 24px 24px' }}>
          <table className="data-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ padding: '12px 8px' }}>Doctor Name</th>
                <th style={{ padding: '12px 8px' }}>Specialization</th>
                <th style={{ padding: '12px 8px' }}>Phone</th>
                <th style={{ padding: '12px 8px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map(d => (
                <tr key={d.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 500 }}>Dr. {d.user?.firstName} {d.user?.lastName}</td>
                  <td style={{ padding: '12px 8px' }}>{d.specialization || 'General'}</td>
                  <td style={{ padding: '12px 8px' }}>{d.user?.phone || 'N/A'}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span className={`badge ${d.user?.active ? 'badge-success' : 'badge-error'}`} style={{ padding: '4px 8px', borderRadius: '4px', background: d.user?.active ? '#dcfce7' : '#fee2e2', color: d.user?.active ? '#166534' : '#991b1b', fontSize: '0.8rem' }}>
                      {d.user?.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
