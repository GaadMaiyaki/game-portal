import { AxiosError, AxiosRequestConfig } from 'axios';

import axiosInstance from '../axios-instance';

type DataPayload = Record<string, unknown>;

class HTTPService {
  private static instance = axiosInstance;

  private static handleRequestError(error: unknown): never {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    const axiosError = error as AxiosError<{ message?: string }>;
    if (axiosError.isAxiosError && axiosError.response?.data?.message) {
      throw new Error(axiosError.response.data.message);
    }

    throw new Error('An unexpected error occurred');
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
    }
  }

  static async patch<T>(
    path: string,
    data: DataPayload,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await HTTPService.instance.patch<T>(path, data, config);
      return response.data;
    } catch (error: unknown) {
      HTTPService.handleRequestError(error);
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
    }
  }
}

export default HTTPService;
