// API client with interceptors
import axios from 'axios';
import { BACKEND_URL } from '../../config';

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token expired or invalid
      localStorage.removeItem('token');
      globalThis.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default api;
