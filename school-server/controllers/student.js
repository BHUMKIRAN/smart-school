import Student from "../models/student.js";
import Grade from "../models/grade.js"; // import Grade model
import bcrypt from "bcryptjs";

// ------------------------------ CREATE STUDENT ------------------------------
const createStudents = async (req, res) => {
  try {
    const { name, email, password, grade } = req.body;

    // Validate required fields
    if (!name || !email || !password || !grade) {
      return res.status(400).json({
        message: "Name, email, password, and grade are required",
      });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create student
    const newStudent = await Student.create({
      name,
      email,
      password: hashedPassword,
      grade, // store grade ID
    });

    // Update Grade document to include this student
    await Grade.findByIdAndUpdate(
      grade,
      { $push: { students: newStudent._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Student created successfully",
      student: {
        id: newStudent._id,
        name: newStudent.name,
        email: newStudent.email,
        grade: newStudent.grade,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ------------------------------ READ ALL STUDENTS ------------------------------
const readStudents = async (req, res) => {
  try {
    // Optional: filter by grade
    const query = {};
    if (req.query.grade) query.grade = req.query.grade;

    // Fetch students and populate grade info
    const students = await Student.find(query)
      .select("-password")
      .populate({
        path: "grade",
        select: "grade section", // only get these fields from Grade
      });

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ------------------------------ READ STUDENT BY ID ------------------------------
const readStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ------------------------------ UPDATE STUDENT ------------------------------
const editStudentById = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // If password is provided, hash it
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    } else {
      delete updateData.password; // remove if empty
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ------------------------------ DELETE STUDENT ------------------------------
const deleteStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Remove student from Grade
    await Grade.findByIdAndUpdate(student.grade, { $pull: { students: student._id } });

    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export {
  createStudents,
  readStudents,
  readStudentById,
  editStudentById,
  deleteStudentById,
};