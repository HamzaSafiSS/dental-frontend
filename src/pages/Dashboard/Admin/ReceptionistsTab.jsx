import { useState, useEffect } from 'react';
import { getAllReceptionists, createReceptionist, updateReceptionist } from '../../../services/receptionistService';

export default function ReceptionistsTab() {
  const [receptionists, setReceptionists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newReceptionist, setNewReceptionist] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    department: 'Front Desk',
    position: 'Junior Receptionist'
  });

  const fetchReceptionists = async () => {
    try {
      const res = await getAllReceptionists(0, 50);
      setReceptionists(res.data?.content || []);
    } catch (error) {
      console.error("Failed to load receptionists", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceptionists();
  }, []);

  const handleToggleStatus = async (receptionist) => {
    try {
      await updateReceptionist(receptionist.id, { active: !receptionist.active });
      fetchReceptionists();
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status.");
    }
  };

  const handleAddReceptionist = async (e) => {
    e.preventDefault();
    try {
      await createReceptionist(newReceptionist);
      setIsAdding(false);
      setNewReceptionist({ email: '', password: '', firstName: '', lastName: '', phone: '', department: 'Front Desk', position: 'Junior Receptionist' });
      fetchReceptionists();
    } catch (error) {
      console.error("Failed to create receptionist", error);
      alert("Failed to create receptionist. Make sure the email is unique.");
    }
  };

  return (
    <div className="dashboard-card animation-fade-up">
      <div className="dashboard-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="dashboard-card-title">Manage Receptionists</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setIsAdding(!isAdding)}
          style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: 'var(--color-primary)', color: 'white', cursor: 'pointer' }}
        >
          {isAdding ? 'Cancel' : 'Add Receptionist'}
        </button>
      </div>

      {isAdding && (
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-alt)' }}>
          <h3>Add New Receptionist</h3>
          <form onSubmit={handleAddReceptionist} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px', marginTop: '16px' }}>
            <input type="text" placeholder="First Name" required value={newReceptionist.firstName} onChange={e => setNewReceptionist({...newReceptionist, firstName: e.target.value})} style={{ padding: '8px' }} />
            <input type="text" placeholder="Last Name" required value={newReceptionist.lastName} onChange={e => setNewReceptionist({...newReceptionist, lastName: e.target.value})} style={{ padding: '8px' }} />
            <input type="email" placeholder="Email" required value={newReceptionist.email} onChange={e => setNewReceptionist({...newReceptionist, email: e.target.value})} style={{ padding: '8px' }} />
            <input type="password" placeholder="Password" required value={newReceptionist.password} onChange={e => setNewReceptionist({...newReceptionist, password: e.target.value})} style={{ padding: '8px' }} />
            <input type="tel" placeholder="Phone" value={newReceptionist.phone} onChange={e => setNewReceptionist({...newReceptionist, phone: e.target.value})} style={{ padding: '8px' }} />
            <input type="text" placeholder="Position" value={newReceptionist.position} onChange={e => setNewReceptionist({...newReceptionist, position: e.target.value})} style={{ padding: '8px' }} />
            <select value={newReceptionist.department} onChange={e => setNewReceptionist({...newReceptionist, department: e.target.value})} style={{ padding: '8px' }}>
              <option value="Front Desk">Front Desk</option>
              <option value="Billing">Billing</option>
              <option value="Customer Support">Customer Support</option>
            </select>
            <button type="submit" style={{ padding: '10px', background: 'var(--color-secondary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Create Receptionist</button>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ padding: '24px' }}>Loading receptionists...</div>
      ) : receptionists.length === 0 ? (
        <div style={{ padding: '24px' }}>No receptionists found.</div>
      ) : (
        <div className="data-table-wrapper" style={{ padding: '0 24px 24px', marginTop: '24px' }}>
          <table className="data-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ padding: '12px 8px' }}>Name</th>
                <th style={{ padding: '12px 8px' }}>Email</th>
                <th style={{ padding: '12px 8px' }}>Phone</th>
                <th style={{ padding: '12px 8px' }}>Department</th>
                <th style={{ padding: '12px 8px' }}>Status</th>
                <th style={{ padding: '12px 8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {receptionists.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 500 }}>{r.firstName} {r.lastName}</td>
                  <td style={{ padding: '12px 8px' }}>{r.email}</td>
                  <td style={{ padding: '12px 8px' }}>{r.phone || 'N/A'}</td>
                  <td style={{ padding: '12px 8px' }}>{r.department || 'N/A'}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span className={`badge ${r.active ? 'badge-success' : 'badge-error'}`} style={{ padding: '4px 8px', borderRadius: '4px', background: r.active ? '#dcfce7' : '#fee2e2', color: r.active ? '#166534' : '#991b1b', fontSize: '0.8rem' }}>
                      {r.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    <button 
                      onClick={() => handleToggleStatus(r)}
                      className="btn"
                      style={{ 
                        padding: '6px 12px', 
                        fontSize: '0.85rem', 
                        backgroundColor: r.active ? '#fee2e2' : '#dcfce7',
                        color: r.active ? '#991b1b' : '#166534',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {r.active ? 'Deactivate' : 'Activate'}
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
