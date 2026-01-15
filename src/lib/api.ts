import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rishinverse-consumet-api.vercel.app',
});

export default api;
