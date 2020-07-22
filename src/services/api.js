import axios from 'axios';
import { tokenKey } from './auth';

export const baseURL = 'http://159.89.136.159:3030/api/v1';

const apiCall = axios.create({
  baseURL,
});

const setJwt = () =>
  (apiCall.defaults.headers.common.Authorization = `Bearer ${getJwt()}`);

const getJwt = () => localStorage.getItem(tokenKey);

export default {
  get: apiCall.get,
  post: apiCall.post,
  put: apiCall.put,
  patch: apiCall.patch,
  delete: apiCall.delete,
  setJwt,
  getJwt,
};
