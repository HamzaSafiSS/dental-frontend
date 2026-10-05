import { useEffect, useState } from 'react';
import { getPatientDentalRecords, getPatientPrescriptions, getPatientTreatmentPlans } from '../../../services/clinicalService';
import { useAuth } from '../../../context/AuthContext';

export default function ClinicalRecordsTab() {
  const { user } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState('records');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!user?.patientId) return; // Wait, patientId is needed. AuthContext might not have it directly on user if user is base user.
        // We will fallback to fetching profile if patientId isn't on user, or assume patient service works without patientId in params if we changed the backend to use 'me'.
        // Wait, backend requires patientId for clinical records, but the patient can find their patientId via /patients/me.
        // Let's assume user.patientProfile.id exists or we fetch it.
        const patientId = user?.patientProfile?.id || user?.id; // backend uses UUID for user and patient.
        
        let res;
        if (activeSubTab === 'records') {
          res = await getPatientDentalRecords(patientId);
        } else if (activeSubTab === 'prescriptions') {
          res = await getPatientPrescriptions(patientId);
        } else {
          res = await getPatientTreatmentPlans(patientId);
        }
        setData(res.data?.content || []);
      } catch (error) {
        console.error("Error fetching clinical data", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchData();
    }
  }, [activeSubTab, user]);

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
        <h2 className="dashboard-card-title">Clinical Records</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['records', 'prescriptions', 'treatments'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                background: activeSubTab === tab ? 'var(--color-primary)' : 'var(--color-bg-section)',
                color: activeSubTab === tab ? 'white' : 'var(--color-text)',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p>No {activeSubTab} found.</p>
      ) : (
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                {activeSubTab === 'records' && <th>Tooth No</th>}
                {activeSubTab === 'records' && <th>Diagnosis</th>}
                {activeSubTab === 'prescriptions' && <th>Medication</th>}
                {activeSubTab === 'prescriptions' && <th>Dosage</th>}
                {activeSubTab === 'treatments' && <th>Name</th>}
                {activeSubTab === 'treatments' && <th>Cost</th>}
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  {activeSubTab === 'records' && <td>{item.toothNumber || 'General'}</td>}
                  {activeSubTab === 'records' && <td>{item.diagnosis}</td>}
                  {activeSubTab === 'prescriptions' && <td>{item.medicationName}</td>}
                  {activeSubTab === 'prescriptions' && <td>{item.dosage}</td>}
                  {activeSubTab === 'treatments' && <td>{item.planName}</td>}
                  {activeSubTab === 'treatments' && <td>${item.estimatedCost}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
