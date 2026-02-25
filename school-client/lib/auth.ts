// lib/auth.ts
import axios from "axios";

const API_URL = "http://localhost:8080"; // Your backend

// Axios instance for public requests
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios instance for protected requests
export const apiWithAuth = axios.create({
  baseURL: API_URL,
});

apiWithAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// Login function
export const login = async ({ email, password }: { email: string; password: string }) => {
  try {
    const res = await api.post("/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("smart-school-user", JSON.stringify(res.data.user));

    return res.data;
  } catch (error: unknown) {
    const err = error as ApiError;
    throw new Error(err.response?.data?.message || "Login failed");
  }
};
/* ================================
   REGISTER FUNCTION
================================ */
export const register = async ({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role: "admin" | "teacher" | "student";
}) => {
  try {
    const res = await api.post("/register", {
      name,
      email,
      password,
      role,
    });

    return res.data;
  } catch (error: unknown) {
    const err = error as ApiError;
    console.log("Full error:", err);
    console.log("Response:", err.response);
    console.log("Data:", err.response?.data);
    throw new Error(
      err.response?.data?.message || "Registration failed"
    );
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("smart-school-user");
};

// Forgot Password function
export const forgotPassword = async ({ email }: { email: string }) => {
  try {
    const res = await api.post("/auth/forgot-password", { email });
    return res.data;
  } catch (error: unknown) {
    const err = error as ApiError;
    throw new Error(err.response?.data?.message || "Forgot password request failed");
  }
};
