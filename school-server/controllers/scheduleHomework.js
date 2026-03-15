// school-server/controllers/scheduleController.js
import Schedule from "../models/schedule.js";
import Class from "../models/grade.js";
import Teacher from "../models/teacher.js";

// ----------------------------
// Schedule Controllers
// ----------------------------

// Create schedule with PDF
export const createSchedule = async (req, res) => {
  try {
    const { teacherId, subject, day } = req.body;
    if (!teacherId || !req.file)
      return res.status(400).json({ message: "All fields are required, including PDF" });

    const pdfUrl = `/uploads/${req.file.filename}`; // Serve from /uploads

    const schedule = await Schedule.create({ teacherId, subject, day, pdfUrl });
    res.status(201).json(schedule);
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ----------------------------
// Homework Controllers
// ----------------------------

// Teacher assigns homework with optional file
export const assignHomework = async (req, res) => {
  try {
    const { classId } = req.params;
    const { title, description, dueDate, teacherId } = req.body;

    const cls = await Class.findById(classId);
    if (!cls) return res.status(404).json({ message: "Class not found" });

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    let fileUrl, fileName;
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
      fileName = req.file.originalname;
    }

    cls.homework.push({
      title,
      description,
      dueDate,
      teacher: teacher._id,
      fileUrl,
      fileName,
      submissions: [],
    });

    await cls.save();
    res.json({ message: "Homework assigned successfully", homework: cls.homework });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Student submits homework file
export const submitHomework = async (req, res) => {
  try {
    const { classId, homeworkId } = req.params;
    const { studentId } = req.body;

    const cls = await Class.findById(classId);
    if (!cls) return res.status(404).json({ message: "Class not found" });

    const homework = cls.homework.id(homeworkId);
    if (!homework) return res.status(404).json({ message: "Homework not found" });

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    homework.submissions.push({
      student: studentId,
      fileUrl: `/uploads/${req.file.filename}`,
      fileName: req.file.originalname,
      submittedAt: new Date(),
      status: new Date() > new Date(homework.dueDate) ? "Late" : "Submitted",
    });

    await cls.save();
    res.json({ message: "Homework submitted successfully", submissions: homework.submissions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};