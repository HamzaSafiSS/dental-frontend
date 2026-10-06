import api from './api';

export async function getPatientProfile() {
  const response = await api.get('/patients/me');
  return response.data;
}

export async function getAllPatients(page = 0, size = 20) {
  const response = await api.get('/patients', { params: { page, size } });
  return response.data;
}
