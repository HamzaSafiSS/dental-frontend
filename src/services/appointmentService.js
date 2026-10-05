import api from './api';

export async function submitGuestAppointment(data) {
  const response = await api.post('/public/appointments/request', data);
  return response.data;
}

export async function createAppointment(data) {
  const response = await api.post('/appointments', data);
  return response.data;
}

export async function getMyAppointments(page = 0, size = 20) {
  const response = await api.get('/appointments/my', {
    params: { page, size }
  });
  return response.data;
}

export async function getAppointmentById(id) {
  const response = await api.get(`/appointments/${id}`);
  return response.data;
}
