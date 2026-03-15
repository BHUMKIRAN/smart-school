import Assignment from "../models/assigment.js";


// CREATE ASSIGNMENT
export const createAssignment = async (req, res) => {
  try {
    const { title, description, grade, subject, dueDate, teacher } = req.body;

    const assignment = new Assignment({
      title,
      description,
      grade,
      subject,
      dueDate,
      teacher,
      fileUrl: req.file ? `/uploads/assignments/${req.file.filename}` : null,
    });

    await assignment.save();

    res.status(201).json({
      message: "Assignment created successfully",
      assignment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET ASSIGNMENTS BY GRADE
export const getAssignmentsByGrade = async (req, res) => {
  try {
    const { grade } = req.params;

    const assignments = await Assignment.find({ grade: req.params.gradeId  })
      .populate("teacher", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET ALL ASSIGNMENTS
export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("teacher", "name")
      .populate("grade", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// DELETE ASSIGNMENT
export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    await Assignment.findByIdAndDelete(id);

    res.status(200).json({
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};