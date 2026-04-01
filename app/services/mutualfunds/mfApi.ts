import axios from "axios";

const mfApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_MF_API ||
    "http://192.168.1.83:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

mfApi.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? document.cookie.match(/authToken=([^;]+)/)?.[1] : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default mfApi;