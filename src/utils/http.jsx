import React from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';

export const api = Axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);

    toast.error(
      <>
        There is a problem with connecting to the server. Click here to check
        the status.
      </>,
      {
        position: 'bottom-right',
        autoClose: false,
        closeOnClick: false,
        onClick: () => window.open('https://adofaigg.statuspage.io/', '_blank'),
        toastId: 'APIError'
      }
    );

    return Promise.reject(error);
  }
);

export const get = (url, params) => api.get(url, { params });

// export const post = (url, data) =>
//   api.post(url, data);

// export const put = (url, data) =>
//   api.put(url, data);

// export const patch = (url, data) =>
//   api.patch(url, data);

// export const del = (url) =>
//   api.delete(url);
