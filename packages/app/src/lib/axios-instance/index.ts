import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const setToken = (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = `${token}`;
};

axiosInstance.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig<unknown>
  ): InternalAxiosRequestConfig<unknown> => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse<unknown, unknown>) => {
    return Promise.resolve(res);
  },
  (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    return Promise.reject(error.response);
  }
);

export default axiosInstance;
