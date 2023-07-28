import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your actual API base URL
});

const getAccessTokenFromCookies =()=>{
  return sessionStorage.getItem('token');
}
api.interceptors.request.use(function (config) {
  const token = getAccessTokenFromCookies(); // Implement this function to get the token from cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

