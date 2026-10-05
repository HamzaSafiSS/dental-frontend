import api from './api';

/**
 * Submit a guest review (public, no authentication required).
 * Hits POST /api/v1/public/reviews — sends email notification to clinic.
 *
 * @param {{ name: string, email?: string, rating: number, comment: string, treatment?: string }} data
 * @returns {Promise<{ message: string }>}
 */
export async function submitGuestReview(data) {
  const response = await api.post('/public/reviews', data);
  return response.data;
}
