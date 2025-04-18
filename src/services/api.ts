import axios from 'axios';
import { getToken } from './authService';

const BASE_URL = 'http://ec2-34-206-72-0.compute-1.amazonaws.com:8081';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token automatically if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
