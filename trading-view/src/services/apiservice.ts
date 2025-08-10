import axios from "axios";

const ApiService = axios.create({
  // baseURL:"https://091ee4ec5617.ngrok-free.app/api",
  //  baseURL: "http://192.168.6.239:5060/api",
  baseURL: "https://api.trade-zone.cloudbeaststudio.com/api",
  headers: {  
    "Content-Type": "application/json",
  },
});

// Automatically add token to all requests
ApiService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default ApiService;
