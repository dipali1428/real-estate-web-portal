// app/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // Enable sending cookies (authToken) with each request
  withCredentials: true,
  // No default Content-Type; each request will set its own as needed
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
