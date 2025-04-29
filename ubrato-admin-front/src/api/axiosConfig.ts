import axios, { isAxiosError } from "axios";
import { apiAuth } from "./services/auth";

export const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "content-type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken",
  )}`;
  return config;
});

// interceptor for refreshing accessToken if expired
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (isAxiosError(error)) {
      if (
        error.response?.status == 401 &&
        error.config &&
        !error.config.params.isRetry
      ) {
        originalRequest.isRetry = true;
        try {
          const response = await apiAuth.refresh();
          localStorage.setItem("accessToken", response.data.data.access_token);
          return api.request(originalRequest);
        } catch (error) {
          console.log(error);
        }
      } else {
        // logout user if refreshToken is expired
        if (
          error.response?.status == 401 &&
          error.config &&
          error.config.params.isRetry
        ) {
          localStorage.removeItem("accessToken");
        }
      }
    }
    return Promise.reject(error);
  },
);

export const apiStore = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
