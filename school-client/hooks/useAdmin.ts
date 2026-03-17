import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTeacherAttendance,
  markTeacherAttendance,
} from "../Backend/adminBack";
import { toast } from "sonner";

export const useTeacherAttendance = () => {
  return useQuery({
    queryKey: ["teacherAttendance"],
    queryFn: getTeacherAttendance,
  });
};

export const useMarkTeacherAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markTeacherAttendance,

    onSuccess: () => {
      toast.success("Teacher attendance marked successfully");

      queryClient.invalidateQueries({
        queryKey: ["teacherAttendance"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Mark failed");
    },
  });
};
