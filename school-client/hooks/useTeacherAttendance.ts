import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTeacherAttendance,
  markTeacherAttendance,
  updateTeacherAttendance,
  deleteTeacherAttendance,
} from "@/Backend/teacherAttendance";
import { toast } from "sonner";

// ----------
// TEACHER ATTENDANCE HOOKS
// These provide React Query wrappers around the API helpers defined in
// api/teacherAttendance.ts. They follow the same pattern as the other
// CRUD hooks in the project: one query for fetching data and multiple
// mutations for create/update/delete. On success or error we show a toast
// so the user sees immediate feedback.

// FETCH A LIST OF TEACHER ATTENDANCE RECORDS
// `params` can be used for paging/filtering if the API supports it.
export const useTeacherAttendance = (params?: Record<string, any>) =>
  useQuery({
    queryKey: ["teacherAttendance", params],
    queryFn: () => getTeacherAttendance(params),
  });

// CREATE / MARK ATTENDANCE FOR TEACHER
export const useCreateTeacherAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markTeacherAttendance,
    onSuccess: () => {
      toast.success("Attendance marked for teacher");
      queryClient.invalidateQueries({ queryKey: ["teacherAttendance"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to mark attendance",
      );
    },
  });
};

// UPDATE A RECORD
export const useUpdateTeacherAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateTeacherAttendance(id, data),
    onSuccess: (_data, variables) => {
      toast.success("Teacher attendance updated");
      queryClient.invalidateQueries({ queryKey: ["teacherAttendance"] });
      queryClient.invalidateQueries({
        queryKey: ["teacherAttendance", variables.id],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });
};

// DELETE A RECORD
export const useDeleteTeacherAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTeacherAttendance(id),
    onSuccess: () => {
      toast.success("Teacher attendance record deleted");
      queryClient.invalidateQueries({ queryKey: ["teacherAttendance"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Delete failed");
    },
  });
};
