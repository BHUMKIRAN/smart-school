import { api } from "./client";

// mark attendance
export const markAttendance = async (data) => {
  const res = await api.post("/attendance", data);
  return res.data;
};

// get attendance
export const getAttendance = async () => {
  const res = await api.get("/attendance");
  return res.data;
};

// update attendance
export const updateAttendance = async ({ id, data }) => {
  const res = await api.put(`/attendance/${id}`, data);
  return res.data;
};

// delete attendance
export const deleteAttendance = async (id) => {
  const res = await api.delete(`/attendance/${id}`);
  return res.data;
};