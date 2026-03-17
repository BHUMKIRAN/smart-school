import { toast } from "sonner";
import { api } from "./axiosClientInstance";

export interface Teacher {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  grade?: string;
  department?: string;
  salary?: string;
  status?: string;
  profilePic?: string;
}

export type CreateTeacherRequest = Omit<Teacher, "_id"> & {
  password?: string;
  gradeId?: string;
};

export const createTeacher = async (data: CreateTeacherRequest): Promise<Teacher> => {
  try {
    const res = await api.post<Teacher>("/teachers", data);
    toast.success("Teacher added successfully"); // Move toast BEFORE return
    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Failed to add teacher");
    throw err; // Best practice: re-throw so the UI knows the call failed
  }
};

export const readTeachers = async (): Promise<Teacher[]> => {
  try {
    const res = await api.get<Teacher[]>("/teachers");
    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Failed to load teachers");
    throw err;
  }
};

export const readById = async (id: string): Promise<Teacher> => {
  try {
    const res = await api.get<Teacher>(`/teachers/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Could not find that teacher");
    throw err;
  }
};

export const editTeacher = async (id: string, data: Teacher): Promise<Teacher> => {
  try {
    const res = await api.put<Teacher>(`/teachers/${id}`, data);
    toast.success("Teacher updated successfully"); // Move toast BEFORE return
    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Failed to update teacher");
    throw err;
  }
};

export const deleteTeacher = async (id: string): Promise<{ message?: string }> => {
  try {
    const res = await api.delete<{ message?: string }>(`/teachers/${id}`);
    toast.success("Teacher deleted successfully"); // Move toast BEFORE return
    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete teacher");
    throw err;
  }
};