import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  readTeachers,
  readById,
  createTeacher,
  editTeacher,
  deleteTeacher,
} from "@/api/teacherApi";

import { toast } from "sonner";

// ---------------------------------
// TEACHER-RELATED QUERY HOOKS
// The patterns here mirror the student hooks but include some
// extra toast notifications so we can see success/failure messages.
// React Query automatically handles caching, refetching, and
// background updates when we invalidate queries below.

// FETCH ALL TEACHERS
export const useTeachers = () =>
  useQuery({
    queryKey: ["teachers"],
    queryFn: readTeachers,
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to fetch teachers");
    },
  });

// FETCH A SINGLE TEACHER BY ID
export const useTeacher = (id: string | undefined) =>
  useQuery({
    queryKey: ["teachers", id],
    queryFn: () => readById(id!),
    enabled: !!id,
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to fetch teacher");
    },
  });

// CREATE TEACHER
export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      toast.success("Teacher created successfully");
      // after creating we want to refetch the list so the UI shows the new entry
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Create failed");
    },
  });
};

// UPDATE TEACHER
export const useEditTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editTeacher,
    onSuccess: (_data, variables) => {
      toast.success("Teacher updated successfully");
      // Invalidate the list as well as the individual cache if desired
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: ["teachers", variables.id] });
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });
};

// DELETE TEACHER
export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => {
      toast.success("Teacher deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Delete failed");
    },
  });
};
