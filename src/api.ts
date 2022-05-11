import Axios from 'axios';

export const api = Axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
});
