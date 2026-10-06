import { useState, useEffect } from 'react';
import { getAllAdminServices, createService, updateService } from '../../../services/clinicService';

export default function ServicesTab() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newService, setNewService] = useState({
    name: '', shortDescription: '', durationMinutes: '', requiredPaymentAmount: ''
  });

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

  useEffect(() => {
    fetchServices();
  }, []);

  const handleToggleStatus = async (service) => {
    try {
      await updateService(service.id, { active: !service.active });
      fetchServices();
    } catch (error) {
      console.error("Failed to update service status", error);
      alert("Failed to update service status.");
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      await createService(newService);
      setIsAdding(false);
      setNewService({ name: '', shortDescription: '', durationMinutes: '', requiredPaymentAmount: '' });
      fetchServices();
    } catch (error) {
      console.error("Failed to create service", error);
      alert("Failed to create service.");
    }
  };

  return (
    <div className="dashboard-card animation-fade-up">
      <div className="dashboard-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="dashboard-card-title">Manage Services</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setIsAdding(!isAdding)}
          style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: 'var(--color-primary)', color: 'white', cursor: 'pointer' }}
        >
          {isAdding ? 'Cancel' : 'Add Service'}
        </button>
      </div>

      {isAdding && (
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-alt)' }}>
          <h3>Add New Service</h3>
          <form onSubmit={handleAddService} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', marginTop: '16px' }}>
            <input type="text" placeholder="Service Name" required value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} style={{ padding: '8px' }} />
            <input type="text" placeholder="Short Description" value={newService.shortDescription} onChange={e => setNewService({...newService, shortDescription: e.target.value})} style={{ padding: '8px' }} />
            <div style={{ display: 'flex', gap: '16px' }}>
              <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="Duration (Minutes)" required value={newService.durationMinutes} onChange={e => setNewService({...newService, durationMinutes: e.target.value.replace(/[^0-9]/g, '')})} style={{ padding: '8px', flex: 1 }} />
              <input type="text" inputMode="decimal" placeholder="Payment Amount ($)" required value={newService.requiredPaymentAmount} onChange={e => setNewService({...newService, requiredPaymentAmount: e.target.value.replace(/[^0-9.]/g, '')})} style={{ padding: '8px', flex: 1 }} />
            </div>
            <button type="submit" style={{ padding: '10px', background: 'var(--color-secondary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Create Service</button>
          </form>
        </div>
      )}

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
                <th style={{ padding: '12px 8px' }}>Actions</th>
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
                  <td style={{ padding: '12px 8px' }}>
                    <button 
                      onClick={() => handleToggleStatus(s)}
                      className="btn"
                      style={{ 
                        padding: '6px 12px', 
                        fontSize: '0.85rem', 
                        backgroundColor: s.active ? '#fee2e2' : '#dcfce7',
                        color: s.active ? '#991b1b' : '#166534',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {s.active ? 'Deactivate' : 'Activate'}
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
