import api from './api';

api.setJwt();

export const fetchMortgages = async () => {
  const res = await api.get('/mortgage');
  return res.data.data;
};
