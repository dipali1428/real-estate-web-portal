// app/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.83:5000", // ✅ backend base URL
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
