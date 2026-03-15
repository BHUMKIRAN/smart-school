import Submission from "../models/submission.js";


// SUBMIT ASSIGNMENT
export const submitAssignment = async (req, res) => {
  try {
    const { assignment, student, remark } = req.body;

    // prevent duplicate submission
    const existing = await Submission.findOne({
      assignment,
      student,
    });

    if (existing) {
      return res.status(400).json({
        message: "You already submitted this assignment",
      });
    }

    const submission = new Submission({
      assignment,
      student,
      remark,
      fileUrl: req.file
        ? `/uploads/submissions/${req.file.filename}`
        : null,
    });

    await submission.save();

    res.status(201).json({
      message: "Assignment submitted successfully",
      submission,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET SUBMISSIONS FOR ASSIGNMENT
export const getSubmissionsByAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const submissions = await Submission.find({
      assignment: assignmentId,
    })
      .populate("student", "name email grade")
      .sort({ createdAt: -1 });

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET STUDENT SUBMISSIONS
export const getStudentSubmissions = async (req, res) => {
  try {
    const { studentId } = req.params;

    const submissions = await Submission.find({
      student: studentId,
    })
      .populate("assignment", "title subject dueDate")
      .sort({ createdAt: -1 });

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE SUBMISSION STATUS (Teacher checks)
export const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, grade, remark } = req.body;

    const submission = await Submission.findByIdAndUpdate(
      id,
      { status, grade, remark },
      { new: true }
    );

    res.status(200).json({
      message: "Submission updated successfully",
      submission,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
