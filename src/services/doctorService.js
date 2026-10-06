import api from './api';

export async function getAllDoctors(page = 0, size = 20) {
  const response = await api.get('/doctors', { params: { page, size } });
  return response.data;
}

export async function createDoctor(data) {
  const response = await api.post('/doctors', data);
  return response.data;
}

export async function updateDoctor(id, data) {
  const response = await api.patch(`/doctors/${id}`, data);
  return response.data;
}
