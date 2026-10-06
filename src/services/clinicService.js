import api from './api';

/**
 * Fetch public clinic settings from the backend.
 * Falls back gracefully if the backend is unreachable.
 */
export const getClinicInfo = async () => {
  const response = await api.get('/public/clinic');
  return response.data.data;
};

export const getPublicServices = async () => {
  const response = await api.get('/public/services?size=100');
  return response.data.data;
};

export const getPublicDoctors = async () => {
  const response = await api.get('/public/doctors?size=100');
  return response.data.data;
};
