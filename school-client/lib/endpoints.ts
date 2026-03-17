// lib/endpoints.ts
const rawBaseUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://smart-school-e0fm.onrender.com/";
// Normalize to avoid double slashes when concatenating paths
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  STUDENTS: `${API_BASE_URL}/students`,
  PUBLIC_SCHOOL_PAGE: `${API_BASE_URL}/public/school-page`,
};
