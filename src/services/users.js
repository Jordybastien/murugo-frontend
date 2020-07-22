import api from './api';

export const loginUser = async (user) => {
  const res = await api.post('/auth/login', user);
  return res.data.data;
};
