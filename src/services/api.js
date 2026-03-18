import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
  timeout: 60000,
  withCredentials: false, // REQUIRED for refresh cookies
});

export default api;
