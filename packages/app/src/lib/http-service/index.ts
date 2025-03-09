import { AxiosError, AxiosRequestConfig } from 'axios';

import axiosInstance from '../axios-instance';

type DataPayload = Record<string, unknown>;

class HTTPService {
  private static instance = axiosInstance;

  private static handleRequestError(error: unknown) {
    const axiosError = error as AxiosError<{
      [key: string]: string;
    }>;

    if (axiosError.isAxiosError && axiosError.response?.data) {
      const errorMessage =
        axiosError.response?.data?.message || 'An error occurred';
      throw new Error(errorMessage);
    } else if (error instanceof Error) {
      const errorMessage = error.message || 'An error occurred';
      throw new Error(errorMessage);
    }
  }

  static async get<T>(
    path: string,
    params?: DataPayload,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await HTTPService.instance.get<T>(path, {
        params,
        ...config,
      });
      return response.data;
    } catch (error: unknown) {
      HTTPService.handleRequestError(error);
      throw error;
    }
  }

  static async post<T>(
    path: string,
    data: DataPayload,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await HTTPService.instance.post<T>(path, data, config);
      return response.data;
    } catch (error: unknown) {
      HTTPService.handleRequestError(error);
      throw error;
    }
  }

  static async put<T>(
    path: string,
    data: DataPayload,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await HTTPService.instance.put<T>(path, data, config);
      return response.data;
    } catch (error: unknown) {
      HTTPService.handleRequestError(error);
      throw error;
    }
  }

  static async delete<T>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await HTTPService.instance.delete<T>(path, config);
      return response.data;
    } catch (error: unknown) {
      HTTPService.handleRequestError(error);
      throw error;
    }
  }
}

export default HTTPService;
