import api from './api';

export async function submitGuestAppointment(data) {
  const response = await api.post('/public/appointments/request', data);
  return response.data;
}
