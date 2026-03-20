import axios from "axios";

const API_BASE_URL =(process.env.NEXT_PUBLIC_API_URL)
  
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send cookies along with requests
});

// Get token from Redux persist or cookie
const getToken = (): string | null => {
  if (typeof window === "undefined") return null;

  try {

    const persisted = localStorage.getItem("persist:root");
    if (persisted) {
      const root = JSON.parse(persisted);
      const auth = root?.auth ? JSON.parse(root.auth) : null;
      if (auth?.token) return auth.token;
    }
  } catch(err) {
    console.log(err)
  }

  return null;
};

// Axios request interceptor to attach Authorization header
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));
