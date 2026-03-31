// lib/endpoints.ts
const publicBaseUrl = process.env.NEXT_PUBLIC_API_URL;
const internalBaseUrl =
  process.env.API_BASE_URL || process.env.INTERNAL_API_BASE_URL;

export const API_BASE_URL =
  typeof window === "undefined"
    ? internalBaseUrl || publicBaseUrl
    : publicBaseUrl;

export const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  STUDENTS: `${API_BASE_URL}/students`,
  PUBLIC_SCHOOL_PAGE: `${API_BASE_URL}/public/school-page`,
};
