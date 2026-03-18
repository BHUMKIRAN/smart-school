import { toast } from "sonner";
import { api } from "./axiosClientInstance";

interface Student {
  _id: string;
  name: string;
  email: string;
  grade: string | { _id: string; grade: number; section?: string };
  password?: string;
  class?: string;
  attendance?: {
    status?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

type CreateStudentRequest = Omit<Student, "_id" | "createdAt" | "updatedAt">;
type UpdateStudentRequest = Partial<CreateStudentRequest>;

export const createStudent = async (
  data: CreateStudentRequest
): Promise<Student> => {
  try {
    const res = await api.post<Student>("/students", data);
    toast.success("Student added successfully!");
    return res.data;
  } catch (err) {
    console.error("Create Student Error:", err);
    toast.error("Failed to add student");
    throw err;
  }
};

export const readStudents = async (): Promise<Student[]> => {
  try {
    const res = await api.get<Student[]>("/students");
    return res.data;
  } catch (err) {
    console.error("Read Students Error:", err);
    toast.error("Could not load student list");
    throw err;
  }
};

export const readStudentById = async (id: string): Promise<Student> => {
  try {
    const res = await api.get<Student>(`/students/${id}`);
    return res.data;
  } catch (err) {
    console.error("Read Student Error:", err);
    toast.error("Student not found");
    throw err;
  }
};

export const editStudent = async (
  id: string,
  data: UpdateStudentRequest
): Promise<Student> => {
  try {
    const res = await api.put<Student>(`/students/${id}`, data);
    toast.success("Student updated successfully!");
    return res.data;
  } catch (err) {
    console.error("Update Student Error:", err);
    toast.error("Failed to update student");
    throw err;
  }
};

export const deleteStudent = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const res = await api.delete<{ message: string }>(`/students/${id}`);
    toast.success("Student deleted successfully");
    return res.data;
  } catch (err) {
    console.error("Delete Student Error:", err);
   
    throw err;
  }
};