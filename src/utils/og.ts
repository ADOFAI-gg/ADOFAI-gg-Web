import { PUBLIC_OPENGRAPH_ENDPOINT } from '$env/static/public';

const endpoint = PUBLIC_OPENGRAPH_ENDPOINT;

export const levelOpenGraphUrl = (id: number) => `${endpoint}/levels/${id}`;
