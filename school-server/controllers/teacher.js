import Teacher from "../models/teacher.js";

const createTeacher = async (req, res) => {
  await Teacher.create(req.body);
  res.send("Teacher added successfully");
};
const readTeachers = async (req, res) => {
  const teachers = await Teacher.find();
  res.send(teachers);
};
const readTeacher = async (req, res) => {
  const teacher = Teacher.findById(req.params.id);
  res.send(teacher);
};
const editTeacher = async (req, res) => {
  await Teacher.findByIdAndUpdate(req.params.id, req.body);
  res.send("Student updated successfuly");
};
const deleteTeacher = async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
};

export { createTeacher, readTeachers, readTeacher, editTeacher, deleteTeacher };
