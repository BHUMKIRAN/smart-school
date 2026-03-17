import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAttendance,
  markAttendance,
  updateAttendance,
  deleteAttendance,
} from "@/api/studentAttendance";
import { toast } from "sonner";

// ----------
// STUDENT ATTENDANCE HOOKS
// Similar to the teacher attendance hooks, these provide caches and
// easy mutation helpers for the student attendance endpoints.
// We display toast notifications for every success or failure so that
// components using these hooks don't have to worry about UI feedback.

// FETCH ALL STUDENT ATTENDANCE RECORDS
export const useStudentAttendance = (params?: Record<string, any>) =>
  useQuery({
    queryKey: ["studentAttendance", params],
    queryFn: () => getAttendance(params),
  });

// MARK/CREATE STUDENT ATTENDANCE
export const useCreateStudentAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAttendance,
    onSuccess: () => {
      toast.success("Student attendance marked");
      queryClient.invalidateQueries({ queryKey: ["studentAttendance"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to mark student attendance",
      );
    },
  });
};

// UPDATE ATTENDANCE RECORD
export const useUpdateStudentAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateAttendance({ id, data }),
    onSuccess: (_data, variables) => {
      toast.success("Student attendance updated");
      queryClient.invalidateQueries({ queryKey: ["studentAttendance"] });
      queryClient.invalidateQueries({
        queryKey: ["studentAttendance", variables.id],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });
};

// DELETE ATTENDANCE RECORD
export const useDeleteStudentAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAttendance(id),
    onSuccess: () => {
      toast.success("Student attendance deleted");
      queryClient.invalidateQueries({ queryKey: ["studentAttendance"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Delete failed");
    },
  });
};
