import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

// Interceptor para agregar el token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // o desde context, cookies, etc.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;