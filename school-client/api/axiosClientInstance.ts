import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers:{
    "Content-Type":"application/json"
  }
});

// optional interceptor this will add the token to the request from localStorage if any user is logged in
api.interceptors.request.use((config) => {

  const user = localStorage.getItem("user");

  if (user) {
    const token = JSON.parse(user).token;
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});