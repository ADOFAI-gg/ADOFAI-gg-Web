import Axios from 'axios';
import { toast } from 'react-toastify';

export const api = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`
});

api.interceptors.response.use(
  (response) => {
    console.log('리스폰스');
    return response;
  },
  (error) => {
    toast.error(
      <>
        There is a problem with connecting to the server. Click here to check
        the status.
      </>,
      {
        position: 'bottom-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        onClick: () => window.open('https://adofaigg.statuspage.io/', '_blank'),
        toastId: 'APIError'
      }
    );

    return Promise.reject(error);
  }
);

export const get = (url, params) => api.get(url, params);

// export const post = (url, data) =>
//   api.post(url, data);

// export const put = (url, data) =>
//   api.put(url, data);

// export const patch = (url, data) =>
//   api.patch(url, data);

// export const del = (url) =>
//   api.delete(url);
