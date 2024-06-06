// axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://vocabsathi.pythonanywhere.com/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
  
      if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
        const refreshToken = localStorage.getItem('refresh_token');
  
        if (refreshToken) {
          const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
  
          // exp date in token is expressed in seconds, while now() returns milliseconds:
          const now = Math.ceil(Date.now() / 1000);
  
          if (tokenParts.exp > now) {
            try {
              const response = await axiosInstance.post('/api/token/refresh/', { refresh: refreshToken });
              localStorage.setItem('access_token', response.data.access);
              axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
              originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;
              return axiosInstance(originalRequest);
            } catch (err) {
              console.log(err);
            }
          } else {
            console.log("Refresh token is expired", tokenParts.exp, now);
            // Redirect to login page
          }
        } else {
          console.log("Refresh token not available.");
          // Redirect to login page
        }
      }
  
      return Promise.reject(error);
    }
  );

export default axiosInstance;
