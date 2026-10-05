import api from './api';

/**
 * Submit the public contact form.
 * Hits POST /api/v1/public/contact — no authentication required.
 *
 * @param {{ name: string, phone: string, email: string, subject: string, message: string }} data
 * @returns {Promise<{ message: string }>}
 */
export async function submitContactForm(data) {
  const response = await api.post('/public/contact', data);
  return response.data;
}
