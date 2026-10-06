import api from './api';

export const getDashboardStats = async () => {
  const response = await api.get('/dashboard/stats');
  return response.data;
};

export const getDashboardAppointments = async () => {
  const response = await api.get('/dashboard/appointments');
  return response.data;
};

export const getRecentActivity = async (page = 0, size = 10) => {
  const response = await api.get('/dashboard/recent-activity', { params: { page, size } });
  return response.data;
};
