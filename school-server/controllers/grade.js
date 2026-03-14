import Grade from "../models/grade.js";

// GET all grades
export const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find()
      .select("grade section") // only send necessary fields
      .sort({ grade: 1, section: 1 });

    res.status(200).json(grades);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET single grade by ID
export const getGradeById = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id)
      .populate("students", "name email")
      .populate("subjects.teacher", "name email");

    if (!grade) return res.status(404).json({ message: "Grade not found" });

    res.status(200).json(grade);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// POST a new grade
export const createGrade = async (req, res) => {
  try {
    const { grade, section } = req.body;

    if (!grade) {
      return res.status(400).json({ message: "Grade is required" });
    }

    const newGrade = await Grade.create({
      grade,
      section: section || null, // optional
    });

    res.status(201).json({
      message: "Grade created successfully",
      grade: newGrade,
    });

  } catch (err) {
    console.error("CreateGrade Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getStudentsByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    // Find the grade(s) assigned to this teacher
    const grade = await Grade.findOne({ "subjects.teacher": teacherId })
      .populate({
        path: "students",
        select: "_id name rollNumber",
      });

    if (!grade) return res.status(404).json({ message: "No students found for this teacher" });

    res.status(200).json({
      grade,
      students: grade.students,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};