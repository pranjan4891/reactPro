// src/utils/axiosConfig.ts

import axios from 'axios';
import {apiEndpoints, API_URL} from "./constants/apiEndpoints";
// Create an Axios instance
const api = axios.create({
  baseURL: API_URL, // Replace with your Laravel API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the authorization token if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;