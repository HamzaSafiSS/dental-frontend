import { useState, useEffect } from 'react';
import { getAllAdminServices } from '../../../services/clinicService';

export default function ServicesTab() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getAllAdminServices(0, 50);
        setServices(res.data?.content || []);
      } catch (error) {
        console.error("Failed to load services", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="dashboard-card animation-fade-up">
      <div className="dashboard-card-header">
        <h2 className="dashboard-card-title">Manage Services</h2>
      </div>

      {loading ? (
        <div style={{ padding: '24px' }}>Loading services...</div>
      ) : services.length === 0 ? (
        <div style={{ padding: '24px' }}>No services found.</div>
      ) : (
        <div className="data-table-wrapper" style={{ padding: '0 24px 24px' }}>
          <table className="data-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ padding: '12px 8px' }}>Service Name</th>
                <th style={{ padding: '12px 8px' }}>Category</th>
                <th style={{ padding: '12px 8px' }}>Duration (mins)</th>
                <th style={{ padding: '12px 8px' }}>Payment ($)</th>
                <th style={{ padding: '12px 8px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 500 }}>{s.name}</td>
                  <td style={{ padding: '12px 8px' }}>{s.category?.name || s.categoryName || 'General'}</td>
                  <td style={{ padding: '12px 8px' }}>{s.durationMinutes}</td>
                  <td style={{ padding: '12px 8px' }}>${s.requiredPaymentAmount}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span className={`badge ${s.active ? 'badge-success' : 'badge-error'}`} style={{ padding: '4px 8px', borderRadius: '4px', background: s.active ? '#dcfce7' : '#fee2e2', color: s.active ? '#166534' : '#991b1b', fontSize: '0.8rem' }}>
                      {s.active ? 'Active' : 'Inactive'}
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
