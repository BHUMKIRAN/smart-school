import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // send cookies if backend uses them
});

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Prevent SSR crash in Next.js
    if (typeof window !== "undefined") {
      try {
        const persisted = localStorage.getItem("persist:root");

        if (persisted) {
          const root = JSON.parse(persisted);

          if (root.auth) {
            const auth = JSON.parse(root.auth);
            const token = auth?.token;

            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          }
        }
      } catch (error) {
        console.warn("Failed to parse auth token", error);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
