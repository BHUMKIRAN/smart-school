import { toast } from "sonner";
import { api } from "./axiosClientInstance";

export const getTeacherAttendance = async () => {
  try {
    const res = await api.get("/attendanceTeacher");
    toast.success("Teacher attendance fetched successfully!");
    return res.data;
  } catch (e) {
    toast.error("Failed to fetch teacher attendance");
  }
};

export const markTeacherAttendance = async ({
  teacherId,
  status,
}: {
  teacherId: string;
  status: string;
}) => {
  try {
    const res = await api.post(`/attendanceTeacher`, { // no id here
      teacherId,
      status,
    });

    toast.success("Attendance marked!");
    return res.data;
  } catch (e: any) {
    toast.error(e?.response?.data?.message || "Failed to mark teacher attendance");
    throw e; // important to let React Query catch the error
  }
};
