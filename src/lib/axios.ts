import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fe-test-api.nwappservice.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor for auth token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;