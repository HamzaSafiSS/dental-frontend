import api from './api';

export async function getPatientProfile() {
  const response = await api.get('/patients/me');
  return response.data;
}
