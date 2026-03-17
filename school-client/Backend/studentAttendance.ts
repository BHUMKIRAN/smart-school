import { api } from "./axiosClientInstance";

interface Attendance {
  _id: string;
  studentId: string;
  status: "present" | "absent";
  date: string;
}

interface MarkAttendanceRequest {
  studentId: string;
  status: "present" | "absent";
  date?: string;
}

// mark attendance
export const markAttendance = async (
  data: MarkAttendanceRequest
): Promise<Attendance> => {
  const res = await api.post<Attendance>("/attendance/student/mark", data);
  return res.data;
};

// get attendance
export const getAttendance = async (
  params?: { date?: string; studentId?: string }
): Promise<Attendance[]> => {
  const res = await api.get<Attendance[]>("/attendance/today", { params });
  return res.data;
};

// update attendance
export const updateAttendance = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<MarkAttendanceRequest>;
}): Promise<Attendance> => {
  const res = await api.patch<Attendance>(
    `/attendance/student/toggle/${id}`,
    data
  );
  return res.data;
};

// delete attendance
export const deleteAttendance = async (id: string): Promise<never> => {
  throw new Error("Delete student attendance not supported by backend");
};