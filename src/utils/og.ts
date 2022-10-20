const endpoint = import.meta.env.VITE_OPENGRAPH_ENDPOINT;

export const levelOpenGraphUrl = (id: number) => `${endpoint}/levels/${id}`;
