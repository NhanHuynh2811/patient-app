import { request } from '../../utils/request';

const apis = '/api/patient';

export const getAllPatient = () => {
  return request({
    url: `${apis}`,
    method: 'GET',
    params: {},
  });
};

export const getPatient = (patientId) => {
  return request({
    url: `${apis}/${patientId}`,
    method: 'GET',
    params: {},
  });
};

export const createNewPatient = (patient) => {
  return request({
    url: `${apis}`,
    method: 'POST',
    params: {},
    data: { ...patient },
  });
};

export const updatePatient = (patientReq) => {
  return request({
    url: `${apis}/${patientReq.patientId}`,
    method: 'PUT',
    params: {},
    data: { ...patientReq.data },
  });
};

export const deletePatient = (patientId) => {
  return request({
    url: `${apis}/${patientId}`,
    method: 'DELETE',
    params: {},
    data: {},
  });
};

export const searchPatient = (patientParams) => {
  return request({
    url: `${apis}/search`,
    method: 'POST',
    params: {},
    data: { ...patientParams },
  });
};
