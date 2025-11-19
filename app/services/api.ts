// app/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://13.127.153.153", // ✅ backend base URL
  // "http://192.168.1.83:5000"
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? document.cookie.match(/authToken=([^;]+)/)?.[1] : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
