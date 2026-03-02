import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// optional interceptor this will add the token to the request from localStorage if any user is logged in
api.interceptors.request.use((config) => {
  try {
    const persisted = localStorage.getItem("persist:root");
    if (persisted) {
      // redux-persist serializes each slice as a string value, so auth itself
      // is stored as a JSON string inside the root object.
      const root = JSON.parse(persisted);
      if (root.auth) {
        const auth = JSON.parse(root.auth);
        const token = auth.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
  } catch (e) {
    // ignore parsing errors, request will simply go without auth header
    console.warn("Failed to load auth token from storage", e);
  }
  return config;
});
