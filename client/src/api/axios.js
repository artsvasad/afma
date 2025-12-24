import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. REQUEST INTERCEPTOR
// Before any request is sent, check LocalStorage for the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Attach the token to the header 'Authorization'
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. RESPONSE INTERCEPTOR (Optional but recommended)
// If the backend says "Token Expired" (401), force a logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token invalid or expired
      localStorage.removeItem('token');
      window.location.reload(); // Reloads app, sending user back to Landing Page
    }
    return Promise.reject(error);
  }
);

export default api;