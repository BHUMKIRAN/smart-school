import { api } from "./axiosClientInstance";

interface LoginRequest {
  email: string;
  password: string;
  role: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", data);
  return res.data;
};

export const logoutApi = async (): Promise<{ message: string }> => {
  const res = await api.post<{ message: string }>("/auth/logout");
  return res.data;
};