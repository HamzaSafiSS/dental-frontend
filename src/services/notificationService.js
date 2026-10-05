import api from './api';

export async function getMyNotifications(page = 0, size = 20) {
  const response = await api.get('/notifications/my', {
    params: { page, size }
  });
  return response.data;
}
