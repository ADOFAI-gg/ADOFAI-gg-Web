import Axios from 'axios';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const api = Axios.create({
  baseURL: PUBLIC_API_ENDPOINT
});
