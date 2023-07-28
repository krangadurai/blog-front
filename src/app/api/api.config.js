
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your actual API base URL
  withCredentials: true,
});

// api.interceptors.request.use(
//   (config) => {
//     // Get the JWT token from the Redux store or wherever it is stored
//     const token = getAuthTokenFromReduxStore(); // Implement this function to retrieve the token

//     // Add the Authorization header with the JWT token
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     // Handle request error
//     return Promise.reject(error);
//   }
// );


export default api;