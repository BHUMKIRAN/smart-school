import { toast } from "sonner";
import { api } from "./axiosClientInstance";

export const createTeacher = async (data) => {
  try {
    const res = await api.post("/teachers", data);
    toast.success("Teacher added successfully"); // Move toast BEFORE return
    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Failed to add teacher");
    throw err; // Best practice: re-throw so the UI knows the call failed
  }
};

export const readTeachers = async () => {
  try {
    const res = await api.get("/teachers");
    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Failed to load teachers");
  }
};

export const readById = async (id) => {
  try {
    const res = await api.get(`/teachers/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Could not find that teacher");
  }
};

export const editTeacher = async (id, data) => {
  try {
    const res = await api.put(`/teachers/${id}`, data);
    toast.success("Teacher updated successfully"); // Move toast BEFORE return
    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Failed to update teacher");
    throw err;
  }
};

export const deleteTeacher = async (id) => {
  try {
    const res = await api.delete(`/teachers/${id}`);
    toast.success("Teacher deleted successfully"); // Move toast BEFORE return
    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete teacher");
    throw err;
  }
};