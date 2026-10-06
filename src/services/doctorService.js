import api from './api';

export async function getAllDoctors(page = 0, size = 20) {
  const response = await api.get('/doctors', { params: { page, size } });
  return response.data;
}
