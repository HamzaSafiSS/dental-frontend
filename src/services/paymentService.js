import api from './api';

export async function getAppointmentPayment(appointmentId) {
  const response = await api.get(`/payments/appointments/${appointmentId}`);
  return response.data;
}

export async function submitPaymentProof(appointmentId, formData) {
  const response = await api.post(`/payments/appointments/${appointmentId}/submit`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}
