import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rishin-consumet-api.vercel.app',
});

export default api;
