import axios from 'axios';

const axiosBase = axios.create({
  baseURL: 'http://localhost:5500/api',
});

// Intercept requests to add the authorization token
axiosBase.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Set the token in headers
  }
  return config;
});

export default axiosBase;