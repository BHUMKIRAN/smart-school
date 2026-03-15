import { api } from "./axiosClientInstance";

// mark attendance
export const markAttendance = async (data) => {
  const res = await api.post("/attendance/student/mark", data);
  return res.data;
};

// get attendance
export const getAttendance = async (params?: Record<string, any>) => {
  const res = await api.get("/attendance/today", { params });
  return res.data;
};

// update attendance
export const updateAttendance = async ({ id, data }) => {
  const res = await api.patch(`/attendance/student/toggle/${id}`, data);
  return res.data;
};

// delete attendance
export const deleteAttendance = async (id) => {
  throw new Error("Delete student attendance not supported by backend");
};
