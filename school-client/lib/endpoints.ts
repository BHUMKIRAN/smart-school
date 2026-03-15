// lib/endpoints.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  STUDENTS: `${API_BASE_URL}/students`,
  PUBLIC_SCHOOL_PAGE: `${API_BASE_URL}/public/school-page`,
};
