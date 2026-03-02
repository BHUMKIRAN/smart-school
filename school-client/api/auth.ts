import { api } from "./axiosClientInstance";

export const login = async (data) => {
  // We let the component handle the try/catch to manage local loading states
  const res = await api.post("/auth/login", data);
  return res.data; // Expected: { user, token }
};

export const logoutApi = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};
