import { toast } from "sonner";
import { api } from "./axiosClientInstance";


export const createStudent = async (data) => {
  try {
    const res = await api.post("/students", data);
    toast.success("Student added successfully!");
    return res.data; 
  } catch (err) {
    console.error("Create Student Error:", err);
    toast.error("Failed to add student");
    throw err; 
  }
};


export const readStudents = async () => {
  try {
    const res = await api.get("/students");
    return res.data;
  } catch (err) {
    console.error("Read Students Error:", err);
    toast.error("Could not load student list");
  }
};


export const readStudentById = async (id) => {
  try {
    const res = await api.get(`/students/${id}`);
    return res.data;
  } catch (err) {
    console.error("Read Student Error:", err);
    toast.error("Student not found");
  }
};


export const editStudent = async ( id , data) => {
  try {
    const res = await api.put(`/students/${id}`, data);
    toast.success("Student updated successfully!");
    return res.data;
  } catch (err) {
    console.error("Update Student Error:", err);
    toast.error("Failed to update student");
    throw err;
  }
};

export const deleteStudent = async (id) => {
  try {
    const res = await api.delete(`/students/${id}`);
    toast.success("Student deleted successfully");
    return res.data;
  } catch (err) {
    console.error("Delete Student Error:", err);
    toast.error("Failed to delete student");
    throw err;
  }
};