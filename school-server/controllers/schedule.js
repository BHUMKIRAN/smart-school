// controllers/scheduleController.js
import Schedule from "../models/Schedule.js";

// Create schedule with PDF
export const createSchedule = async (req, res) => {
  try {
    const { teacherId, subject, day } = req.body;
    if (!teacherId )
      return res.status(400).json({ message: "All fields are required, including PDF" });

    const pdfUrl = `/uploads/${req.file.filename}`; // Serve from /uploads

    const schedule = await Schedule.create({ teacherId, subject, day, pdfUrl });
    res.status(201).json(schedule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get schedules for a teacher
export const getTeacherSchedule = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const schedules = await Schedule.find({ teacherId });
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};