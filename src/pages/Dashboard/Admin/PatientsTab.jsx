import { useState, useEffect } from 'react';
import { getAllPatients } from '../../../services/patientService';

export default function PatientsTab() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await getAllPatients(0, 50);
        setPatients(res.data?.content || []);
      } catch (error) {
        console.error("Failed to load patients", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div className="dashboard-card animation-fade-up">
      <div className="dashboard-card-header">
        <h2 className="dashboard-card-title">Manage Patients</h2>
      </div>

      {loading ? (
        <div style={{ padding: '24px' }}>Loading patients...</div>
      ) : patients.length === 0 ? (
        <div style={{ padding: '24px' }}>No patients found.</div>
      ) : (
        <div className="data-table-wrapper" style={{ padding: '0 24px 24px' }}>
          <table className="data-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ padding: '12px 8px' }}>Patient Name</th>
                <th style={{ padding: '12px 8px' }}>Email</th>
                <th style={{ padding: '12px 8px' }}>Phone</th>
                <th style={{ padding: '12px 8px' }}>DOB</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 500 }}>{p.firstName} {p.lastName}</td>
                  <td style={{ padding: '12px 8px' }}>{p.email}</td>
                  <td style={{ padding: '12px 8px' }}>{p.phone || 'N/A'}</td>
                  <td style={{ padding: '12px 8px' }}>{p.dateOfBirth || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
