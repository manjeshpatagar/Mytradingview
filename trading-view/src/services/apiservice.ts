// src/services/apiservice.ts
import axios ,{AxiosInstance} from "axios";

const ApiService:AxiosInstance = axios.create({
  baseURL: "http://192.168.1.38:5006/api", // ✅ Use backend machine’s LAN IP
  headers: {
    "Content-Type": "application/json",
  },
});

ApiService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default ApiService;
