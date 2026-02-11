import Student from "../models/student.js";

const createStudents = async (req, res) => {
  await Student.create(req.body);
  res.send("Student added successfully");
};
const readStudents = async (req, res) => {
  const students = await Student.find();
  res.send(students);
};
const readStudentById = async (req, res) => {
  const Student = await Student.findById(req.params.id);
  res.send(Student);
};
const editStudentById = async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.send("Student updated");
};
const deleteStudentById = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send("Student deleted successfully");
};

export {
  createStudents,
  readStudents,
  readStudentById,
  editStudentById,
  deleteStudentById,
};
