import api from './api';

export async function getAllReceptionists(page = 0, size = 20) {
  const response = await api.get('/receptionists', { params: { page, size } });
  return response.data;
}

export async function createReceptionist(data) {
  const response = await api.post('/receptionists', data);
  return response.data;
}

export async function updateReceptionist(id, data) {
  const response = await api.patch(`/receptionists/${id}`, data);
  return response.data;
}
