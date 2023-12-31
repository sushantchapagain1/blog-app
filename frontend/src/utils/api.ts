import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URI as string,
  withCredentials: true,
});

export default api;
