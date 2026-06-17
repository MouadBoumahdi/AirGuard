import axios from 'axios';

// 1. Define the base instance configuration
const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Match this to your Laravel server URL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;