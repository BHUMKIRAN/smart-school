import { useQuery, useMutation, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import {
  readStudents,
  readStudentById,
  createStudent,
  editStudent,
  deleteStudent,
} from "@/api/studentApi";
import { toast } from "sonner";

// -------------------------
// STUDENT REACT QUERY HOOKS
// -------------------------
// These hooks wrap the API functions from studentApi.ts and provide
// React Query behaviour (caching, invalidation, error handling, etc).
// We also show toast notifications on success/failure so the UI can give
// immediate feedback to the user.

// GET ALL STUDENTS
export const useStudents = (): UseQueryResult<Awaited<ReturnType<typeof readStudents>>, unknown> =>
  useQuery<Awaited<ReturnType<typeof readStudents>>>({
    queryKey: ["students"],
    queryFn: readStudents,
  });

// GET A SINGLE STUDENT BY ID
export const useStudent = (id: string | undefined) =>
  useQuery<Awaited<ReturnType<typeof readStudentById>>>({
    queryKey: ["students", id],
    queryFn: () => readStudentById(id!),
    enabled: !!id, // only execute query if we actually have an id
  });

// CREATE A NEW STUDENT
export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      // Invalidate the students list so it will refetch and show the new one
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Create failed");
    },
  });
};

// UPDATE AN EXISTING STUDENT
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      editStudent(id, data),
    // variables is what was passed to mutate; data is the API response
    onSuccess: (_data, variables) => {
      // invalidate both the list and the individual cache
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["students", variables.id] });
      toast.success("Student updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });
};

// DELETE A STUDENT
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Delete failed");
    },
  });
};
