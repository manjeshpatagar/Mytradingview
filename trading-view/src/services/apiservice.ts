import axios from "axios";

const ApiService = axios.create({
  baseURL: "https://api.trade-zone.cloudbeaststudio.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically add token to all requests
ApiService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default ApiService;
