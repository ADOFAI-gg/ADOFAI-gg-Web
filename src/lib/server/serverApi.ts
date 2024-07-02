import Axios from 'axios';
import { env } from '$env/dynamic/private';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const serverApi = Axios.create({
  baseURL: env.PRIVATE_API_ENDPOINT || PUBLIC_API_ENDPOINT
});
