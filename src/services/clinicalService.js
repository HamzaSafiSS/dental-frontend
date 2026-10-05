import api from './api';

export async function getPatientDentalRecords(patientId, page = 0, size = 20) {
  const response = await api.get(`/patients/${patientId}/dental-records`, {
    params: { page, size }
  });
  return response.data;
}

export async function getPatientTreatmentPlans(patientId, page = 0, size = 20) {
  const response = await api.get(`/patients/${patientId}/treatment-plans`, {
    params: { page, size }
  });
  return response.data;
}

export async function getPatientPrescriptions(patientId, page = 0, size = 20) {
  const response = await api.get(`/patients/${patientId}/prescriptions`, {
    params: { page, size }
  });
  return response.data;
}
