import Teacher from "../models/teacher.js";
import Grade from "../models/grade.js";
import bcrypt from "bcryptjs";

// CREATE teacher and assign to grade
const createTeachers = async (req, res) => {
  try {
    const { name, email, password, subject, phone, department, salary, gradeId } = req.body;

    // Validate required fields
    if (!name || !email || !password || !subject || !gradeId) {
      return res.status(400).json({
        message: "Name, email, password, subject, and gradeId are required",
      });
    }

    // Check if teacher already exists
    const existingUser = await Teacher.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create teacher
    const newTeacher = await Teacher.create({
      name,
      email,
      password: hashedPassword,
      department,
      subject,
      phone,
      salary,
    });

    // Assign teacher to grade
    const grade = await Grade.findById(gradeId);
    if (!grade) {
      return res.status(404).json({ message: "Grade not found" });
    }

    // Add teacher to grade's subjects
    grade.subjects.push({
      name: subject,
      teacher: newTeacher._id,
    });
    await grade.save();

    // Add grade to teacher's grades array
    newTeacher.grades.push(grade._id);
    await newTeacher.save();

    res.status(201).json({
      message: "teacher created and assigned to grade successfully",
      teacher: {
        id: newTeacher._id,
        name: newTeacher.name,
        email: newTeacher.email,
        role: newTeacher.role,
        department: newTeacher.department,
        subject: newTeacher.subject,
        phone: newTeacher.phone,
        salary: newTeacher.salary,
        grades: newTeacher.grades,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// READ ALL teachers
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
      return res.status(404).json({ message: "teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE teacher
const editTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
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
    res.status(200).json({ message: "teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Keep exports exactly as you wanted
export {
  createTeachers,
  readTeachers,
  readTeacherById,
  editTeacherById,
  deleteTeacherById,
};