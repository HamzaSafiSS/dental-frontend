import { useEffect, useState } from 'react';
import { getMyAppointments } from '../../../services/appointmentService';
import { getAppointmentPayment } from '../../../services/paymentService';

export default function PaymentsTab() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // Fetch appointments first to get payments
        const aptRes = await getMyAppointments(0, 50);
        const appointments = aptRes.data?.content || [];
        
        // Fetch payments for each appointment
        const paymentsData = await Promise.all(
          appointments.map(async (apt) => {
            try {
              const payRes = await getAppointmentPayment(apt.id);
              return { ...payRes.data, appointment: apt };
            } catch {
              return { appointment: apt, status: 'UNPAID', amount: apt.service?.price || 0 };
            }
          })
        );
        
        setPayments(paymentsData);
      } catch (error) {
        console.error("Failed to load payments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'VERIFIED': return <span className="badge badge-success">Paid</span>;
      case 'PENDING': return <span className="badge badge-warning">Pending Verification</span>;
      case 'REJECTED': return <span className="badge badge-error">Rejected</span>;
      default: return <span className="badge badge-error">Unpaid</span>;
    }
  };

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h2 className="dashboard-card-title">Billing & Payments</h2>
      </div>

      {loading ? (
        <p>Loading payments...</p>
      ) : payments.length === 0 ? (
        <p>No billing history found.</p>
      ) : (
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Service</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay, i) => (
                <tr key={i}>
                  <td>{pay.appointment.appointmentDate}</td>
                  <td>{pay.appointment.service?.name}</td>
                  <td style={{ fontWeight: 600 }}>${pay.amount || pay.appointment.service?.price || 0}</td>
                  <td>{getStatusBadge(pay.status)}</td>
                  <td>
                    {pay.status === 'UNPAID' || pay.status === 'REJECTED' ? (
                      <button 
                        style={{ padding: '6px 12px', background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-md)', fontSize: '12px' }}
                        onClick={() => window.location.href=`/insurance?appointmentId=${pay.appointment.id}`}
                      >
                        Pay Now
                      </button>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>-</span>
                    )}
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
