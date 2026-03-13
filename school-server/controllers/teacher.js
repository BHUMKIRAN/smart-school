import Teacher from "../models/teacher.js";
import bcrypt from "bcryptjs";

// CREATE teacher
const createTeachers = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Check existing teacher
    const existingUser = await Teacher.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create teacher
    const newUser = await Teacher.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "teacher created successfully",
      teacher: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// READ ALL teacherS
const readTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().select("-password");
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ teacher BY ID
const readTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).select("-password");

    if (!teacher) {
      return res.status(404).json({
        message: "teacher not found",
      });
    }

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE teacher
const editTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "teacher updated successfully",
      teacher,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE teacher
const deleteTeacherById = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "teacher deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createTeachers,
  readTeachers,
  readTeacherById,
  editTeacherById,
  deleteTeacherById,
};