import { useState, useEffect } from 'react';
import { getAllDoctors, updateDoctor, createDoctor } from '../../../services/doctorService';

export default function DoctorsTab() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    email: '', password: '', firstName: '', lastName: '', phone: '',
    specialization: '', qualification: '', experienceYears: '', bio: '',
    licenseNumber: '', consultationFee: ''
  });

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

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleToggleStatus = async (doctor) => {
    try {
      await updateDoctor(doctor.id, { active: !doctor.active });
      fetchDoctors();
    } catch (error) {
      console.error("Failed to update doctor status", error);
      alert("Failed to update doctor status. Check console for details.");
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      await createDoctor(newDoctor);
      setIsAdding(false);
      setNewDoctor({
        email: '', password: '', firstName: '', lastName: '', phone: '',
        specialization: '', qualification: '', experienceYears: '', bio: '',
        licenseNumber: '', consultationFee: ''
      });
      fetchDoctors();
    } catch (error) {
      console.error("Failed to create doctor", error);
      alert("Failed to create doctor. Please check required fields and unique email/license.");
    }
  };

  return (
    <div className="dashboard-card animation-fade-up">
      <div className="dashboard-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="dashboard-card-title">Manage Doctors</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setIsAdding(!isAdding)}
          style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: 'var(--color-primary)', color: 'white', cursor: 'pointer' }}
        >
          {isAdding ? 'Cancel' : 'Add Doctor'}
        </button>
      </div>

      {isAdding && (
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-alt)' }}>
          <h3>Add New Doctor</h3>
          <form onSubmit={handleAddDoctor} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', marginTop: '16px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <input type="text" placeholder="First Name" required value={newDoctor.firstName} onChange={e => setNewDoctor({...newDoctor, firstName: e.target.value})} style={{ padding: '8px', flex: 1 }} />
              <input type="text" placeholder="Last Name" required value={newDoctor.lastName} onChange={e => setNewDoctor({...newDoctor, lastName: e.target.value})} style={{ padding: '8px', flex: 1 }} />
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <input type="email" placeholder="Email" required value={newDoctor.email} onChange={e => setNewDoctor({...newDoctor, email: e.target.value})} style={{ padding: '8px', flex: 1 }} />
              <input type="password" placeholder="Password" required value={newDoctor.password} onChange={e => setNewDoctor({...newDoctor, password: e.target.value})} style={{ padding: '8px', flex: 1 }} />
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <input type="tel" placeholder="Phone" value={newDoctor.phone} onChange={e => setNewDoctor({...newDoctor, phone: e.target.value})} style={{ padding: '8px', flex: 1 }} />
              <input type="text" placeholder="License Number" required value={newDoctor.licenseNumber} onChange={e => setNewDoctor({...newDoctor, licenseNumber: e.target.value})} style={{ padding: '8px', flex: 1 }} />
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <input type="text" placeholder="Specialization" value={newDoctor.specialization} onChange={e => setNewDoctor({...newDoctor, specialization: e.target.value})} style={{ padding: '8px', flex: 1 }} />
              <input type="text" placeholder="Qualification" value={newDoctor.qualification} onChange={e => setNewDoctor({...newDoctor, qualification: e.target.value})} style={{ padding: '8px', flex: 1 }} />
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="Experience (Years)" value={newDoctor.experienceYears} onChange={e => setNewDoctor({...newDoctor, experienceYears: e.target.value.replace(/[^0-9]/g, '')})} style={{ padding: '8px', flex: 1 }} />
              <input type="text" inputMode="decimal" placeholder="Consultation Fee ($)" value={newDoctor.consultationFee} onChange={e => setNewDoctor({...newDoctor, consultationFee: e.target.value.replace(/[^0-9.]/g, '')})} style={{ padding: '8px', flex: 1 }} />
            </div>
            <textarea placeholder="Bio" value={newDoctor.bio} onChange={e => setNewDoctor({...newDoctor, bio: e.target.value})} style={{ padding: '8px', minHeight: '80px' }}></textarea>
            <button type="submit" style={{ padding: '10px', background: 'var(--color-secondary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Create Doctor</button>
          </form>
        </div>
      )}

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
                <th style={{ padding: '12px 8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map(d => (
                <tr key={d.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 500 }}>Dr. {d.firstName} {d.lastName}</td>
                  <td style={{ padding: '12px 8px' }}>{d.specialization || 'General'}</td>
                  <td style={{ padding: '12px 8px' }}>{d.phone || 'N/A'}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span className={`badge ${d.active ? 'badge-success' : 'badge-error'}`} style={{ padding: '4px 8px', borderRadius: '4px', background: d.active ? '#dcfce7' : '#fee2e2', color: d.active ? '#166534' : '#991b1b', fontSize: '0.8rem' }}>
                      {d.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    <button 
                      onClick={() => handleToggleStatus(d)}
                      className="btn"
                      style={{ 
                        padding: '6px 12px', 
                        fontSize: '0.85rem', 
                        backgroundColor: d.active ? '#fee2e2' : '#dcfce7',
                        color: d.active ? '#991b1b' : '#166534',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {d.active ? 'Deactivate' : 'Activate'}
                    </button>
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
