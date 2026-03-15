import { api } from "./axiosClientInstance";
import { toast } from "sonner";

// Mark/Create Teacher Attendance
export const markTeacherAttendance = async (data) => {
  try {
    const res = await api.post("/attendance/teacherAttendance", data);
    toast.success("Teacher attendance marked");
    return res.data;
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to mark teacher attendance");
    throw err;
  }
};

// Get All Teacher Attendance
export const getTeacherAttendance = async (params) => {
  try {
    const res = await api.get("/attendance/today", {
      params: { role: "Teacher", ...(params || {}) },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Could not fetch teacher attendance records");
  }
};

// Update Teacher Attendance
export const updateTeacherAttendance = async (id, data) => {
  try {
    throw new Error("Update teacher attendance not supported by backend");
  } catch (err) {
    toast.error("Update failed");
    throw err;
  }
};

// Delete Teacher Attendance
export const deleteTeacherAttendance = async (id) => {
  try {
    throw new Error("Delete teacher attendance not supported by backend");
  } catch (err) {
    toast.error("Delete failed");
    throw err;
  }
};
