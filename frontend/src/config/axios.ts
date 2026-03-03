import axios from "axios";
import { useStore } from "@/store";

const appAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

interface PendingRequest {
  resolve: (value: string | null) => void;
  reject: (reason?: unknown) => void;
}

let isRefreshing = false;
let failedQueue: PendingRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// Attach JWT from Zustand store if present (for admin & secured mutations)
appAxios.interceptors.request.use(
  (config) => {
    const token = useStore.getState().accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

appAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return appAxios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Let the cookie handle the refresh automatically
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            withCredentials: true,
          },
        );

        // Set new credentials in Zustand
        useStore
          .getState()
          .setCredentials(
            { email: data.email, role: data.role, name: data.name },
            data.token,
          );

        appAxios.defaults.headers.common["Authorization"] =
          "Bearer " + data.token;
        originalRequest.headers["Authorization"] = "Bearer " + data.token;

        processQueue(null, data.token);

        return appAxios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        useStore.getState().logout();

        // If we're on the client side, push to login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default appAxios;
